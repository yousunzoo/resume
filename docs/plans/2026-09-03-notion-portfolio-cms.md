# Notion 포트폴리오 CMS 연동 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 정적 `projects.ts` 하드코딩을 Notion "Selected Portfolio" DB 기반 CMS로 전환한다 — 카드는 DB 속성에서, 상세 페이지는 Notion 페이지 본문 블록을 커스텀 렌더러로 그린다.

**Architecture:** Next.js 16 App Router 서버 컴포넌트가 Notion 공식 API(`@notionhq/client`)를 서버 전용으로 호출한다. 카드 목록은 DB 속성만 가벼운 쿼리로, 상세는 슬러그별로 페이지 블록까지 조회한다. ISR(`revalidate = 300`)로 재검증하고, env 미설정/API 실패 시 정적 `fallback-projects.ts`로 폴백해 화면이 통째로 사라지지 않게 한다. FSD 레이어(entities→shared)와 흑백 미니멀 타이포 역할토큰을 유지한다.

**Tech Stack:** Next.js 16, React 19, TypeScript, `@notionhq/client`, `server-only`, vitest(순수 매핑 함수 유닛 테스트), Tailwind CSS v4.

**설계 문서:** `docs/plans/2026-09-03-notion-portfolio-cms-design.md`

---

## 참고: 기존 데이터 → Notion 백필 표 (Task 1에서 사용)

| slug | Notion Project(title) | featured | Order | Tags |
|---|---|---|---|---|
| `bankmall-mortgage-flow` | 뱅크몰 — 주택담보·전세대출 신청 플로우 개선 | ✅ | 1 | Multi-step Flow, 상태 책임 분리, 금융, visualViewport, IME |
| `bankmall-credit-flow` | 뱅크몰 — 신용·개인회생자대출 신청 플로우 개선 | ✅ | 2 | URL as State, Step Guard, Routing, Discriminated Union |
| `bankmall-strategy` | 뱅크몰 — 금융사별 상담 신청 로직·상품 목록 개선 | ✅ | 3 | Strategy Pattern, 변경 영향 격리, Migration |
| `moyeoba` | 모여바 (USJ 티켓·e-SIM 바우처) | ✅ | 4 | Next.js, FSD 아키텍처, 여행 커머스 |
| `clickb-admin` | 클릭비 — 제안서·포트폴리오 운영 어드민 | ✅ | 5 | TanStack Router, 서버/UI/폼 상태 분리, 데이터 × 렌더러, FSD, 제안서 자동화 |
| `bankmall-matching` | 뱅크몰 — 대출상담사 온·오프라인 매칭 플랫폼 | ✗ | (빈값) | B2B2C, Zod, 운영 자동화 |
| `chatly` | Chatly — 맞춤형 언어학습 모바일 앱·어드민 | ✗ | (빈값) | React Native, WebView 인증, API 추상화 |
| `cluvit` | Cluvit — 도메인 거래·옥션·운영 플랫폼 | ✗ | (빈값) | 운영형 플랫폼, Server/Client State, 권한·다국어 |
| `clickb-site` | 클릭비 — IT 외주 에이전시 공개 사이트·컴포넌트 모노레포 | ✗ | (빈값) | pnpm 모노레포, 디자인시스템, react-three-fiber, ISR·BFF, 관측성 |

> Notion 실제 title이 위와 다를 수 있으니 Task 1에서 DB를 쿼리해 **title로 매칭**한 뒤 값을 채운다. slug는 절대 바뀌면 안 됨(URL·SEO 키).

---

## Task 1: Notion DB 스키마 준비 (MCP로 실행)

**도구:** notion-personal MCP. Data source: `collection://79927a10-a0cd-82fe-8c21-87b1c25fe706`

**Step 1: DB 현재 행 열거**

`notion-query-data-sources`로 9개 페이지의 `id` + `Project`(title)를 가져와 위 표의 slug와 title로 매칭한 매핑표를 만든다.

**Step 2: 속성 3종 추가**

