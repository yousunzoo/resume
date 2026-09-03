# Notion 포트폴리오 CMS 연동 — 설계

- 작성일: 2026-09-03
- 상태: 설계 확정 (구현 대기)
- 목적: 정적 `projects.ts`를 Notion "Selected Portfolio" DB 기반 CMS로 전환

## 배경

현재 포트폴리오 프로젝트 데이터는 `src/entities/project/model/projects.ts`에 정적 하드코딩(약 1,000줄)되어 있다. 프로젝트 원본은 이미 Notion "Selected Portfolio" 데이터베이스에 존재하며(`types.ts` 주석에도 명시), 앞으로 프로젝트 추가·수정을 Notion에서만 하고 사이트가 이를 읽어 렌더하도록 전환한다.

- Notion DB ID: `3ce27a10-a0cd-8014-8655-f11d8008f9e7`
- Data source: `collection://79927a10-a0cd-82fe-8c21-87b1c25fe706`
- 경로: Job Preparation / 이력서 모음집 / 260901 / Selected Portfolio

## 결정 사항 (브레인스토밍 결과)

1. **Notion = 단일 콘텐츠 원본(CMS)**. 정적 `projects.ts`는 폴백으로 강등(삭제 안 함).
2. **상세 페이지 = Notion 페이지 본문을 그대로 렌더**. 기존 타입화된 상세 구조(`decisions[]`/`beforeAfter[]`/`highlights[]` 등)는 폐기하고 본문 블록을 렌더.
3. **런타임 = Vercel + ISR** (`revalidate` 주기 재검증). 배포된 사이트는 MCP가 아니라 Notion 공식 API(`@notionhq/client`) + 인테그레이션 토큰 사용.
4. **slug = Notion `Slug` 속성 추가 + 기존 영문 슬러그 백필** (URL·SEO 보존). 카드 키워드 칩은 `Tags`(multi-select) 속성 추가.
5. **블록 렌더링 = 커스텀 렌더러 → 기존 디자인 시스템 매핑** (흑백 미니멀 톤·FSD·타이포 역할토큰 보존). mermaid는 단계적(코드블록 → 클라이언트 렌더).

## 데이터 구조 불일치 (핵심)

Notion DB는 **카드 레벨 속성만** 구조화되어 있다:

| Notion DB 속성 | 타입 | → 사이트 필드 |
|---|---|---|
| Project | title | `title` |
| Category | select (금융 서비스/플랫폼/모바일 앱/백오피스·자동화) | `category` |
| Featured | checkbox | `featured` |
| Period | text | `period` |
| Role | text | `role` |
| Tech | text (`·` 구분) | `tech[]` (split) |
| Headline | text | `headline` |
| Key Result | text | `keyResult` |

**상세 내용은 DB 속성이 아니라 페이지 본문(마크다운 블록)에 있다**: 핵심요약(callout) → 프로젝트 배경 → 문제 → 기술적 의사결정 → Before→After 표 → 구조(mermaid) → 엣지케이스 → 결과 → 면접 포인트.

Notion에 **없는** 필드: `slug`, `tags[]`, 대표 프로젝트 표시 순서(`FEATURED_ORDER`). → 아래 스키마 추가로 해소.

## 아키텍처 & 데이터 흐름

```
Notion "Selected Portfolio" DB
        │  (공식 API @notionhq/client, 서버 전용)
        ▼
entities/project/api  ─── fetchProjects() / fetchProjectDetail(slug)
        │  Notion 속성 → ProjectCard 매핑
        │  페이지 블록 → NotionBlock[] (상세)
        ▼
Next.js Server Components (ISR revalidate = 300)
   ├─ home-view / portfolio-view  → 카드 (DB 속성)
   └─ portfolio/[slug]            → 커스텀 블록 렌더러 (페이지 본문)
```

- 카드 목록은 DB 속성만(가벼운 쿼리), 상세는 블록 children까지(무거움) 슬러그별로만 조회.
- 동기→비동기 전환: `projects`(배열) → `getProjectCards()`(async). `getProjectBySlug`·`getFeaturedProjects`·`generateStaticParams` 및 소비 뷰 모두 async화.

## Notion 쪽 준비 (MCP로 대행)

1. DB 속성 추가 + 백필:
   - `Slug` (text) — 기존 9개 영문 슬러그 백필 (URL·SEO 보존)
   - `Tags` (multi-select) — 기존 카드 칩 값 백필
   - `Order` (number) — 대표 프로젝트 표시 순서 (`FEATURED_ORDER` 이관: bankmall-mortgage-flow→credit→strategy→moyeoba→clickb-admin)
