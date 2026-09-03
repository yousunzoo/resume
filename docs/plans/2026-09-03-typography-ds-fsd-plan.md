# 타이포그래피 · 디자인 시스템 · FSD 구조 정리 구현 계획

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 파편화된 resume-portfolio 코드를 타이포그래피 시스템 + shared/ui 프리미티브 + Feature-Sliced Design 구조로 재편하고 SEO·성능·번들을 고도화한다. 시각적 톤(흑백 미니멀)은 보존한다.

**Architecture:** FSD 레이어를 아래(`shared`)→위(`views`) 순으로 쌓아 매 태스크 빌드 가능 상태를 유지한다. 타이포는 Tailwind v4 `@theme`의 `--text-*` 역할 토큰(size+weight+line-height+tracking 묶음)을 단일 진실 원천으로 삼고, `<Text>/<Heading>` 프리미티브가 이를 소비한다.

**Tech Stack:** Next 16 (App Router) · React 19 · Tailwind v4 · TypeScript 5 · next/font/local

**설계 문서:** `docs/plans/2026-09-03-typography-ds-fsd-design.md`

## 검증 규약 (테스트 프레임워크 없음)

각 태스크는 아래로 검증한다:
- `npx tsc --noEmit` → 타입 통과
- `npx eslint .` → 린트 통과
- 구조 변경 태스크는 `npm run build` 스모크
- 시각 확인: `npm run dev` (:7070) — 해당 화면이 변경 전과 동등한지 육안 확인
- 각 태스크 종료 시 커밋

## 의존성 규칙 (FSD)

`app → views → widgets → features → entities → shared`. 위 레이어만 아래를 import. 동일 레이어 교차 import 금지.

---

## Phase 0 — 준비 (비파괴적)

### Task 0.1: 브랜치 · 경로 alias · 번들 정리

**Files:**
- Modify: `tsconfig.json` (paths 추가)
- Modify: `package.json` (framer-motion 제거)
- Delete: `public/favicon.png` (755KB, 미사용 — app/favicon.ico가 실사용)

**Steps:**
1. `git checkout -b refactor/typography-ds-fsd`
2. `tsconfig.json`의 `paths`에 레이어 alias 추가:
   ```json
   "@/*": ["./src/*"],
   "@/app/*": ["./src/app/*"],
   "@/views/*": ["./src/views/*"],
   "@/widgets/*": ["./src/widgets/*"],
   "@/features/*": ["./src/features/*"],
   "@/entities/*": ["./src/entities/*"],
   "@/shared/*": ["./src/shared/*"]
   ```
3. `npm rm framer-motion` (grep로 미사용 재확인 후)
4. `public/favicon.png` 삭제, 참조 없는지 grep 확인
5. 검증: `npx tsc --noEmit` PASS
6. Commit: `chore: FSD 경로 alias 추가, 미사용 framer-motion·favicon 정리`

---

## Phase 1 — shared 레이어 (디자인 시스템 기반)

### Task 1.1: 타이포그래피 역할 토큰 (@theme)

**Files:**
- Modify: `src/app/globals.css` — `@theme` 블록에 `--text-*` 역할 토큰 11종 추가 (display~overline), 각각 `--line-height`/`--font-weight`/`--letter-spacing` 동반. 기존 색/그림자/radius 토큰은 유지.

**Steps:**
1. 설계 문서 §2 램프대로 `--text-display`…`--text-overline` 선언
2. 검증: `npm run dev` — 아직 소비처 없으므로 렌더 변화 없음. `text-title-1` 임시 클래스로 스모크 후 제거
3. Commit: `feat(shared): 타이포그래피 역할 토큰 정의`

### Task 1.2: shared/ui 프리미티브 — Text / Heading

**Files:**
- Create: `src/shared/ui/text.tsx` (`Text`, `Heading`)
- Create: `src/shared/ui/index.ts` (배럴)

**설계:** `variant` prop이 역할 토큰(`text-<variant>`)에 매핑. `as`로 시맨틱 태그, `weight`로 선택 override, `className` merge. `Heading`은 `as`가 h1~h4 강제.

**Steps:**
1. `Text`/`Heading` 구현 (아래 §부록 A 코드)
2. 검증: 임시 페이지에서 각 variant 렌더 → tsc PASS
3. Commit: `feat(shared): Text·Heading 프리미티브`

### Task 1.3: shared/ui — 나머지 프리미티브 이관·확장

**Files:**
- Create: `src/shared/ui/card.tsx` `chip.tsx` `badge.tsx` `divider.tsx` `eyebrow.tsx` `section-heading.tsx` `numbered-list.tsx` `tech-tag.tsx` `reveal.tsx` `skip-link.tsx`
- Create: `src/shared/ui/icons/index.tsx` (기존 icons.tsx 이관)
- Modify: `src/shared/ui/index.ts` (배럴 확장)