`notion-update-data-source`로 스키마에 추가:
- `Slug` — rich_text
- `Tags` — multi_select
- `Order` — number

**Step 3: 9개 행 백필**

각 페이지에 `notion-update-page`로 `Slug`/`Tags`/`Order`(위 표) 기록. Featured 5건만 Order 1~5, 나머지는 비움.

**Step 4: 검증**

`notion-query-data-sources`로 9개 행의 Slug가 전부 채워졌고 중복이 없는지 확인. Order 1~5가 대표 5건에 정확히 붙었는지 확인.

**Step 5: 커밋 없음** (Notion 원격 변경, 코드 변경 아님). 진행 로그만 남긴다.

---

## Task 2: 의존성 · 환경 · 테스트 러너 설치

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `.env.local.example`
- Modify: `.gitignore` (`.env.local` 무시 확인)

**Step 1: 패키지 설치**

Run:
```bash
npm i @notionhq/client server-only && npm i -D vitest
```
Expected: 설치 성공, `package.json`에 반영.

**Step 2: vitest 설정 생성**

`vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: { environment: "node", include: ["src/**/*.test.ts"] },
});
```

**Step 3: test 스크립트 추가** — `package.json`의 `scripts`에 `"test": "vitest run"`, `"test:watch": "vitest"`.

**Step 4: env 예시 파일**

`.env.local.example`:
```
# Notion 내부 인테그레이션 토큰 (ntn_...)
NOTION_TOKEN=
# Selected Portfolio 데이터베이스 ID
NOTION_DATABASE_ID=3ce27a10a0cd80148655f11d8008f9e7
```

**Step 5: .gitignore 확인** — `.env.local`이 무시되는지 확인, 없으면 추가.

**Step 6: 검증** — `npm run test` 실행 → "No test files found" 정상 (아직 테스트 없음).

**Step 7: 커밋**
```bash
git add package.json package-lock.json vitest.config.ts .env.local.example .gitignore
git commit -m "chore(notion): @notionhq/client·vitest·env 스캐폴딩"
```

---

## Task 3: 타입 재편

**Files:**
- Modify: `src/entities/project/model/types.ts`
- Create: `src/entities/project/model/notion-block.ts`
- Modify: `src/entities/project/index.ts`

**Step 1: `Project`를 카드 타입으로 축소**

`types.ts`를 다음으로 교체(상세 필드 제거, 카드 필드만):
```ts
export type ProjectCategory =
  | "금융 서비스"
  | "플랫폼"
  | "모바일 앱"
  | "백오피스·자동화";

// 카드/목록용 — Notion DB 속성에서 매핑
export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  featured: boolean;
  order: number | null;
  period: string;
  role: string;
  tech: string[];
  headline: string;
  keyResult: string;
  tags: string[];
}

// 상세용 — 카드 + Notion 페이지 본문 블록
export interface ProjectDetail extends Project {
  blocks: NotionBlock[];
}
```
(상단에 `import type { NotionBlock } from "./notion-block";` 추가)

**Step 2: 블록 타입 정의**

`notion-block.ts`:
```ts
export interface RichSpan {
  text: string;
  bold: boolean;
  code: boolean;
  href: string | null;
}

export type NotionBlock =
  | { type: "heading2"; rich: RichSpan[] }
  | { type: "heading3"; rich: RichSpan[] }
  | { type: "paragraph"; rich: RichSpan[] }
  | { type: "bulleted_list"; items: RichSpan[][] }
  | { type: "callout"; icon: string | null; rich: RichSpan[] }
  | { type: "table"; hasHeader: boolean; rows: RichSpan[][][] }
  | { type: "code"; language: string; text: string };
```
> `bulleted_list`는 연속된 `bulleted_list_item`을 하나로 묶은 것. `table.rows`는 [행][셀][스팬].

**Step 3: public API 정리**

