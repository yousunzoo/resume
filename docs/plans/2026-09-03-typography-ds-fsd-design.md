# 코드 통합 · 디자인 시스템화 · 고도화 설계

날짜: 2026-09-03
대상: resume-portfolio (Next 16 · React 19 · Tailwind 4)

## 목표

파편화된 코드를 (1) 디자인 시스템화, (2) 타이포그래피·토큰 정리, (3) Feature-Sliced Design 구조 정리, (4) SEO·성능·번들 고도화한다. **시각적 톤(흑백 미니멀)은 보존**하며 정규화 과정의 미세 정제만 허용한다.

## 진단 (파편화 지점)

| 영역 | 현황 | 문제 |
|---|---|---|
| 타이포 | 17개 제각각 폰트 크기 (9.5px~2.5rem, 13.5·12.5·9.5px) | 스케일 부재, 매직넘버 |
| 컴포넌트 | `ui.tsx`에 3개만 추출, 반복 패턴 인라인 | 번호 리스트·뱃지·섹션 헤딩 4곳 중복 |
| 네이밍 | `ui.tsx` vs `ProjectCard.tsx` 혼재, 평면 폴더 | 컨벤션 불일치 |
| 죽은 코드 | `category.tsx` stale 주석(`--c*`), `Reveal` 미사용 props | — |
| 번들 | `framer-motion` 미사용, `public/favicon.png` 755KB | 불필요 의존성·에셋 |
| SEO | sitemap/robots/JSON-LD 없음, 폰트 CDN `@import` | 렌더블로킹·최적화 부재 |

## 1. 구조 — Feature-Sliced Design

Next App Router가 `app/`을 예약하므로 FSD `pages` 레이어는 `views`로 리네임. 파일명은 **kebab-case**, 컴포넌트 export는 PascalCase.

```
src/
├── app/                 # [app] Next 라우팅 + 전역 스타일 (thin)
│   ├── layout.tsx · page.tsx · portfolio/page.tsx · portfolio/[slug]/page.tsx
│   ├── globals.css · sitemap.ts · robots.ts · opengraph-image.tsx
├── views/               # [pages] 화면 조립
│   ├── home/ · portfolio/ · project/
├── widgets/             # [widgets] 자립 UI 블록
│   ├── resume-sidebar/ · resume-content/ · project-detail/ · page-shell/
├── features/            # [features] 상호작용
│   └── filter-projects/
├── entities/            # [entities] 도메인
│   ├── project/ (model · ui · lib · index)
│   └── profile/ (model · index)
└── shared/              # [shared] 도메인 무관 재사용
    ├── ui/ (+icons/) · lib/ (seo·cn) · config/ (site)
```

의존성 규칙: `app → views → widgets → features → entities → shared` (아래로만 import). alias: `@/views @/widgets @/features @/entities @/shared`.

### 파일 매핑
- `data/resume.ts` → `entities/project/model` + `entities/profile/model` 분리
- `ProjectCard` → `entities/project/ui`; `category.tsx` → `entities/project/lib/category-meta`
- `PortfolioList` → `features/filter-projects` (필터 + 테이블)
- `ProjectDetail` → `widgets/project-detail`; `ResumeSidebar` → `widgets/resume-sidebar`
- `app/page.tsx` 섹션들 → `widgets/resume-content/sections/*`
- `SubPageShell` → `widgets/page-shell`
- `ui.tsx`·`icons.tsx`·`Reveal.tsx` → `shared/ui/*`

## 2. 타이포그래피 시스템

Tailwind v4 `@theme`의 `--text-*` 토큰에 size·line-height·weight·letter-spacing을 묶어 선언. 단일 진실 원천.

```css
@theme {
  --text-title-1: 2rem;
  --text-title-1--line-height: 1.12;
  --text-title-1--font-weight: 700;
  --text-title-1--letter-spacing: -0.022em;
}
```

역할 기반 타입 램프:

| 역할 | size | weight | line-height | tracking | 대체 |
|---|---|---|---|---|---|
| `display` | 38 | 800 | 1.05 | -0.022em | 사이드바 이름·Hero |
| `title-1` | 32 | 700 | 1.12 | -0.022em | 페이지 H1 |
| `title-2` | 26 | 700 | 1.15 | -0.02em | 섹션 H2 |
| `title-3` | 20 | 700 | 1.25 | -0.015em | 상세 섹션 제목 |
| `heading` | 19 | 700 | 1.3 | -0.01em | 카드·경력 제목 |
| `lead` | 17 | 600 | 1.55 | -0.01em | 리드 문장 |
| `body` | 15 | 400 | 1.7 | -0.011em | 본문 |
| `body-sm` | 13 | 400 | 1.6 | 0 | 보조 본문 |
| `caption` | 12 | 500 | 1.5 | 0 | 칩·캡션 |
| `eyebrow` | 11 | 700 | 1 | 0.2em upper | 오버라인 |
| `overline` | 10 | 600 | 1 | 0.16em upper | 마이크로 라벨 |

- weight만 가변인 경우 역할 유지 + `<Text weight>` override (size/lh/tracking 잠금)
- `tnum`은 역할과 직교하는 별도 유틸

## 3. shared/ui 프리미티브

- `Text` / `Heading` — `variant`가 역할 토큰에 1:1 매핑, `as`로 시맨틱 태그, `weight` override. 모든 `text-[..]` 인라인 대체
- `Eyebrow`, `SectionHeading`(variant 통합: 메인/상세/사이드바), `NumberedList`(4중복 통합), `Badge`(재직중·Featured·★), `Card`, `Chip`, `Divider`, `TechTag`, `Reveal`(미사용 props 제거), `SkipLink`

## 4. SEO · 성능 · 번들

1. 폰트: CDN `@import` → `next/font/local` Pretendard subset woff2 self-host
2. 구조화 데이터: `shared/lib/seo`에 JSON-LD 빌더 — `Person`(홈)·`CreativeWork`(프로젝트)·`ProfilePage`. `metadataBase`·canonical·per-page OG
3. 크롤링: `app/sitemap.ts`·`app/robots.ts` (slug 동적)
4. 번들: `framer-motion` 제거, `favicon.png` 755KB 최적화, favicon 중복 정리
5. 품질 게이트: `tsc --noEmit` + `eslint` + `next build` 통과, a11y 회귀 없음

## 검증 기준

- 빌드/타입/린트 통과, 렌더 결과 시각적 동등 (톤 보존)
- FSD 의존성 규칙 위반 0
- `text-[..]` 인라인 매직넘버 0 (역할 토큰으로 전량 치환)
