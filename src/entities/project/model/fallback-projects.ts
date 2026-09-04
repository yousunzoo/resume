// Notion(원본) 미설정·조회 실패 시 사용하는 정적 폴백 카드 데이터.
// 카드 레벨 필드만 담는다(상세 본문은 Notion 페이지 본문 전용).
// Notion "Projects" DB와 동일 내용 — 원본 갱신 시 여기도 함께 맞춘다.
import type { Project } from "./types";

export const fallbackProjects: Project[] = [
  {
    slug: "bankmall",
    title: "뱅크몰 — 금융 플랫폼 프론트엔드 (신청 플로우·정책·매칭)",
    category: "클라이언트 SI",
    featured: true,
    order: 1,
    period: "2024.02 – 2025.06",
    role: "핵심 신청 플로우·정책 구조 설계 · 로직/UI 개발",
    tech: ["React", "Next.js", "TypeScript", "Zustand", "React Hook Form", "Zod", "Tailwind CSS"],
    headline:
      "800만 유저 금융 플랫폼 뱅크몰에서 대출 신청 플로우·금융사 정책 로직·상담사 매칭까지 프론트엔드 구조를 재설계",
    keyResult:
      "담보대출 이탈률 약 80%·운영 오류 약 90% 감소 · 금융사 정책 변경 영향 격리 · 상담사 업무 흐름 자동화",
    tags: ["Multi-step Flow", "Strategy Pattern", "상태 책임 분리", "금융"],
  },
  {
    slug: "moyeoba",
    title: "모여바 — USJ 티켓·e-SIM 여행 바우처 셀프 관리 웹",
    category: "클라이언트 SI",
    featured: true,
    order: 2,
    period: "2026.02 – 2026.08",
    role: "Frontend 개발 · FSD 아키텍처 · API 계층 설계",
    tech: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "NextAuth",
      "TanStack Query",
      "Zustand",
      "React Hook Form",
      "Zod",
      "Tailwind CSS",
    ],
    headline:
      "발권·예약·방문일 변경을 수기로 감당하던 여행 상품을 무회원 셀프서비스 구조로 옮겨 요구사항부터 출시·운영까지 수행",
    keyResult:
      "회원가입 없는 인증코드 로그인부터 다단계 예약·방문일 변경까지 셀프서비스로 구현해 수기 CS 처리 부담 축소",
    tags: ["Next.js", "FSD 아키텍처", "여행 커머스"],
  },
  {
    slug: "clickb-admin",
    title: "클릭비 — 제안서·포트폴리오 운영 어드민(제안서 자동 구조화·발행)",
    category: "클라이언트 SI",
    featured: true,
    order: 3,
    period: "2026.03 – 진행",
    role: "어드민 Frontend 단독 개발 · 제안서 데이터 × 렌더러 설계",
    tech: [
      "Vite",
      "React 19",
      "TypeScript",
      "TanStack Router",
      "TanStack Query",
      "Jotai",
      "React Hook Form",
      "Zod",
    ],
    headline:
      "제안서를 데이터와 렌더러로 분리해 입력만으로 고유 URL을 발행하는 운영 시스템 구축",
    keyResult:
      "원문을 12개 섹션 데이터로 구조화해 고정 렌더러로 발행 · 조판 과정 제거로 작성 시간 단축·품질 상향 평준화 · AI 없이도 동작하는 폴백",
    tags: ["TanStack Router", "서버/UI/폼 상태 분리", "데이터 × 렌더러", "FSD", "제안서 자동화"],
  },
  {
    slug: "directg",
    title: "DirectG — 사용자 웹 신규 구축 + PHP 레거시 관리자 이관",
    category: "클라이언트 SI",
    featured: true,
    order: 4,
    period: "진행",
    role: "사용자 웹·신규 관리자 Frontend · 레거시 분석·마이그레이션 맵 설계",
    tech: ["Next.js", "React", "TypeScript", "Vite", "TanStack Router", "pnpm 모노레포"],
    headline:
      "운영 중인 PHP 커머스 백오피스를 멈추지 않고 Next·Vite 구조로 옮기기 위해 500개 이상 화면·핸들러를 기능 단위로 분석하고 점진 이관 기반을 마련",
    keyResult:
      "PHP 레거시 관리자 500+ 화면·핸들러를 기능 단위로 분류하고, strangler 방식 화면 단위 이관 맵·신규 관리자 API 계약 기반 확보",
    tags: ["PHP → Next.js", "Strangler", "레거시 이관", "pnpm 모노레포"],
  },
  {
    slug: "clickb-site",
    title: "클릭비 — IT 외주 에이전시 공개 사이트·컴포넌트 모노레포",
    category: "자체 도구·인프라",
    featured: true,
    order: 5,
    period: "2025.06 – 진행",
    role: "pnpm 모노레포·디자인시스템 설계 · 공개 사이트 Frontend 단독 개발",
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "react-three-fiber",
      "Framer Motion",
      "pnpm Workspace",
    ],
    headline:
      "재사용 코드를 8개 공유 패키지로 분리하고, 수시로 바뀌는 포트폴리오를 백엔드 부하 없이 갱신하도록 만든 에이전시 공개 사이트",
    keyResult:
      "디자인시스템·훅·API·관측성을 재사용 패키지로 분리해 앱 확장 비용을 낮추고, ISR 태그 캐싱으로 백엔드 부하를 흡수",
    tags: ["pnpm 모노레포", "디자인시스템", "react-three-fiber", "ISR·BFF", "관측성"],
  },
  {
    slug: "chatly",
    title: "Chatly — 맞춤형 언어학습 모바일 앱·어드민",
    category: "클라이언트 SI",
    featured: false,
    order: null,
    period: "2025.03 – 진행",
    role: "React Native 앱 및 웹 연동 구조 개발",
    tech: ["React Native", "Expo", "Next.js", "TypeScript"],
    headline:
      "React Native·Expo 앱에서 WebView PASS 인증과 재사용 가능한 API·데이터 변환 구조를 설계",
    keyResult:
      "웹 기반 본인인증을 모바일 앱에 안정적으로 연결하고 크로스 플랫폼 데이터 구조 정리",
    tags: ["React Native", "WebView 인증", "API 추상화"],
  },
  {
    slug: "cluvit",
    title: "Cluvit — 도메인 거래·옥션·운영 플랫폼",
    category: "클라이언트 SI",
    featured: false,
    order: null,
    period: "프로젝트 수행",
    role: "사용자 웹·대시보드 UI/UX 및 Frontend, 운영자 백오피스",
    tech: ["Next.js", "React", "TypeScript", "NextAuth", "Zustand", "TanStack Query"],
    headline: "도메인 검색·구매·옥션·보유 관리와 운영 백오피스를 하나의 제품 흐름으로 구축",
    keyResult: "사용자 거래 흐름과 주문·정산·권한·운영 로그를 연결한 운영형 플랫폼 구축",
    tags: ["운영형 플랫폼", "Server/Client State", "권한·다국어"],
  },
  {
    slug: "you-are-365",
    title: "you-are-365 — 뷰티·헬스케어 모바일 사용자 서비스",
    category: "클라이언트 SI",
    featured: false,
    order: null,
    period: "진행",
    role: "Next.js App Router 사용자 화면 Frontend 개발",
    tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS"],
    headline:
      "챗봇·시술·화장품·마이페이지까지 모바일 중심 라우트를 구현하고, API 동기화·자산 생성 스크립트를 포함한 프론트엔드 개발 환경을 정리",
    keyResult:
      "초기 스캐폴드를 챗봇·시술·화장품·마이페이지 등 실제 서비스 라우트로 구현하고, 외부 스펙·자산 변화에 대응하는 개발 흐름 구성",
    tags: ["Next.js", "App Router", "모바일 웹"],
  },
  {
    slug: "damoa",
    title: "DAMOA — 인테리어·건설 견적 매칭 플랫폼",
    category: "클라이언트 SI",
    featured: false,
    order: null,
    period: "운영",
    role: "사용자·파트너 웹 + 운영자 백오피스 Frontend 개발",
    tech: ["Next.js 15", "React", "TypeScript", "Tailwind CSS"],
    headline:
      "사용자·파트너·운영자 3주체를 한 서비스에서 처리하기 위해 역할 기반 인증/인가, 폴링 기반 상담 채팅, SEO·보안 대응을 함께 설계",
    keyResult:
      "JWT 역할 기반 라우트 그룹 접근 제어·폴링 차등 갱신 상담 채팅·SEO/미들웨어 보안 대응을 하나의 서비스로 통합",
    tags: ["역할 기반 인가", "폴링 차등 갱신", "SEO·보안"],
  },
  {
    slug: "proposal-template",
    title: "제안서 템플릿·발행 시스템 — 원문→웹 제안서 발행 풀스택",
    category: "자체 도구·인프라",
    featured: false,
    order: null,
    period: "진행",
    role: "사내 영업 도구 · 풀스택 설계·구현",
    tech: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "OpenAI",
    ],
    headline:
      "제안서 원문을 12개 섹션으로 구조화해 공개 링크·PDF로 발행하고, 관리 앱과 SSR 렌더러를 분리해 포트폴리오 기반 제안서 생성 워크플로우를 제품화",
    keyResult:
      "제안서 원문을 공개 URL(/p/[slug])·PDF 산출물로 전환하고, 관리 앱과 공개 렌더러를 공유 DTO로 느슨하게 연결한 풀스택 프로토타입 구축",
    tags: ["제안서 발행", "데이터 × 렌더러", "SSR 뷰어", "Prisma"],
  },
  {
    slug: "si-harness",
    title: "SI Harness — AI 협업 SI 워크플로우 자동화 환경",
    category: "자체 도구·인프라",
    featured: false,
    order: null,
    period: "2026.05 – 진행",
    role: "개인 프로젝트 · Claude Code harness 설계·구현",
    tech: ["Claude Code", "Skill / Agent", "Hooks", "TypeScript", "JSON"],
    headline:
      "SI 프로젝트의 제안~인수 전 과정을 AI가 같은 순서로 따라오도록 command·skill·agent·status 파일로 고정한 Claude Code harness",
    keyResult:
      "반복되는 SI 작업 기준을 프롬프트가 아니라 저장소에 고정 · 세션이 끊겨도 phase·gate를 status.json으로 복원",
    tags: ["AI Harness", "워크플로우 자동화", "Claude Code", "상태 파일"],
  },
  {
    slug: "proposal-automation",
    title: "AI 제안서 자동화 시스템 — 공고 수집→RAG 제안서 초안",
    category: "자체 도구·인프라",
    featured: false,
    order: null,
    period: "프로토타입",
    role: "사내 업무 자동화 · 파이프라인 설계·구현",
    tech: ["Next.js", "React", "TypeScript", "OpenAI", "Supabase", "pgvector", "Playwright"],
    headline:
      "외주 공고 수집부터 RAG 기반 포트폴리오 추천·AI 제안서 초안 생성까지 이어지는 Next.js 자동화 파이프라인을 구축",
    keyResult:
      "위시켓·프리모아 공고 수집 → 유사 사례 RAG 검색 → GPT 제안서 초안 생성까지 스크래핑·pgvector·Notion·Slack 연동으로 자동화",
    tags: ["RAG", "pgvector", "스크래핑 자동화", "OpenAI"],
  },
];

export const portfolioIntro =
  "이력서에는 성과와 핵심 의사결정만 간추렸습니다. 상세 포트폴리오에서는 운영 서비스에서 마주한 문제와 기술적 판단, 구현 과정과 결과를 프로젝트 단위로 풀어 정리했습니다.";