`index.ts`에서 제거: `ProjectDecision`, `BeforeAfterRow`, `RelatedPost` export. 추가: `ProjectDetail`, `NotionBlock`, `RichSpan`(type) export. 기존 `Project`/`ProjectCategory` export 유지.

**Step 4: 검증** — 이 시점엔 `projects.ts`/`selectors.ts`가 제거된 타입을 참조해 타입 에러가 난다. **정상**(다음 태스크에서 해소). 커밋은 Task 4 이후 묶어서.

---

## Task 4: Notion 속성 매핑 (순수 함수 · TDD)

**Files:**
- Create: `src/entities/project/api/map.ts`
- Test: `src/entities/project/api/map.test.ts`

**Step 1: 실패하는 테스트 작성** — `map.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { splitTech, parseFeatured, mapPropsToProject } from "./map";

describe("splitTech", () => {
  it("· 구분 문자열을 배열로 나눈다", () => {
    expect(splitTech("React · Next.js · TypeScript")).toEqual([
      "React", "Next.js", "TypeScript",
    ]);
  });
  it("빈 값은 빈 배열", () => {
    expect(splitTech("")).toEqual([]);
  });
});

describe("parseFeatured", () => {
  it("체크됨 → true", () => expect(parseFeatured(true)).toBe(true));
  it("null → false", () => expect(parseFeatured(null)).toBe(false));
});

describe("mapPropsToProject", () => {
  it("Notion page 속성을 Project로 매핑한다", () => {
    const page = {
      properties: {
        Project: { type: "title", title: [{ plain_text: "뱅크몰" }] },
        Category: { type: "select", select: { name: "금융 서비스" } },
        Featured: { type: "checkbox", checkbox: true },
        Order: { type: "number", number: 1 },
        Period: { type: "rich_text", rich_text: [{ plain_text: "2024.02 – 2024.03" }] },
        Role: { type: "rich_text", rich_text: [{ plain_text: "개발" }] },
        Tech: { type: "rich_text", rich_text: [{ plain_text: "React · Next.js" }] },
        Headline: { type: "rich_text", rich_text: [{ plain_text: "요약" }] },
        "Key Result": { type: "rich_text", rich_text: [{ plain_text: "성과" }] },
        Slug: { type: "rich_text", rich_text: [{ plain_text: "bankmall-mortgage-flow" }] },
        Tags: { type: "multi_select", multi_select: [{ name: "금융" }, { name: "IME" }] },
      },
    };
    expect(mapPropsToProject(page as never)).toEqual({
      slug: "bankmall-mortgage-flow",
      title: "뱅크몰",
      category: "금융 서비스",
      featured: true,
      order: 1,
      period: "2024.02 – 2024.03",
      role: "개발",
      tech: ["React", "Next.js"],
      headline: "요약",
      keyResult: "성과",
      tags: ["금융", "IME"],
    });
  });
});
```

**Step 2: 실패 확인** — Run: `npm run test -- map` → FAIL ("map" 모듈 없음).

**Step 3: 최소 구현** — `map.ts`:
```ts
import type { Project, ProjectCategory } from "../model/types";

const plain = (rt: Array<{ plain_text: string }> = []) =>
  rt.map((t) => t.plain_text).join("");

export const splitTech = (s: string): string[] =>
  s.split("·").map((t) => t.trim()).filter(Boolean);

export const parseFeatured = (v: boolean | null): boolean => v === true;

// deno-lint-ignore no-explicit-any
type Props = Record<string, any>;

export function mapPropsToProject(page: { properties: Props }): Project {
  const p = page.properties;
  return {
    slug: plain(p.Slug?.rich_text),
    title: plain(p.Project?.title),
    category: (p.Category?.select?.name ?? "플랫폼") as ProjectCategory,
    featured: parseFeatured(p.Featured?.checkbox ?? null),
    order: p.Order?.number ?? null,
    period: plain(p.Period?.rich_text),
    role: plain(p.Role?.rich_text),
    tech: splitTech(plain(p.Tech?.rich_text)),
    headline: plain(p.Headline?.rich_text),
    keyResult: plain(p["Key Result"]?.rich_text),
    tags: (p.Tags?.multi_select ?? []).map((t: { name: string }) => t.name),
  };
}
```

