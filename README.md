# 유선주 · Frontend Developer — 이력서 & 포트폴리오

Next.js 기반 개인 이력서·포트폴리오 웹사이트입니다.

## 스택

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **framer-motion** — 스크롤/마이크로 인터랙션

## 구조

```
src/
├── app/
│   ├── layout.tsx              # 전역 셸 (Nav, Footer, ScrollProgress, CursorGlow)
│   ├── page.tsx                # 이력서 홈 (Summary/Experience/Tech/Education)
│   └── portfolio/
│       ├── page.tsx            # 포트폴리오 목록
│       └── [slug]/page.tsx     # 프로젝트 상세 (문제→판단→결과)
├── components/                 # UI · 인터랙션 컴포넌트
└── data/
    └── resume.ts               # 모든 콘텐츠의 단일 소스(Single Source of Truth)
```

콘텐츠를 바꾸려면 `src/data/resume.ts`만 수정하면 됩니다.
