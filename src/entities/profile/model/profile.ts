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
  image: "/profile.jpeg",
};

export const summary: string[] = [
  "React·TypeScript로 금융 플랫폼과 모바일 서비스를 만들고 있습니다. 화면을 그리는 일보다 신청 조건, 상태 전환, 데이터 흐름처럼 복잡도가 높은 로직을 또렷한 책임 단위로 나누는 데 집중합니다.",
  "사용자 이탈과 오류를 지표로 확인한 뒤 구조 개선으로 이어, 대출 신청 플로우 이탈률 약 80%, 운영 오류 접수율 약 90%를 줄였습니다. 금융사별 신청 정책은 Strategy Pattern으로 분리하고, multi-step flow·상태 책임 분리·공통 컴포넌트화로 정책 변경이 미치는 영향 범위를 좁혔습니다.",
  "반복되는 인터랙션·데이터·상태 로직은 재사용 패턴으로 추상화해 팀 전체의 변경 비용을 낮춥니다. ThrottleButton·useThrottleFn으로 계층별 중복요청을 차단하고, 제네릭 createStore와 Proxy 셀렉터로 Zustand 공통 인터페이스를 설계하며, BaseFetcher 인터셉터 파이프라인으로 API 계층을 일관되게 관리합니다.",
];

// 자기소개 (About) — 이력서 상단 소개 문단
export const aboutMe: string[] = [
  "프론트엔드를 화면을 구현하는 역할에 한정하지 않고, 비즈니스 요구사항을 안정적으로 변경하고 확장할 수 있는 구조로 만드는 일이라고 생각합니다.",
  "기능을 빠르게 추가하는 것뿐 아니라 요구사항이 바뀌었을 때 수정 범위를 예측하고 기존 기능에 미치는 영향을 줄일 수 있는 구조를 중요하게 봅니다.",
  "복잡한 서비스에서는 화면 자체보다 상태와 정책이 어디에서 결정되고 어떻게 연결되는지가 중요하다고 생각합니다. 신청·상담·관리자처럼 여러 단계와 역할이 연결되는 기능을 개발하며 상태와 비즈니스 로직의 책임을 분리하고, 변경과 문제 발생 시 원인을 추적하기 쉬운 구조로 개선해 왔습니다.",
  "누적 사용자 800만 명 규모의 대출 비교 플랫폼을 장기간 개발·운영하며 신규 기능 개발뿐 아니라 성능 개선, 레거시 마이그레이션, 장애 대응과 운영 개선을 경험했습니다. 또한 공통 컴포넌트와 디자인 시스템, 모노레포, 로깅·관측 환경을 구축하며 개인의 구현 범위를 넘어 팀의 반복 작업과 변경 비용을 줄이는 개발 환경을 만들어 왔습니다.",
  "자사 서비스와 함께 다양한 SI 프로젝트에도 참여해 요구사항 구체화부터 설계·개발·출시·운영까지 End-to-End로 경험했습니다. 초기 요구사항을 사용자 Flow와 정책, 화면, API 단위로 구체화하고 기획·디자인·백엔드와 구현 범위를 조율하며 실제 운영 가능한 서비스로 완성하는 역할을 담당했습니다.",
  "기술 자체보다 현재 서비스의 문제와 운영 환경에 적합한 선택인지를 중요하게 생각합니다. 개발 속도와 유지보수성 사이의 균형을 판단하고, 배포 이후에도 요구사항 변화와 운영 이슈에 지속적으로 대응할 수 있는 프론트엔드를 만드는 것을 목표로 합니다.",
];

// 전문 영역 (Focus) — 도구가 아닌 도메인·역량 키워드. 사이드바 상단에 노출
export const focusAreas: string[] = [
  "서비스 구조 설계",
  "운영형 플랫폼",
  "성능·관측성",
  "디자인시스템",
];

// 핵심 지표 하이라이트 (홈 상단 강조용)
export const metrics: { value: string; label: string }[] = [
  { value: "800만+", label: "누적 사용자 금융 플랫폼" },
  { value: "80%↓", label: "대출 신청 플로우 이탈률" },
  { value: "90%↓", label: "운영 오류 접수율" },
  { value: "5→1", label: "동일 UI 변경 시 수정 파일" },
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
        title: "프론트엔드 공통 개발 기반 구축",
        description:
          "상태 관리·API·공통 UI·디렉터리 구조를 표준화하고 Start-kit과 공통 패키지를 구축해 신규 프로젝트의 초기 개발 기반 통일",
      },
      {
        title: "레거시 서비스 현대화 및 품질 개선",
        description:
          "장기간 운영 중인 서비스의 기술 부채를 개선하고 프레임워크 전환, 성능 최적화, 오류 대응 및 관측 환경 구축",
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
          "금융사마다 달라지는 신청 로직을 Strategy Pattern으로 분리해 특정 금융사의 정책 변경이 공통 신청 Flow에 전파되지 않는 구조로 개선",
      },
      {
        title: "공통 UI 변경 범위 5개 → 1개 파일로 축소",
        description:
          "서비스별로 중복 구현된 레이아웃·리스트 구조를 공통 인터페이스와 컴포넌트로 통합해 반복 수정과 변경 비용 감소",
      },
      {
        title: "서비스 중단 없이 프론트엔드 레거시 현대화",
        description:
          "React 17 → 18, Next.js 10 → 13 마이그레이션과 기존 코드베이스 60% 이상의 TypeScript 전환을 점진적으로 수행",
      },
      {
        title: "Lighthouse Performance 51 → 82 · SEO 91 → 100",
        description:
          "렌더링 전략과 리소스 로딩 구조를 개선해 실제 운영 서비스의 웹 성능과 검색 최적화 지표 향상",
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
    category: "State & Data",
    items: ["Zustand", "TanStack Query"],
  },
  {
    category: "Build & Observability",
    items: ["pnpm", "Vite", "Loki"],
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
  { name: "컴퓨터그래픽스운용기능사", issuer: "한국산업인력공단", year: "2022" },
  { name: "GTQ 1급", issuer: "한국생산성본부", year: "2021" },
  { name: "컴퓨터활용능력 1급", issuer: "대한상공회의소", year: "2021" },
];
