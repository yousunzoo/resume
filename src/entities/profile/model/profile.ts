// ────────────────────────────────────────────────────────────────────────────
// profile 엔티티 — 이력서·소개 콘텐츠 데이터 (Single Source of Truth)
// 카피(문장)는 글 다듬기 에이전트의 리팩토링 대상 영역입니다.
// ────────────────────────────────────────────────────────────────────────────

import type {
  Certification,
  EducationItem,
  Experience,
  Profile,
  TechStackGroup,
} from "./types";

export const profile: Profile = {
  name: "유선주",
  title: "Frontend Developer",
  tagline: "매일 바뀌는 요구사항 속에서, 바뀔 수 있는 구조를 설계합니다.",
  links: [
    { label: "GitHub", href: "https://github.com/yousunzoo" },
    { label: "Devlog", href: "https://yousunzoo.notion.site/devlog" },
  ],
  email: "yousunzoo.dev@gmail.com",
  phone: "010-2624-4817",
  image: "/profile.jpg",
};

export const summary: string[] = [
  "React·TypeScript로 금융 플랫폼과 모바일 서비스를 만들고 있습니다. 화면을 그리는 일보다 신청 조건, 상태 전환, 데이터 흐름처럼 복잡도가 높은 로직을 또렷한 책임 단위로 나누는 데 집중합니다.",
  "사용자 이탈과 오류를 지표로 확인한 뒤 구조 개선으로 연결해, 대출 신청 플로우 이탈률을 약 80%, 운영 오류 접수율을 약 90% 줄였습니다. 금융사별 신청 정책은 Strategy Pattern으로 분리하고, Multi-step Flow·상태 책임 분리·공통 컴포넌트화로 정책 변경이 미치는 영향 범위를 좁혔습니다.",
  "반복되는 인터랙션·데이터·상태 로직은 재사용 패턴으로 추상화해 팀 전체의 변경 비용을 낮춥니다. 공통 UI는 variant와 Figma 기반 시맨틱 토큰으로 설계하고 Storybook으로 문서화해 디자인-개발이 같은 기준을 공유하게 하고, 상태·API 계층은 공통 스토어와 인터셉터 파이프라인으로 일관되게 관리합니다.",
];

// 자기소개 (About) — 이력서 상단 소개 문단
export const aboutMe: string[] = [
  "프론트엔드를 화면을 구현하는 역할에 한정하지 않고, 비즈니스 요구사항을 안정적으로 변경하고 확장할 수 있는 기반을 만드는 일이라고 생각합니다. 누적 사용자 800만 명 규모의 금융 플랫폼을 3년간 개발·운영하며, 요구사항이 바뀌었을 때 수정 범위를 예측하고 기존 기능에 미치는 영향을 줄일 수 있는 구조를 설계해 왔습니다.",
  "복잡한 서비스에서는 화면 자체보다 상태와 정책이 어디에서 결정되고 어떻게 연결되는지가 중요하다고 봅니다. 신청·상담·관리자처럼 여러 단계와 역할이 연결되는 기능을 개발하며 상태와 비즈니스 로직의 책임을 분리했고, 변경이나 문제가 생겼을 때 원인을 추적하기 쉬운 형태로 개선했습니다.",
  "장기간 서비스를 운영하며 신규 기능 개발뿐 아니라 성능 개선, 레거시 마이그레이션, 장애 대응을 경험했고, 공통 컴포넌트와 디자인 시스템·모노레포·관측 환경을 구축해 개인의 구현 범위를 넘어 팀의 반복 작업과 변경 비용을 줄여 왔습니다.",
  "자사 서비스와 함께 다양한 SI 프로젝트에도 참여해, 초기 요구사항을 사용자 Flow와 정책·화면·API 단위로 구체화하고 기획·디자인·백엔드와 구현 범위를 조율하며 요구사항을 실제 운영 가능한 서비스로 완성하는 역할을 담당했습니다.",
  "기술 자체보다 현재 서비스의 문제와 운영 환경에 적합한 선택인지를 중요하게 생각합니다. 개발 속도와 유지보수성 사이의 균형을 판단하고, 배포 이후에도 요구사항 변화와 운영 이슈에 지속적으로 대응할 수 있는 프론트엔드를 만드는 것을 목표로 합니다.",
];