2. 인테그레이션 연결 (사용자 직접):
   - Notion 내부 인테그레이션 생성 → 토큰 발급 → "Selected Portfolio" DB 공유
   - Vercel env 등록: `NOTION_TOKEN`, `NOTION_DATABASE_ID`

## 엔티티 매핑 (`entities/project`)

타입을 카드/상세로 분리:

```ts
interface ProjectCard {
  slug: string;
  title: string;
  category: ProjectCategory;
  featured: boolean;
  order: number | null;
  period: string;
  role: string;
  tech: string[];     // "React · Next.js" → split(" · ")
  headline: string;
  keyResult: string;
  tags: string[];     // multi-select
}

interface ProjectDetail extends ProjectCard {
  blocks: NotionBlock[];
}
```

- 제거: `ProjectDecision`/`BeforeAfterRow`/`RelatedPost`, `overview`/`problem`/`decision`/`decisions`/`beforeAfter`/`result`/`results`/`highlights`/`scope`/`relatedPosts`/`needsMoreInfo`/`angle`/`cardCategory`/`summary`.
- 신설 `entities/project/api/`:
  - `notion-client.ts` — `@notionhq/client` 인스턴스 (`server-only` 가드)
  - `fetch-projects.ts` — DB 쿼리 → `ProjectCard[]` (Order/Featured 정렬)
  - `fetch-project-detail.ts` — slug → 페이지 → 블록 children 재귀 조회 → `ProjectDetail`
  - `map.ts` — Notion 속성 → 타입 매핑 (title/select/checkbox/text/multi-select/number)
- 셀렉터 async화: `getProjectCards()`, `getProjectBySlug(slug)`, `getFeaturedProjects()`(Order 정렬), `getProjectCategories()`(상수 유지).

## 커스텀 블록 렌더러

`shared/ui/notion`(또는 `widgets/project-detail` 내부). 실제 쓰인 블록만 매핑:

| Notion block | 렌더 |
|---|---|
| `callout` | 강조 박스 (핵심요약) |
| `heading_2` / `heading_3` | `SectionHeading` / 소제목 (타이포 역할토큰) |
| `paragraph` | `Text` |
| `bulleted_list_item` | 불릿 리스트 |
| `table` (+rows) | Before→After 표 스타일 재사용 |
| `code` (mermaid) | 1차: 스타일된 코드블록 · 2차: 클라이언트 mermaid |

- `rich_text` 배열 → `annotations`(bold/code/link) 반영하는 `RichText` 컴포넌트
- 매핑 안 되는 블록은 안전하게 무시 or 문단 폴백 (렌더 깨짐 방지)
- 렌더러는 `blocks`를 받는 순수 서버 컴포넌트. `ProjectView` = 카드 헤더(제목/기간/역할/tech/keyResult) + `<NotionBlocks blocks={...}/>`

## ISR · 에러 처리

- `portfolio/page.tsx`, `portfolio/[slug]/page.tsx`, home 소비 라우트에 `export const revalidate = 300`
- `generateStaticParams` → `getProjectCards()` async 슬러그 생성. 신규 프로젝트는 `dynamicParams = true`로 온디맨드 생성
- Notion 호출은 `server-only` — 토큰이 클라이언트 번들에 안 섞이게 가드
- **폴백**: env 미설정/ API 실패 시 정적 데이터(`fallback-projects.ts`)를 반환 + 서버 로그 경고. 상세 slug 미존재 → `notFound()`

## 롤아웃 (단계적)

1. `@notionhq/client` 설치 + env 세팅 + Notion 속성/백필(MCP)
2. API 계층 + 매핑 구현 → 9개 카드가 정확히 나오는지 검증
3. 블록 렌더러 구현 → 상세 1건(뱅크몰 주담대) 비주얼 검증
4. 뷰/셀렉터 async 전환 + 라우트 연결
5. 정적 `projects.ts` → `fallback-projects.ts` 강등 (삭제 아님)

## 검증 기준

- 카드: 9개 전부 렌더 · Featured 5개 Order대로 정렬 · Tech 칩 split 정상
- 상세: callout/heading/list/table/mermaid/rich text(bold/link) 렌더
- URL·SEO: 기존 슬러그 유지로 sitemap·JSON-LD·canonical 무손상
- 폴백: env 제거 후 빌드해도 기존 화면 유지

## 미결 / 구현 시 확인

- Notion API 버전: 2025-09 이후 databases→data sources 분리. `@notionhq/client` 버전과 쿼리 방식(`databases.query` vs data source) 구현 시 확정
- mermaid 클라이언트 렌더 도입 시점(2차)