**Step 4: 통과 확인** — Run: `npm run test -- map` → PASS (전부).

**Step 5: 커밋** (Task 3+4 묶음)
```bash
git add src/entities/project/model/types.ts src/entities/project/model/notion-block.ts src/entities/project/index.ts src/entities/project/api/map.ts src/entities/project/api/map.test.ts
git commit -m "feat(project): 카드/상세 타입 분리 + Notion 속성 매핑(TDD)"
```

---

## Task 5: 블록 매핑 (순수 함수 · TDD)

**Files:**
- Create: `src/entities/project/api/map-blocks.ts`
- Test: `src/entities/project/api/map-blocks.test.ts`

**Step 1: 실패 테스트** — rich text 매핑 + 연속 불릿 병합 + 헤딩/콜아웃/코드 매핑을 검증. `map-blocks.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { mapRich, mapBlocks } from "./map-blocks";

describe("mapRich", () => {
  it("annotations(bold/link)를 RichSpan으로", () => {
    expect(
      mapRich([
        { plain_text: "굵게", annotations: { bold: true, code: false }, href: null },
        { plain_text: "링크", annotations: { bold: false, code: false }, href: "https://x" },
      ])
    ).toEqual([
      { text: "굵게", bold: true, code: false, href: null },
      { text: "링크", bold: false, code: false, href: "https://x" },
    ]);
  });
});

describe("mapBlocks", () => {
  it("연속 bulleted_list_item을 하나의 bulleted_list로 병합", () => {
    const raw = [
      { type: "bulleted_list_item", bulleted_list_item: { rich_text: [{ plain_text: "a", annotations: {}, href: null }] } },
      { type: "bulleted_list_item", bulleted_list_item: { rich_text: [{ plain_text: "b", annotations: {}, href: null }] } },
    ];
    const out = mapBlocks(raw as never);
    expect(out).toHaveLength(1);
    expect(out[0].type).toBe("bulleted_list");
  });
  it("heading_2 → heading2", () => {
    const raw = [{ type: "heading_2", heading_2: { rich_text: [{ plain_text: "제목", annotations: {}, href: null }] } }];
    expect(mapBlocks(raw as never)[0].type).toBe("heading2");
  });
});
```

**Step 2: 실패 확인** — Run: `npm run test -- map-blocks` → FAIL.

**Step 3: 구현** — `map-blocks.ts` (테이블은 `table` + 자식 `table_row`를 합성해서 넘어옴을 전제로 `children` 필드 사용):
```ts
import type { NotionBlock, RichSpan } from "../model/notion-block";

// deno-lint-ignore no-explicit-any
type Raw = any;

export const mapRich = (rt: Raw[] = []): RichSpan[] =>
  rt.map((t) => ({
    text: t.plain_text ?? "",
    bold: Boolean(t.annotations?.bold),
    code: Boolean(t.annotations?.code),
    href: t.href ?? null,
  }));

export function mapBlocks(raw: Raw[]): NotionBlock[] {
  const out: NotionBlock[] = [];
  let bullets: RichSpan[][] | null = null;

  const flush = () => {
    if (bullets) { out.push({ type: "bulleted_list", items: bullets }); bullets = null; }
  };

  for (const b of raw) {
    if (b.type === "bulleted_list_item") {
      bullets ??= [];
      bullets.push(mapRich(b.bulleted_list_item.rich_text));
      continue;
    }
    flush();
    switch (b.type) {
      case "heading_2": out.push({ type: "heading2", rich: mapRich(b.heading_2.rich_text) }); break;
      case "heading_3": out.push({ type: "heading3", rich: mapRich(b.heading_3.rich_text) }); break;
      case "paragraph": {
        const rich = mapRich(b.paragraph.rich_text);
        if (rich.some((r) => r.text.trim())) out.push({ type: "paragraph", rich });
        break;
      }
      case "callout":
        out.push({ type: "callout", icon: b.callout.icon?.emoji ?? null, rich: mapRich(b.callout.rich_text) });
        break;
      case "code":
        out.push({ type: "code", language: b.code.language ?? "", text: mapRich(b.code.rich_text).map((r) => r.text).join("") });
        break;
      case "table": {
        const rows: RichSpan[][][] = (b.children ?? []).map((r: Raw) =>
          (r.table_row?.cells ?? []).map((cell: Raw[]) => mapRich(cell)));
        out.push({ type: "table", hasHeader: Boolean(b.table.has_column_header), rows });
        break;
      }
      default: break; // 미지원 블록은 건너뜀
    }
  }
  flush();
  return out;
}
```