export const experiences: Experience[] = [
  {
    company: "뱅크몰",
    role: "Frontend Developer",
    period: "2023.08 – 재직 중",
    team: "개발팀",
    description:
      "대출 비교·상담 중개 플랫폼과 관리자 시스템을 개발·운영하고 있습니다. 복잡한 금융 정책과 운영 프로세스를 프론트엔드 구조로 설계하고, 레거시 개선과 공통 개발 기반 구축을 주도해 왔습니다. 동시에 다양한 외부 SI 프로젝트에서 요구사항 구체화부터 설계·개발·출시·운영까지 End-to-End로 수행하며, 비즈니스 요구사항을 실제 운영 가능한 서비스로 전환하는 역할을 맡고 있습니다.",
    responsibilities: [
      {
        title: "금융 서비스 핵심 Flow 개발·운영",
        description:
          "주택담보·전세·신용·개인회생 등 대출상품별 비교·신청 프로세스를 개발하고 실제 사용자 및 운영 데이터를 기반으로 지속 개선",
      },
      {
        title: "사용자·상담사·운영자를 연결하는 플랫폼 개발",
        description:
          "사용자 신청부터 상담사 매칭, 관리자 운영까지 역할별 업무 Flow가 연결되는 웹·모바일 서비스 개발",
      },
      {
        title: "디자인 시스템·공통 컴포넌트 설계",
        description:
          "라디오·체크박스 등 공통 컴포넌트를 외부 UI 라이브러리 없이 네이티브 input 기반으로 직접 구현하고, 상태·variant 로직을 헤드리스 훅으로 분리. loading·disabled·error 등 상태·예외별 케이스를 정의해 디자이너와 컴포넌트 스펙을 맞추고, Figma 토큰·Storybook으로 디자인-개발 기준 통일",
      },
      {
        title: "프론트엔드 공통 개발 기반 구축",
        description:
          "상태 관리·API·디렉터리 구조를 표준화하고 Start-kit과 모노레포 공유 패키지를 구축해 신규 프로젝트의 초기 개발 기반 통일",
      },
      {
        title: "레거시 서비스 현대화 및 품질 개선",
        description:
          "장기간 운영 중인 서비스의 기술 부채를 개선하고 프레임워크 전환, 성능 최적화, 오류 대응 및 관측 환경 구축",
      },
      {
        title: "테스트·정적 분석 기반 품질 관리",
        description:
          "대출 상품 필터·상환 계산 등 핵심 비즈니스 로직과 폼 스키마·쿼리 훅·공통 컴포넌트에 단위·컴포넌트 테스트를 작성해 회귀를 방지하고, 타입체크·린트를 CI 게이트로 두어 대규모 TypeScript 전환 과정에서도 안정성 유지",
      },
      {
        title: "SI 프로젝트 End-to-End 수행",
        description:
          "고객 요구사항을 정책·Flow·화면·API 단위로 구체화하고 프론트엔드 설계부터 개발·QA·출시·운영까지 프로젝트 전 과정 참여",
      },
      {
        title: "AI Agent 기반 개발 프로세스 구축·적용",
        description:
          "프로젝트의 아키텍처·코딩 규칙·도메인 지식·작업 절차를 Agent Context로 구조화한 AI Harness를 구축하고 SI 및 신규 프로젝트 개발에 적용",
      },
    ],
    keyImpact: [
      {
        title: "대출 신청 이탈률 약 80% 감소",
        description:
          "복잡하게 결합된 입력·진행 상태를 분리하고 Multi-step 신청 Flow를 재설계해 주택담보·전세대출 신청 과정의 사용자 이탈 개선",
      },
      {
        title: "운영 오류 접수율 약 90% 감소",
        description:
          "Suspense·ErrorBoundary 기반 전역 예외 처리와 Interceptor·AbortController 기반 API 요청 제어를 적용해 사용자 오류 경험과 운영 대응 비용 감소",
      },
      {
        title: "금융사별 정책 변경 영향 범위 최소화",
        description:
          "주택담보대출 신청에서 12종 금융사·신청 방식(API·유선상담·오토메이션)이 하나의 핸들러에 중첩 if-else로 얽혀 오류와 유지보수 부담이 컸던 문제를, case별 동작을 공통 계약(onApply·onDuplicateApply)의 전략으로 위임하고 기본 동작은 defaultStrategy가 처리하는 Strategy Pattern으로 재구성. 특수 정책이 있는 금융사는 공통 신청 Flow를 건드리지 않고 전략만 추가하면 되도록 개선",
      },
      {
        title: "공통 UI 변경 범위 5개 → 1개 파일로 축소",
        description:
          "서비스별로 중복 구현된 레이아웃·리스트·버튼을 variant 기반 공통 컴포넌트와 라우트별 서비스 테마(getServiceColor)로 통합해, 금융 상품마다 UI를 다시 만들지 않고 토큰·variant만으로 대응",
      },
      {
        title: "팀 개발 표준 정착으로 반복 작업 비용 절감",
        description:
          "소수 인원 체제에서 반복 세팅·구현 비용을 낮추기 위해 상태 관리·API·구조를 표준화한 공통 개발 기반을 만들고, 프로토타입·시연으로 팀 채택을 이끌어 4개 프로젝트가 동일 기반 위에서 출발하도록 정착. 코드 컨벤션을 함께 정립하고 리뷰로 기준을 유지",
      },
      {
        title: "BFF로 백엔드 API 은닉 · 공격 표면 축소",
        description:
          "Next.js를 API 서버 앞단 BFF로 두어 백엔드 주소·스펙을 클라이언트에 노출하지 않아 엔드포인트 직접 타격·열거를 차단하고, 인증 토큰은 httpOnly Cookie로 서버에만 유지해 XSS 토큰 탈취를 방지",
      },
      {
        title: "서비스 중단 없이 프론트엔드 레거시 현대화",
        description:
          "보안 취약점 대응을 계기로 React 17 → 18, Next.js 10 → 13 마이그레이션을 라이브러리 단위로 단계적으로 진행하고, 테스트 서버에서 안정성을 검증하며 서비스 중단 없이 완료. 기존 코드베이스 60% 이상의 TypeScript 전환도 병행",
      },
      {
        title: "메인 페이지 LCP 5.8초 → 3.2초 · FCP 2.1초 → 1.1초 단축",
        description:
          "이미지·폰트 로딩과 번들을 최적화하고 코드 스플리팅을 적용해 메인 페이지 로딩 지표를 개선. 같은 작업으로 접근성 64 → 90, SEO 92 → 100 점수도 함께 향상",
      },
    ],
  },
];