**핵심 추출:**
- `NumberedList` — `{items: {title, body}[], tone?: "muted"|"strong"}` — 담당영역·KeyImpact·Decisions·Results 4중복 통합
- `SectionHeading` — `variant: "main"|"detail"|"sidebar"` — SectionTitle+Section+SidebarHeading 통합
- `Badge` — 재직중·Featured·★
- `Eyebrow` = Text variant="eyebrow" 프리셋
- `Reveal` — 기존 미사용 props(delay/variant) 제거

**Steps:**
1. 각 컴포넌트 생성, 내부 텍스트는 `text-<role>` 토큰만 사용 (매직넘버 금지)
2. 검증: tsc PASS, 임시 스토리 페이지로 육안 확인
3. Commit: `feat(shared): ui 프리미티브 라이브러리 (Card·Chip·Badge·NumberedList 등)`

### Task 1.4: shared/lib · shared/config

**Files:**
- Create: `src/shared/config/site.ts` (도메인 baseUrl, DEVLOG_URL 이관)
- Create: `src/shared/lib/cn.ts` (className merge 유틸)
- Create: `src/shared/lib/seo.ts` (JSON-LD 빌더 — Person/CreativeWork/ProfilePage; 데이터는 인자로 주입)

**Steps:**
1. 구현, 검증: tsc PASS
2. Commit: `feat(shared): config(site)·lib(cn·seo)`

---

## Phase 2 — 폰트 self-host

### Task 2.1: next/font/local Pretendard

**Files:**
- Add: `src/shared/fonts/` — Pretendard subset woff2 (variable 우선)
- Create: `src/shared/ui/font.ts` (localFont 정의, CSS 변수 `--font-sans` 노출)
- Modify: `src/app/layout.tsx` (font className 적용)
- Modify: `src/app/globals.css` (CDN `@import` 제거, `--font-sans`는 next/font 변수 참조)

**Steps:**
1. Pretendard woff2 다운로드(subset), `localFont` 구성, `display: "swap"`
2. globals.css의 `@import url(...pretendard...)` 제거
3. 검증: `npm run dev` — 폰트 동일 렌더, 네트워크 탭에 외부 폰트 요청 없음
4. Commit: `perf(font): Pretendard next/font/local self-host, CDN import 제거`

---

## Phase 3 — entities 레이어

### Task 3.1: entities/project

**Files:**
- Create: `src/entities/project/model/types.ts` (Project·ProjectCategory·ProjectDecision·BeforeAfterRow·RelatedPost)
- Create: `src/entities/project/model/projects.ts` (projects 데이터 + portfolioIntro)
- Create: `src/entities/project/model/selectors.ts` (getProjectBySlug·featuredProjects·projectCategories)
- Create: `src/entities/project/lib/category-meta.ts` (기존 category.tsx, stale 주석 제거)
- Create: `src/entities/project/ui/project-card.tsx` (기존 ProjectCard, shared/ui·토큰으로 리팩터)
- Create: `src/entities/project/ui/category-tag.tsx`
- Create: `src/entities/project/index.ts` (public API 배럴)

**Steps:**
1. resume.ts에서 project 도메인 분리 이관
2. project-card를 `<Text>/<Heading>/<Badge>/<TechTag>`로 재작성 — 렌더 동등
3. 검증: tsc PASS
4. Commit: `refactor(entities): project 슬라이스 분리`

### Task 3.2: entities/profile

**Files:**
- Create: `src/entities/profile/model/types.ts` (Profile·Experience·TitledItem·TechStackGroup·EducationItem·Certification·ProfileLink)
- Create: `src/entities/profile/model/profile.ts` (profile·aboutMe·focusAreas·experiences·education·certifications·techStack·summary·metrics)
- Create: `src/entities/profile/index.ts`
- Delete: `src/data/resume.ts` (완전 이관 후)

**Steps:**
1. profile 도메인 이관, `data/resume.ts` 삭제
2. 검증: tsc PASS (아직 구 import 경로 참조처는 다음 Phase에서 정리 — 이 시점엔 임시 re-export shim으로 빌드 유지 가능)
3. Commit: `refactor(entities): profile 슬라이스 분리, data/resume.ts 제거`

---

## Phase 4 — features 레이어

### Task 4.1: features/filter-projects

**Files:**
- Create: `src/features/filter-projects/ui/project-filter.tsx` (필터 바 + 결과 테이블, 기존 PortfolioList)
- Create: `src/features/filter-projects/model/use-filter.ts` (필터 상태 훅)
- Create: `src/features/filter-projects/index.ts`

**Steps:**
1. PortfolioList → 필터 로직(model) + 테이블(ui) 분리, entities/project 소비
2. 검증: dev에서 필터 동작·row 링크 동등
3. Commit: `refactor(features): filter-projects 슬라이스`

---

## Phase 5 — widgets 레이어

### Task 5.1: widgets/page-shell

**Files:**
- Create: `src/widgets/page-shell/ui/page-shell.tsx` (기존 SubPageShell, profile 소비)
- Create: `src/widgets/page-shell/index.ts`

### Task 5.2: widgets/resume-sidebar