**Step 4: 통과 확인** — Run: `npm run test -- map-blocks` → PASS.

**Step 5: 커밋**
```bash
git add src/entities/project/api/map-blocks.ts src/entities/project/api/map-blocks.test.ts
git commit -m "feat(project): Notion 블록 → NotionBlock 매핑(TDD)"
```

---

## Task 6: Notion 클라이언트 + fetch (카드/상세) + 폴백

**Files:**
- Create: `src/entities/project/api/notion-client.ts`
- Create: `src/entities/project/api/fetch-projects.ts`
- Create: `src/entities/project/api/fetch-project-detail.ts`
- Create: `src/entities/project/model/fallback-projects.ts` (Task 10에서 채움 — 지금은 임시 빈 배열 + intro)

**Step 1: 클라이언트** — `notion-client.ts`:
```ts
import "server-only";
import { Client } from "@notionhq/client";

export const notionEnabled = () =>
  Boolean(process.env.NOTION_TOKEN && process.env.NOTION_DATABASE_ID);

export const notion = () => new Client({ auth: process.env.NOTION_TOKEN });
export const databaseId = () => process.env.NOTION_DATABASE_ID as string;
```

**Step 2: 카드 fetch** — `fetch-projects.ts`:
```ts
import "server-only";
import type { Project } from "../model/types";
import { notion, databaseId, notionEnabled } from "./notion-client";
import { mapPropsToProject } from "./map";
import { fallbackProjects } from "../model/fallback-projects";

export async function fetchProjects(): Promise<Project[]> {
  if (!notionEnabled()) return fallbackProjects;
  try {
    const res = await notion().databases.query({ database_id: databaseId() });
    return res.results
      .map((page) => mapPropsToProject(page as never))
      .filter((p) => p.slug);
  } catch (err) {
    console.warn("[notion] fetchProjects 실패 — 폴백 사용", err);
    return fallbackProjects;
  }
}
```
> **검증 체크포인트:** SDK 버전이 데이터소스 분리(2025-09)로 `databases.query`를 막으면 `dataSources.query({ data_source_id })`로 교체. Task 실행 시 실제 응답으로 확정.

**Step 3: 상세 fetch** — `fetch-project-detail.ts`:
```ts
import "server-only";
import type { ProjectDetail } from "../model/types";
import { notion, databaseId, notionEnabled } from "./notion-client";
import { mapPropsToProject } from "./map";
import { mapBlocks } from "./map-blocks";

async function listChildren(blockId: string) {
  const client = notion();
  const acc: unknown[] = [];
  let cursor: string | undefined;
  do {
    const res = await client.blocks.children.list({ block_id: blockId, start_cursor: cursor });
    for (const b of res.results as Array<Record<string, unknown> & { id: string; has_children?: boolean; type?: string }>) {
      if (b.has_children && b.type === "table") {
        (b as Record<string, unknown>).children = await listChildren(b.id);
      }
      acc.push(b);
    }
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
  } while (cursor);
  return acc;
}

export async function fetchProjectDetail(slug: string): Promise<ProjectDetail | null> {
  if (!notionEnabled()) return null;
  try {
    const res = await notion().databases.query({
      database_id: databaseId(),
      filter: { property: "Slug", rich_text: { equals: slug } },
    });
    const page = res.results[0];
    if (!page) return null;
    const card = mapPropsToProject(page as never);
    const raw = await listChildren((page as { id: string }).id);
    return { ...card, blocks: mapBlocks(raw as never) };
  } catch (err) {
    console.warn(`[notion] fetchProjectDetail(${slug}) 실패`, err);
    return null;
  }
}
```