export const techStack: TechStackGroup[] = [
  {
    category: "Frontend",
    items: ["TypeScript", "React", "Next.js", "React Native"],
  },
  {
    category: "UI & Design System",
    items: ["Storybook", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "State & Data",
    items: ["Zustand", "Jotai", "TanStack Query"],
  },
  {
    category: "Build & Monorepo",
    items: ["pnpm Workspace", "Vite"],
  },
  {
    category: "Testing",
    items: ["Jest", "React Testing Library"],
  },
];

export const education: EducationItem[] = [
  {
    institution: "패스트캠퍼스",
    program: "프론트엔드 개발 중급 부트캠프 4기",
    period: "2022.12 – 2023.06",
    status: "수료",
  },
  {
    institution: "메가스터디아카데미",
    program: "웹 퍼블리셔 단기집중과정",
    period: "2022.03 – 2023.05",
    status: "수료",
  },
  {
    institution: "금오공과대학교",
    program: "고분자공학전공 학사",
    period: "2016.03 – 2020.02",
    status: "졸업",
  },
];

export const certifications: Certification[] = [
  { name: "웹디자인기능사", issuer: "한국산업인력공단", year: "2022" },
  {
    name: "컴퓨터그래픽스운용기능사",
    issuer: "한국산업인력공단",
    year: "2022",
  },
  { name: "GTQ 1급", issuer: "한국생산성본부", year: "2021" },
  { name: "컴퓨터활용능력 1급", issuer: "대한상공회의소", year: "2021" },
];