**Files:**
- Create: `src/widgets/resume-sidebar/ui/resume-sidebar.tsx` (contact-row 포함, shared/ui·토큰 적용)
- Create: `src/widgets/resume-sidebar/index.ts`

### Task 5.3: widgets/resume-content

**Files:**
- Create: `src/widgets/resume-content/ui/about-section.tsx` `experience-section.tsx` `projects-section.tsx` `education-section.tsx` `certifications-section.tsx`
- Create: `src/widgets/resume-content/ui/resume-content.tsx` (섹션 조립)
- Create: `src/widgets/resume-content/index.ts`
- Experience·프로젝트 섹션은 `NumberedList`·`SectionHeading` 사용

### Task 5.4: widgets/project-detail

**Files:**
- Create: `src/widgets/project-detail/ui/project-detail.tsx` (기존 ProjectDetail, Section→SectionHeading, Decisions/Results→NumberedList)
- Create: `src/widgets/project-detail/index.ts`

**각 Task 공통 Steps:** 이관 → shared/ui·토큰으로 매직넘버 제거 → tsc PASS → dev 육안 확인 → Commit `refactor(widgets): <name>`

---

## Phase 6 — views 레이어 + app 라우트 thin화

### Task 6.1: views

**Files:**
- Create: `src/views/home/ui/home-view.tsx` (sidebar+content 조립)
- Create: `src/views/portfolio/ui/portfolio-view.tsx`
- Create: `src/views/project/ui/project-view.tsx`
- 각 `index.ts` 배럴

### Task 6.2: app 라우트 연결

**Files:**
- Modify: `src/app/page.tsx` → `<HomeView/>`만
- Modify: `src/app/portfolio/page.tsx` → `<PortfolioView/>`
- Modify: `src/app/portfolio/[slug]/page.tsx` → `<ProjectView/>` (generateStaticParams·generateMetadata 유지)
- Delete: `src/components/*` (전량 이관 확인 후)

**Steps:** 라우트 연결 → 구 `components/` 삭제 → `npm run build` PASS → 전 페이지 육안 확인 → Commit `refactor(views): 화면 조립 레이어 분리, 구 components 제거`

---

## Phase 7 — SEO · 메타

### Task 7.1: 구조화 데이터 + 메타

**Files:**
- Modify: `src/app/layout.tsx` (`metadataBase`, canonical, keywords 보강)
- Modify: `src/app/page.tsx` (Person + ProfilePage JSON-LD 주입)
- Modify: `src/app/portfolio/[slug]/page.tsx` (CreativeWork JSON-LD)

### Task 7.2: sitemap · robots

**Files:**
- Create: `src/app/sitemap.ts` (홈·portfolio·slug 동적)
- Create: `src/app/robots.ts`

**Steps:** `npm run build` → `.next`에 sitemap.xml·robots.txt 생성 확인 → JSON-LD를 Rich Results 관점으로 육안 검증 → Commit `feat(seo): JSON-LD·sitemap·robots·metadata 보강`

---

## Phase 8 — 최종 품질 게이트

### Task 8.1: 정리 · 검증

**Steps:**
1. `grep -rE "text-\[[0-9.]+(px|rem)\]" src` → **0건** 확인 (매직넘버 전멸)
2. FSD 의존성 위반 grep (하위→상위 import 없음) 확인
3. `npx tsc --noEmit` · `npx eslint .` · `npm run build` 전부 PASS
4. 전 페이지 육안 회귀 확인 (홈·포트폴리오·상세·인쇄 미리보기)
5. 빈 디렉토리·죽은 코드 제거
6. Commit: `chore: 최종 정리 및 품질 게이트 통과`

---

## 부록 A — Text/Heading 참조 구현 (요지)

```tsx
// src/shared/ui/text.tsx
import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type Variant =
  | "display" | "title-1" | "title-2" | "title-3" | "heading"
  | "lead" | "body" | "body-sm" | "caption" | "eyebrow" | "overline";
type Weight = "normal" | "medium" | "semibold" | "bold" | "extrabold";

const weightCls: Record<Weight, string> = {
  normal: "font-normal", medium: "font-medium", semibold: "font-semibold",
  bold: "font-bold", extrabold: "font-extrabold",
};

export function Text({
  as, variant = "body", weight, tnum, className, children, ...rest
}: {
  as?: ElementType; variant?: Variant; weight?: Weight; tnum?: boolean;
  className?: string; children?: ReactNode;
} & ComponentPropsWithoutRef<ElementType>) {
  const Tag = as ?? "p";
  return (
    <Tag className={cn(`text-${variant}`, weight && weightCls[weight], tnum && "tnum", className)} {...rest}>
      {children}
    </Tag>
  );
}
```
> 주의: `text-${variant}`는 동적 클래스이므로 Tailwind safelist 필요. 안전하게는 `Record<Variant,string>` 정적 매핑으로 구현한다 (실제 구현 시 정적 매핑 채택).

---

## 실행 순서 요약

Phase 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8. 각 Phase는 빌드 가능 상태로 종료. 매 태스크 커밋.