**Step 4: 임시 폴백 스텁** — `fallback-projects.ts`:
```ts
import type { Project } from "./types";
export const fallbackProjects: Project[] = [];
export const portfolioIntro =
  "실무에서 마주한 문제를 구조로 풀어낸 프로젝트들입니다.";
```
> Task 10에서 기존 9개 카드 데이터로 채운다.

**Step 5: 검증** — Run: `npx tsc --noEmit` → api 파일 타입 통과 확인(아직 selectors가 깨질 수 있음, 다음 태스크에서 해소).

**Step 6: 커밋**
```bash
git add src/entities/project/api/ src/entities/project/model/fallback-projects.ts
git commit -m "feat(project): Notion fetch(카드·상세) + 폴백 계층"
```

---

## Task 7: 셀렉터 async 전환

**Files:**
- Modify: `src/entities/project/model/selectors.ts`
- Delete: `src/entities/project/model/projects.ts` (Task 10에서 fallback로 이관 후 삭제)
- Modify: `src/entities/project/index.ts`

**Step 1: selectors 재작성** — `selectors.ts`:
```ts
import type { Project, ProjectCategory, ProjectDetail } from "./types";
import { fetchProjects } from "../api/fetch-projects";
import { fetchProjectDetail } from "../api/fetch-project-detail";

export async function getProjects(): Promise<Project[]> {
  return fetchProjects();
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await fetchProjects();
  return all
    .filter((p) => p.featured)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export async function getProjectDetail(slug: string): Promise<ProjectDetail | null> {
  return fetchProjectDetail(slug);
}

export const projectCategories: ProjectCategory[] = [
  "금융 서비스", "플랫폼", "모바일 앱", "백오피스·자동화",
];
```

**Step 2: index.ts 갱신** — export 교체:
- 제거: `projects`, `getProjectBySlug`, `featuredProjects`, `portfolioIntro`(→ fallback에서), 
- 추가: `getProjects`, `getFeaturedProjects`, `getProjectDetail`, `projectCategories`
- `portfolioIntro`는 `../model/fallback-projects`에서 re-export.

**Step 3: 검증** — Run: `npx tsc --noEmit` → 이제 views/app이 깨진다(다음 태스크). api/entities 자체는 통과.

**Step 4: 커밋** (Task 8 이후 뷰까지 묶어서 커밋)

---

## Task 8: 블록 렌더러 컴포넌트

**Files:**
- Create: `src/entities/project/ui/rich-text.tsx`
- Create: `src/widgets/project-detail/ui/notion-blocks.tsx`
- Modify: `src/widgets/project-detail/index.ts` (export)

**Step 1: RichText** — `rich-text.tsx` (span 배열 → 텍스트/굵게/코드/링크):
```tsx
import type { RichSpan } from "../model/notion-block";

export function RichText({ spans }: { spans: RichSpan[] }) {
  return (
    <>
      {spans.map((s, i) => {
        const content = s.code ? (
          <code key={i} className="rounded bg-paper-2 px-1 py-0.5 text-[0.9em] text-ink">{s.text}</code>
        ) : s.bold ? (
          <strong key={i} className="font-semibold text-ink">{s.text}</strong>
        ) : (
          <span key={i}>{s.text}</span>
        );
        if (s.href) {
          return (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
               className="text-ink underline underline-offset-4">
              {s.text}
            </a>
          );
        }
        return content;
      })}
    </>
  );
}
```

**Step 2: NotionBlocks** — `notion-blocks.tsx`. 각 `NotionBlock` 타입을 기존 디자인 시스템 컴포넌트(`SectionHeading`/`Text`/표 스타일)에 매핑. 흑백 톤·역할토큰 사용, 매직넘버 금지(메모리 컨벤션 준수). 블록 종류: heading2(SectionHeading), heading3(소제목 Text), paragraph(Text), bulleted_list(불릿 ul), callout(강조 박스 — 기존 Card/border-ink 톤), table(기존 Before→After 표 스타일 재사용), code(스타일된 `<pre>` — mermaid는 1차 코드블록).

> 이 컴포넌트의 정확한 클래스는 실행 시 기존 `project-detail.tsx`의 표/섹션 스타일을 참조해 톤을 맞춘다. 표는 `overflow-x-auto rounded-xl border border-line` + `border-collapse` 패턴 재사용.

**Step 3: 검증** — Run: `npx tsc --noEmit` (렌더러 자체 타입). 시각 검증은 Task 9 이후.

**Step 4: 커밋 없음** (Task 9와 함께)

---

## Task 9: 상세 라우트 연결 (`portfolio/[slug]`)

**Files:**
- Modify: `src/app/portfolio/[slug]/page.tsx`
- Modify: `src/views/project/ui/project-view.tsx`
- Modify: `src/views/project/index.ts` (필요 시)

**Step 1: ProjectView 재작성** — `props: { project: ProjectDetail }`. 헤더(제목/기간/역할/tech/keyResult/카테고리) + `<NotionBlocks blocks={project.blocks} />`. 기존 상세 레이아웃의 헤더 스타일(제목 타이포·메타 라인)은 유지하고, 본문만 NotionBlocks로 교체. 기존 타입화 섹션(decisions/beforeAfter 렌더) 제거.

**Step 2: page.tsx async 전환**:
```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjects, getProjectDetail } from "@/entities/project";
import { ProjectView } from "@/views/project";
import { JsonLd } from "@/shared/ui";
import { buildCreativeWorkJsonLd } from "@/shared/lib/seo";
import { site } from "@/shared/config/site";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectDetail(slug);
  if (!project) return { title: "프로젝트를 찾을 수 없습니다" };
  const title = `${project.title} · 유선주`;
  const url = `/portfolio/${project.slug}`;
  return {
    title, description: project.headline,
    alternates: { canonical: url },
    openGraph: { title, description: project.headline, url },
  };
}

export default async function ProjectPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const project = await getProjectDetail(slug);
  if (!project) notFound();
  return (
    <>
      <JsonLd data={buildCreativeWorkJsonLd({
        name: project.title, description: project.headline,
        url: `${site.url}/portfolio/${project.slug}`, keywords: project.tech,
      })} />
      <ProjectView project={project} />
    </>
  );
}
```

**Step 3: 검증(시각)** — `.env.local`에 실제 토큰/DB ID 설정 후 Run: `npm run dev` → `http://localhost:7070/portfolio/bankmall-mortgage-flow` 방문. callout/heading/불릿/표/코드블록/링크가 흑백 톤으로 렌더되는지 확인. (env 없으면 상세는 404 — 폴백은 카드만 커버.)

**Step 4: 커밋** (Task 7+8+9)
```bash
git add src/entities/project/model/selectors.ts src/entities/project/index.ts src/entities/project/ui/rich-text.tsx src/widgets/project-detail/ src/views/project/ src/app/portfolio/\[slug\]/page.tsx
git commit -m "feat(project): 상세 페이지 Notion 블록 렌더 + async 라우팅"
```

---

## Task 10: 목록/홈 뷰 async 전환 + 폴백 데이터 이관

**Files:**
- Modify: `src/views/portfolio/ui/portfolio-view.tsx`
- Modify: `src/widgets/resume-content/ui/projects-section.tsx`
- Modify: `src/app/portfolio/page.tsx`, `src/app/page.tsx` (revalidate 추가)
- Modify: `src/entities/project/model/fallback-projects.ts` (9개 카드 데이터 이관)
- Delete: `src/entities/project/model/projects.ts`

**Step 1: 폴백 데이터 이관** — 기존 `projects.ts`의 9개 항목에서 **카드 필드만**(slug/title/category/featured/order/period/role/tech/headline/keyResult/tags) 추려 `fallback-projects.ts`의 `fallbackProjects` 배열에 채운다. `order`는 Task1 표 기준. `portfolioIntro`는 기존 값 유지. 그 후 `projects.ts` 삭제.

**Step 2: portfolio-view async화**:
```tsx
export async function PortfolioView() {
  const projects = await getProjects();
  // ...헤더 동일...
  return (
    <PageShell>
      {/* header */}
      <ProjectFilter projects={projects} categories={projectCategories} />
    </PageShell>
  );
}
```
(`portfolioIntro` import 경로 유지, `projects`/`projectCategories`는 이제 함수/상수)

**Step 3: projects-section async화** — `featuredProjects`(제거됨) → `await getFeaturedProjects()`:
```tsx
export async function ProjectsSection() {
  const featured = await getFeaturedProjects();
  // featured.map(...) 로 렌더
}
```
> `ResumeContent`가 `ProjectsSection`을 렌더 → 서버 컴포넌트 체인이 async여야 함. `ResumeContent`/`HomeView`가 async 자식을 렌더하는지 확인하고, 필요하면 `ProjectsSection`을 async 서버 컴포넌트로 두고 상위는 그대로 JSX에 포함(App Router는 async 서버 컴포넌트 중첩 허용).

**Step 4: revalidate 추가** — `app/portfolio/page.tsx`와 `app/page.tsx` 상단에 `export const revalidate = 300;`.

**Step 5: 검증** — Run: `npm run test` (매핑 유닛 그린) → `npx tsc --noEmit` (전체 타입 통과) → `npm run build` (프로덕션 빌드 성공). env **없이** 빌드 → 폴백으로 9개 카드가 목록/홈에 렌더되는지 dev로 확인.

**Step 6: 커밋**
```bash
git add -A
git commit -m "feat(project): 목록·홈 async 전환 + 정적 데이터 폴백 이관"
```

---

## Task 11: 통합 검증 & 마무리

**Step 1: env 있는 상태 전체 점검** — `.env.local` 세팅 후 `npm run build && npm run start`:
- 홈(`/`): 대표 5개 카드가 Order(뱅크몰3→모여바→클릭비어드민) 순으로 노출
- 목록(`/portfolio`): 9개 전부, 카테고리 필터 카운트 정상, Tech 칩 split
- 상세(`/portfolio/<각 slug>`): 9개 모두 블록 렌더 확인(특히 표 있는 뱅크몰3·클릭비어드민, mermaid 있는 뱅크몰주담대)

**Step 2: env 없는 폴백 점검** — `.env.local` 임시 제거 후 `npm run build` → 홈·목록 카드 유지, 상세는 404 허용(정상 설계). 확인 후 env 복구.

**Step 3: SEO 무손상 확인** — `/sitemap.xml`에 9개 slug, 상세 `<link rel=canonical>`·JSON-LD 정상.

**Step 4: 린트** — Run: `npm run lint` → 통과.

**Step 5: 최종 커밋 없음** (문제 있으면 해당 태스크로 복귀 수정 후 커밋).

---

## 완료 기준(DoD)

- [ ] Notion DB에 Slug/Tags/Order 백필 완료, 9개 slug 유니크
- [ ] `npm run test` 그린 (map·map-blocks 유닛)
- [ ] `npx tsc --noEmit` 통과, `npm run lint` 통과, `npm run build` 성공
- [ ] 카드 9개 · 대표 5개 Order 정렬 · 상세 블록 렌더(callout/heading/list/table/code/link)
- [ ] env 미설정 시 카드 폴백 동작, 기존 URL·sitemap·JSON-LD 무손상
- [ ] 정적 `projects.ts` 삭제, `fallback-projects.ts`로 대체
