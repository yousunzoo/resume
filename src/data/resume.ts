// ────────────────────────────────────────────────────────────────────────────
// 이력서 · 포트폴리오 콘텐츠 데이터 (Single Source of Truth)
// 모든 페이지는 이 파일의 데이터를 참조합니다.
// 프로젝트 상세는 Notion "Selected Portfolio" 데이터베이스 기반입니다.
// 카피(문장)는 글 다듬기 에이전트의 리팩토링 대상 영역입니다.
// ────────────────────────────────────────────────────────────────────────────

export interface ProfileLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  links: ProfileLink[];
  email: string;
  phone?: string;
  image?: string;
}

export interface TitledItem {
  title: string;
  description: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  team: string;
  description: string;
  responsibilities: TitledItem[];
  keyImpact: TitledItem[];
}

export interface TechStackGroup {
  category: string;
  items: string[];
}

export interface EducationItem {
  institution: string;
  program: string;
  period: string;
  status: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

// 프로젝트 카테고리
export type ProjectCategory =
  | "금융 서비스"
  | "플랫폼"
  | "모바일 앱"
  | "백오피스·자동화";

// 상세: 기술적 의사결정 블록
export interface ProjectDecision {
  heading: string;
  body: string;
}

// 상세: Before → After 표의 한 행
export interface BeforeAfterRow {
  aspect: string;
  before: string;
  after: string;
}

// 관련 글(devlog) 링크 — 개별 글 URL 확보 전까지 href는 devlog 메인
export interface RelatedPost {
  title: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  featured: boolean;
  period: string;
  role: string;
  tech: string[];
  headline: string; // 한 줄 요약
  keyResult: string; // 핵심 성과
  tags: string[]; // 카드용 키워드 칩
  angle?: string; // 카드용 성격 라벨 (예: "사용자 경험·운영 개선") — 대표 카드 구분용
  cardCategory?: string; // 카드 상단 카테고리 라벨 오버라이드 (예: "금융", "SI")

  // 기존 요약 필드 (카드/리스트에서 사용)
  summary: string;

  // 상세 페이지 필드
  overview?: string; // 프로젝트 배경/개요
  scope?: string[]; // 담당 범위
  problem: string; // 문제
  decision: string; // 대표 의사결정 요약
  decisions?: ProjectDecision[]; // 기술적 의사결정 상세
  beforeAfter?: BeforeAfterRow[];
  result: string; // 결과 요약
  results?: string[]; // 결과 상세
  highlights: string[]; // 핵심 작업/성과 리스트
  interviewPoints?: string[]; // 면접에서 설명할 포인트
  relatedPosts?: RelatedPost[]; // 관련 devlog 글
  needsMoreInfo?: boolean; // 상세 보강 예정 여부
}

// devlog 메인 (개별 글 URL 확보 시 각 RelatedPost.href 교체)
export const DEVLOG_URL = "https://yousunzoo.notion.site/devlog";

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
  "프론트엔드를 화면을 만드는 일이 아니라, 자주 바뀌는 요구사항을 변경에 강한 구조로 번역하는 일로 봅니다. 좋은 설계는 '무엇이 바뀔 수 있는가'를 먼저 정하고, 변하는 축과 고정된 축을 분리하는 데서 시작한다고 생각합니다.",
  "복잡도가 높은 서비스일수록 화면보다 상태·분기·변경 이유가 문제의 핵심입니다. UI 결함을 상태 책임과 변경 영향 범위의 문제로 환원해, 어떤 입력과 정책이 지금 상태를 만들었는지 추적할 수 있는 구조를 우선합니다.",
  "누적 사용자 800만 명의 대출 비교 플랫폼(뱅크몰)을 장기간 개발·운영하며 성능 개선, 레거시 마이그레이션, 장애 대응을 겪었고, 단일 화면을 넘어 모노레포·디자인시스템·관측성으로 팀 전체의 변경 비용을 낮추는 일까지 다뤘습니다.",
  "자사 금융 서비스를 장기간 개발·운영하는 동시에, 다양한 SI 프로젝트에서 요구사항 구체화부터 설계·개발·출시·운영까지 End-to-End로 참여했습니다. 정리되지 않은 비즈니스 요구사항을 정책·Flow·API·화면 구조로 구체화하고, 실제 운영 가능한 서비스로 전환하는 과정까지 프론트엔드의 역할로 봅니다.",
  "기획·디자인·백엔드와 개발 초기부터 핵심 Flow와 권한·API·운영 방식을 함께 정의하고, 속도와 지속 가능성 사이의 트레이드오프를 프로젝트 맥락에 맞게 판단합니다. 코드의 완성 기준을 배포가 아니라 운영에서 의도대로 동작하는 시점으로 둡니다.",
];

// 전문 영역 (Focus) — 도구가 아닌 도메인·역량 키워드. 사이드바 상단에 노출
export const focusAreas: string[] = [
  "프론트엔드 아키텍처",
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
        title: "금융 서비스 핵심 Flow 설계",
        description:
          "대출상품별 정책·상태·분기가 복합적으로 결합된 비교·신청 프로세스 설계 및 고도화",
      },
      {
        title: "변경에 강한 프론트엔드 아키텍처 구축",
        description:
          "금융사별 정책 격리, 상태 책임 분리, 공통 UI·API·Store 구조 표준화",
      },
      {
        title: "사용자·상담사·운영자를 연결하는 플랫폼 구축",
        description:
          "사용자 신청부터 상담사 매칭, 관리자 운영까지 역할별 업무 Flow가 연결되는 서비스 구조 개발",
      },
      {
        title: "레거시 현대화 및 개발 기반 개선",
        description:
          "React·Next.js 마이그레이션, TypeScript 전환, 디자인 시스템·공통 패키지·관측성 환경 구축",
      },
      {
        title: "SI 프로젝트 End-to-End 기술 수행",
        description:
          "고객 요구사항을 정책·Flow·화면·API 구조로 구체화하고 설계부터 개발·출시·운영까지 수행",
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
      {
        title: "Start-kit 구축으로 신규 프로젝트 초기 개발 비용 절감",
        description:
          "반복되는 초기 환경 설정을 Boilerplate로 구성하고 상태 관리·API·공통 UI·디렉터리 구조를 표준화해 프로젝트별 초기 구축 작업과 코드 구조 편차를 줄임",
      },
    ],
  },
];

export const projects: Project[] = [
  // ── 1. 뱅크몰 주택담보·전세대출 신청 플로우 ─────────────────────────────
  {
    slug: "bankmall-mortgage-flow",
    title: "뱅크몰 — 주택담보·전세대출 신청 플로우 개선",
    category: "금융 서비스",
    cardCategory: "금융",
    angle: "사용자 경험·운영 개선",
    featured: true,
    period: "2024.02 – 2024.03",
    role: "신청 플로우 구조 재설계 · 핵심 로직/UI 개발",
    tech: ["React", "Next.js", "TypeScript", "Zustand"],
    headline:
      "복잡하게 얽힌 입력·진행 상태를 분리한 Multi-step 구조로 담보대출 신청 플로우를 재설계",
    keyResult: "사용자 이탈률 약 80% 감소 · 운영 오류 접수율 약 90% 감소",
    tags: ["Multi-step Flow", "상태 책임 분리", "금융", "visualViewport", "IME"],
    summary:
      "복잡한 담보대출 신청을 UI 문제가 아니라 상태 책임과 단계 전환 구조의 문제로 다시 정의하고, 입력 상태와 Flow 상태를 분리한 multi-step 구조로 재설계했습니다.",
    overview:
      "금융사·담보 유형·사용자 입력값에 따라 다음 질문과 검증 조건이 달라지는 대출 신청 서비스입니다. 기존에는 하나의 Context와 분기 로직이 입력 상태, 진행 단계, 외부 데이터, 다음 단계 결정을 한꺼번에 떠안고 있었습니다.",
    problem:
      "조건 하나를 고치면 다른 단계까지 예상치 못한 영향이 번졌고, 운영 오류가 났을 때 어떤 입력과 분기를 거쳐 지금 상태가 됐는지 추적하기 어려웠습니다. 모바일에서는 키보드·스크롤·viewport 변화까지 겹쳐 신청 경험이 흔들렸습니다.",
    decision:
      "입력 상태와 Flow 상태를 분리하고, 범용 Form으로 과하게 추상화하지 않았으며, 외부 데이터 조회·변환 책임을 화면 밖으로 뺐습니다.",
    decisions: [
      {
        heading: "입력 상태와 Flow 상태를 분리했습니다",
        body: "UI 컴포넌트만 나눠서는 상태 변경과 단계 이동의 결합이 풀리지 않습니다. 각 신청 단계를 관심사 단위로 나누고, 사용자 입력 데이터와 현재 플로우 상태를 별개의 책임으로 관리했습니다.",
      },
      {
        heading: "모든 Form을 하나로 추상화하지 않았습니다",
        body: "상품마다 질문은 비슷해도 실제 금융 정책과 검증 조건은 다릅니다. 범용 Form 하나로 묶으면 시간이 갈수록 Boolean props와 조건 분기가 불어날 게 뻔했습니다. 그래서 항상 동일한 UI·데이터 처리만 공통화하고, 정책에 종속되는 분기는 명시적으로 남겼습니다.",
      },
      {
        heading: "외부 데이터 의존성을 화면 밖으로 분리했습니다",
        body: "KB시세·공시지가·행정안전부 주소 데이터의 조회와 변환 책임을 모듈로 떼어내고, 화면은 현재 단계에 필요한 형태의 데이터만 소비하도록 구성했습니다.",
      },
    ],
    beforeAfter: [
      { aspect: "상태", before: "단일 Context 중심", after: "입력 상태 / Flow 상태 분리" },
      { aspect: "분기", before: "컴포넌트 내부 조건문", after: "단계 결정 로직 분리" },
      { aspect: "외부 데이터", before: "화면에서 직접 제어", after: "조회·변환 모듈 분리" },
      { aspect: "변경 영향", before: "전체 신청 흐름 추적", after: "해당 단계·정책 범위 중심" },
    ],
    result:
      "사용자 이탈률 약 80%, 운영 환경 오류 접수율 약 90%를 함께 줄였습니다. 화면만 손보는 데 그치지 않고 상태와 분기 구조를 함께 개선했기에, 사용자 경험과 운영 안정성을 동시에 잡을 수 있었습니다.",
    results: [
      "사용자 이탈률 약 80% 감소",
      "운영 환경 오류 접수율 약 90% 감소",
      "모바일 신청 경험 안정화 — 키보드·스크롤·뒤로가기 엣지 케이스 해소",
    ],
    highlights: [
      "입력 상태와 Flow 상태를 분리한 multi-step 구조 재설계",
      "단계 결정 로직을 컴포넌트 밖으로 분리",
      "KB시세·공시지가·행정안전부 외부 데이터 조회·변환 모듈화",
      "모바일 신청 경험 안정화 — iOS Safari visualViewport resize 리스너로 키패드 노출 시 레이아웃 대응, 한글 IME isComposing 처리로 keydown 중복 입력 방지",
    ],
    interviewPoints: [
      "Context를 유지하지 않고 상태 책임을 분리한 이유",
      "범용 Form 추상화를 어디에서 멈춰야 하는가",
      "금융 정책처럼 변경 주기가 다른 로직을 어떻게 격리하는가",
      "이탈률 감소와 구조 개선의 관계를 어떻게 설명할 것인가",
    ],
    relatedPosts: [
      { title: "pathname 기반 Multi-Step flow 설계", href: DEVLOG_URL },
      { title: "모바일 환경에서 키패드 등장에 따른 반응형 구현하기", href: DEVLOG_URL },
      { title: "가격 입력 input 만들기", href: DEVLOG_URL },
      { title: "스크롤이 있을 때 하단을 블러 처리하는 컴포넌트 만들기", href: DEVLOG_URL },
      { title: "커스텀 Select 컴포넌트 만들기", href: DEVLOG_URL },
    ],
  },

  // ── 2. 뱅크몰 신용·개인회생자대출 신청 플로우 ───────────────────────────
  {
    slug: "bankmall-credit-flow",
    title: "뱅크몰 — 신용·개인회생자대출 신청 플로우 개선",
    category: "금융 서비스",
    cardCategory: "금융",
    angle: "상태 모델링",
    featured: true,
    period: "2025.05 – 2025.06",
    role: "신청 라우팅·단계 진입 검증 설계 · 핵심 로직/UI 개발",
    tech: ["React", "Next.js", "TypeScript", "Zustand"],
    headline:
      "URL과 신청 상태를 동기화해 새로고침·뒤로가기에도 신청 단계가 유지되는 Multi-step 구조 설계",
    keyResult:
      "챗봇형 UI를 단계형 신청 경험으로 전환 · 비정상 단계 진입 방어 · 정책 변경 영향 범위 축소",
    tags: ["URL as State", "Step Guard", "Routing", "Discriminated Union"],
    summary:
      "챗봇형 신청 UI에서 진행 위치를 알기 어렵고 분기·검증 로직이 흩어진 문제를, pathname + query로 신청 단계를 표현하고 Step Guard를 도입해 풀었습니다.",
    overview:
      "신용대출·개인회생자대출은 사용자 조건에 따라 질문 순서와 검증 기준이 달라집니다. 기존 챗봇형 UI에서는 남은 단계가 가늠되지 않았고, 분기 조건과 유효성 검사가 여러 컴포넌트에 흩어져 있었습니다.",
    problem:
      "컴포넌트 내부 step 값만으로 신청 상태를 관리하면, 웹의 기본 동작인 새로고침·뒤로가기·직접 URL 접근을 애플리케이션 상태와 매번 따로 맞춰야 했습니다.",
    decision:
      "URL을 단순 주소가 아니라 상태 모델로 쓰고, 주소를 조작할 수 있다는 전제 아래 Step Guard를 반드시 함께 설계했습니다.",
    decisions: [
      {
        heading: "URL을 단순 주소가 아니라 상태 모델로 사용했습니다",
        body: "각 단계를 pathname으로 표현하고 세부 조건은 query에 담았습니다. 사용자의 현재 위치를 URL 자체가 설명하므로, 브라우저 History와 신청 단계가 같은 기준으로 움직였습니다.",
      },
      {
        heading: "대신 Step Guard를 반드시 함께 설계했습니다",
        body: "URL을 직접 고치면 정상적인 이전 단계를 건너뛰고 중간 단계로 들어올 수 있습니다. 그래서 라우트 진입 전에 이전 단계 필수 데이터의 존재 여부, 현재 사용자 조건에서 해당 단계의 유효성, 조건이 바뀐 뒤 현재 단계를 유지할 수 있는지를 검증했습니다.",
      },
    ],
    beforeAfter: [
      { aspect: "진행 상태", before: "컴포넌트 내부 step", after: "pathname + query" },
      { aspect: "새로고침", before: "Client State 복구 의존", after: "URL로 현재 단계 식별" },
      { aspect: "뒤로가기", before: "UI와 History 불일치 가능", after: "History와 단계 이동 정렬" },
      { aspect: "직접 접근", before: "렌더링 후 예외 처리", after: "Guard에서 진입 전 검증" },
      { aspect: "정책 변경", before: "여러 컴포넌트 추적", after: "Guard·Decision 영역 중심" },
    ],
    result:
      "전체 신청 과정과 현재 위치를 한눈에 알 수 있는 단계형 UX를 확보하고, 비정상 단계로의 직접 접근을 진입 전에 막았습니다. 입력 상태와 네비게이션 상태의 책임을 나눠, 정책이 바뀔 때 수정 범위를 단계 결정 영역으로 좁혔습니다.",
    results: [
      "사용자가 전체 신청 과정과 현재 위치를 인지하는 단계형 UX 확보",
      "비정상 단계 직접 접근 사전 차단",
      "입력 상태와 네비게이션 상태의 책임 분리",
      "정책 변경 시 수정 범위를 단계 결정 영역 중심으로 축소",
    ],
    highlights: [
      "pathname + query를 신청 단계의 상태 모델로 사용",
      "라우트 진입 전 Step Guard로 유효성 검증",
      "비정상 단계 진입 방어 · History와 단계 정렬",
      "State Machine 없이 공통 인터페이스 + 상품별 차이 허용",
      "대출 타입 분기를 Discriminated Union + Exhaustiveness Checking으로 안전하게 처리 — 미처리 케이스를 컴파일 타임에 검출",
    ],
    interviewPoints: [
      "URL을 상태로 사용할 때 얻는 것과 치르는 비용",
      "query 조작이나 직접 접근을 어떻게 막았는가",
      "새로고침 시 클라이언트 상태 복구 문제를 어떻게 봤는가",
      "State Machine을 도입하지 않은 이유",
    ],
    relatedPosts: [
      { title: "pathname 기반 Multi-Step flow 설계", href: DEVLOG_URL },
      { title: "타입 확장하기, 좁히기", href: DEVLOG_URL },
    ],
  },

  // ── 3. 뱅크몰 금융사별 상담 신청 로직·상품 목록 ─────────────────────────
  {
    slug: "bankmall-strategy",
    title: "뱅크몰 — 금융사별 상담 신청 로직·상품 목록 개선",
    category: "금융 서비스",
    cardCategory: "금융",
    angle: "정책·아키텍처",
    featured: true,
    period: "2024.12 – 2025.02",
    role: "정책 로직 구조 설계 · 공통 컴포넌트화 · 마이그레이션",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    headline:
      "금융사별 정책과 공통 UI를 분리해 정책 변경이 다른 신청 로직으로 전파되지 않는 구조 설계",
    keyResult: "동일 UI 수정 파일 5개 → 1개 · 금융사별 정책 변경 영향 격리",
    tags: ["Strategy Pattern", "변경 영향 격리", "Migration"],
    summary:
      "금융사별 신청 정책이 하나의 거대한 조건문에 뭉쳐 있고 같은 UI가 여러 페이지에 복제된 문제를, 정책은 Strategy Pattern으로 격리하고 같은 이유로 바뀌는 UI만 공통화해 풀었습니다.",
    overview:
      "문제를 둘로 갈랐습니다. 하나는 여러 금융사의 신청 조건이 한 함수에 모여, 특정 금융사 정책을 고치면 다른 금융사 로직까지 영향을 받는 정책 변경 문제입니다. 다른 하나는 같은 상품 리스트·레이아웃이 여러 페이지에 복제된 UI 변경 문제입니다. 둘은 변경 이유가 다르므로 같은 추상화로 묶으면 안 된다고 판단했습니다.",
    problem:
      "여러 금융사의 신청 조건이 한 함수에 모여 특정 금융사 정책을 고칠 때 다른 금융사 로직까지 흔들렸고, 같은 상품 리스트·레이아웃이 여러 페이지에 복제돼 작은 디자인 변경에도 최대 5개 파일을 고쳐야 했습니다.",
    decision:
      "금융사 정책은 Strategy Pattern으로 격리하고, UI는 같은 이유로 바뀌는 것만 공통화했으며, 정책 로직의 일부 중복은 의도적으로 남겼습니다.",
    decisions: [
      {
        heading: "금융사 정책 — Strategy Pattern",
        body: "금융사별 로직이 같은 인터페이스를 따르되, 각 정책은 독립적으로 유지되도록 구성했습니다. 신규 금융사를 추가할 때 기존 조건문을 건드리는 대신 새로운 Strategy를 더할 수 있는 구조를 만들었습니다.",
      },
      {
        heading: "UI — 같은 이유로 변경되는 것만 공통화",
        body: "화면 모양이 같다는 이유만으로 묶지 않았습니다. 디자인이나 레이아웃이 바뀔 때 늘 함께 변하는 영역만 공통 컴포넌트로 묶었습니다.",
      },
      {
        heading: "정책 로직의 일부 중복은 허용했습니다",
        body: "비슷한 금융사 로직을 하나로 묶으면 그 차이가 Boolean flag와 새 조건문으로 삐져나올 가능성이 컸습니다. 중복 제거보다 독립적으로 바꿀 수 있는 구조를 택했습니다.",
      },
    ],
    beforeAfter: [
      { aspect: "금융사 정책", before: "거대 조건문", after: "금융사별 Strategy" },
      { aspect: "신규 금융사", before: "기존 조건문 수정", after: "새로운 Strategy 추가" },
      { aspect: "UI 변경", before: "최대 5개 파일 수정", after: "공통 컴포넌트 1개 수정" },
      { aspect: "중복 기준", before: "비슷하면 공통화", after: "같은 이유로 변경될 때 공통화" },
      { aspect: "테스트 범위", before: "전체 조건 영향 확인", after: "금융사별 범위 명확화" },
    ],
    result:
      "동일 UI 수정 시 손대는 파일을 5개에서 1개로 줄이고, 금융사별 정책 변경 범위를 격리했습니다. 구조 개선과 함께 JavaScript → TypeScript, styled-components → Tailwind CSS 전환을 변경이 실제 일어나는 영역부터 점진적으로 진행해 배포 리스크를 낮췄습니다.",
    results: [
      "동일 UI 수정 시 수정 파일 5개 → 1개",
      "금융사별 정책 변경 범위 격리",
      "금융사 로직 관련 운영 오류 리포트 감소",
      "신규 금융사 추가 시 기존 조건문 수정 없이 확장",
    ],
    highlights: [
      "금융사별 신청 규칙을 Strategy Pattern으로 분리",
      "같은 이유로 변경되는 UI만 공통 컴포넌트화",
      "정책 로직의 일부 중복은 독립 변경을 위해 의도적으로 유지",
      "JavaScript → TypeScript, styled-components → Tailwind CSS 점진적 전환",
    ],
    interviewPoints: [
      "Strategy Pattern이 단순 함수 분리와 다른 점",
      "일부 코드 중복을 일부러 남긴 이유",
      "공통 컴포넌트의 경계를 정하는 기준",
      "운영 중인 서비스에서 구조를 안전하게 바꾸는 방법",
    ],
    relatedPosts: [
      { title: "타입 확장하기, 좁히기", href: DEVLOG_URL },
      { title: "템플릿 리터럴 타입을 키로 갖는 객체 만들기", href: DEVLOG_URL },
    ],
  },

  // ── 4. 뱅크몰 대출상담사 매칭 플랫폼 ────────────────────────────────────
  {
    slug: "bankmall-matching",
    title: "뱅크몰 — 대출상담사 온·오프라인 매칭 플랫폼",
    category: "플랫폼",
    featured: false,
    period: "2024.07 – 2024.08",
    role: "주요 업무 플로우 개발 · Frontend 기여도 약 70%",
    tech: ["React", "Next.js", "TypeScript", "React Hook Form", "Zod", "Slack Webhook"],
    headline:
      "상담사 입력·서버 검증·운영 변경 전달까지 하나의 업무 흐름으로 엮은 B2B2C 유료 서비스",
    keyResult: "상담사 입력 오류 감소 · 운영 변경 전달 자동화 · Frontend 약 70% 기여",
    tags: ["B2B2C", "Zod", "운영 자동화"],
    summary:
      "대출상담사와 대출 희망 사용자를 잇는 B2B2C 유료 서비스에서, 화면 구현을 넘어 상담 데이터의 정확성, 서버 검증, 운영팀의 정책 변경 인지까지 하나의 제품 흐름으로 설계했습니다.",
    overview:
      "상담사가 다루는 데이터는 고객의 비교 신청 정보와 대출 조건을 엮은 업무 데이터입니다. 잘못된 입력은 단순 Form 오류로 끝나지 않고 실제 상담과 운영까지 번질 수 있었습니다. 또 정책이 바뀌었을 때 개발팀만 알고 운영팀이 예전 방식으로 상담하면, 배포가 정상 종료돼도 서비스 운영은 정상이 아닐 수 있었습니다.",
    scope: [
      "제안서 프리셋 관리",
      "고객 조건 기반 제안서 발송",
      "상담 진행 관리",
      "관리자 감독 화면",
      "비교 신청 데이터 필터 및 Form",
      "운영 정책·공통 코드 변경 알림",
    ],
    problem:
      "상담사의 잘못된 입력이 실제 상담·운영까지 번질 수 있었고, 정책 변경을 개발팀만 알면 배포가 끝나도 운영이 제대로 이어지지 않을 수 있었습니다.",
    decision:
      "Zod + React Hook Form으로 입력 계약을 명시하고, 최종 비즈니스 판단은 서버에 남겼으며, 운영 변경 전달을 Slack Webhook으로 자동화했습니다.",
    decisions: [
      {
        heading: "Zod + React Hook Form으로 입력 계약을 명시했습니다",
        body: "Form 검증을 단순 required 체크가 아니라 제출 가능한 데이터의 스키마로 다뤘습니다. 잘못된 입력은 되도록 사용자가 입력하는 그 시점에 막았습니다.",
      },
      {
        heading: "최종 비즈니스 판단은 서버에 남겼습니다",
        body: "클라이언트 검증은 빠른 피드백 역할로 두고, 최종 판단 기준은 서버 응답으로 유지했습니다. 서버 오류에는 화면마다 제각각 대응하지 않도록 fallback 메시지 처리 기준을 정리했습니다.",
      },
      {
        heading: "운영 변경 전달을 자동화했습니다",
        body: "공통 코드나 정책이 바뀌면 Slack Webhook으로 운영 채널에 내용을 자동 전달했습니다. 개발 완료의 기준을 기능 배포가 아니라, 운영자가 바뀐 정책으로 실제 업무를 할 수 있는 시점까지로 잡았습니다.",
      },
    ],
    result:
      "상담사 입력 오류를 줄이고 운영팀이 변경사항을 인지하는 시간을 단축했습니다. 유료 서비스의 주요 업무 플로우를 안정화했고, 프론트엔드에 약 70% 기여했습니다.",
    results: [
      "상담사 입력 오류 감소",
      "운영팀 변경사항 인지 시간 단축",
      "유료 서비스 주요 업무 플로우 안정화",
      "Frontend 약 70% 기여",
    ],
    highlights: [
      "Zod + React Hook Form으로 입력 계약을 스키마화",
      "클라이언트 검증과 서버 최종 판단의 책임 분리",
      "Slack Webhook으로 정책·공통 코드 변경 운영 전달 자동화",
      "제안서 발송·상담 관리·관리자 감독 등 주요 업무 화면 구현",
    ],
    interviewPoints: [
      "Zod Validation과 서버 Validation의 책임을 어떻게 나눴는가",
      "프론트엔드 범위를 운영 알림까지 넓힌 이유",
      "B2B2C 서비스에서 상담사·관리자·고객의 데이터 관점 차이",
      "약 70% 기여에서 직접 책임진 범위",
    ],
    relatedPosts: [
      { title: "타입스크립트와 에러 핸들링, 그리고 모킹", href: DEVLOG_URL },
      { title: "onKeyDown 이벤트 중복 실행 문제", href: DEVLOG_URL },
    ],
  },

  // ── 5. Chatly 언어학습 모바일 앱·어드민 ─────────────────────────────────
  {
    slug: "chatly",
    title: "Chatly — 맞춤형 언어학습 모바일 앱·어드민",
    category: "모바일 앱",
    featured: false,
    period: "2025.03 – 진행",
    role: "React Native 앱 및 웹 연동 구조 개발",
    tech: ["React Native", "Expo", "Next.js", "TypeScript"],
    headline:
      "React Native·Expo 앱에서 WebView PASS 인증과 재사용 가능한 API·데이터 변환 구조를 설계",
    keyResult:
      "웹 기반 본인인증을 모바일 앱에 안정적으로 연결하고 크로스 플랫폼 데이터 구조 정리",
    tags: ["React Native", "WebView 인증", "API 추상화"],
    summary:
      "MBTI 기반 맞춤형 학습 콘텐츠를 제공하는 언어학습 모바일 앱·어드민에서, WebView를 인증 브리지로 삼아 웹 기반 PASS 인증을 앱에 잇고 API·Form 변환 레이어로 변경 영향을 줄였습니다.",
    overview:
      "MBTI 기반 맞춤형 학습 콘텐츠를 제공하는 언어학습 모바일 앱·어드민 프로젝트입니다. 학습 콘텐츠, 퀴즈, 학습 기록과 분석까지 모바일 학습 경험 전반을 구성했습니다.",
    scope: [
      "React Native·Expo 기반 iOS/Android 앱 개발",
      "WebView·deep linking·secure storage 등 모바일 연동",
      "PASS 본인인증 연동 구조",
      "API Fetcher 및 데이터 변환 유틸",
      "콘텐츠 유형별 렌더링 및 최적화",
    ],
    problem:
      "웹 기반 PASS 인증을 React Native 앱에서 그대로 쓸 수 없었고, 앱·WebView·서버 사이에서 인증 결과를 안전하게 주고받아야 했습니다. 동시에 API DTO와 모바일 Form이 바로 붙어 있으면 서버·UI 변경이 서로에게 크게 번지는 문제가 있었습니다.",
    decision:
      "WebView를 인증 브리지로 쓰고, API 호출부를 추상화했으며, DTO와 Form 모델을 변환 레이어로 갈랐습니다.",
    decisions: [
      {
        heading: "WebView를 인증 브리지로 사용",
        body: "PASS 인증은 WebView에서 수행하고, 인증 결과는 Next.js API Route에서 서버 검증한 뒤 postMessage로 앱에 넘기도록 구성했습니다. 앱은 검증된 결과만 받아 후속 화면 이동을 처리하도록 역할을 나눴습니다.",
      },
      {
        heading: "API 호출부 추상화",
        body: "특정 HTTP 라이브러리 API가 기능 코드 곳곳에 스며들지 않도록 커스텀 Fetcher 인터페이스를 두고, 토큰 주입·에러 처리·로깅을 실제 기능 로직과 떼어냈습니다.",
      },
      {
        heading: "DTO와 Form 모델 분리",
        body: "DB·API 중심 DTO를 화면 Form이 직접 쓰지 않도록 form ↔ request ↔ response 변환 레이어를 두어, UI와 서버 스펙이 바뀔 때의 영향도를 줄였습니다.",
      },
    ],
    result:
      "웹 기반 본인인증을 모바일 앱에 안정적으로 잇고, 크로스 플랫폼에서 재사용할 수 있는 API·데이터 변환 구조를 정리했습니다.",
    results: [
      "웹 기반 PASS 인증을 모바일 앱에 안정적으로 연결",
      "커스텀 Fetcher로 HTTP 관심사와 기능 로직 분리",
      "DTO ↔ Form 변환 레이어로 서버·UI 변경 영향 축소",
    ],
    highlights: [
      "WebView 기반 PASS 인증 브리지 설계",
      "Next.js API Route 서버 검증 후 postMessage 전달",
      "커스텀 Fetcher 인터페이스로 API 호출부 추상화",
      "DTO ↔ Form 변환 레이어 도입",
    ],
    interviewPoints: [
      "WebView 메시지를 믿으면 안 되는 이유와 서버 검증 위치",
      "React Native에서 웹 인증을 연결할 때 쿠키가 걸리는 이유",
      "Fetcher 추상화의 적절한 경계",
      "API DTO와 Form Model을 분리하는 이유",
    ],
    relatedPosts: [
      { title: "Next.js fetch를 활용한 API fetcher 인터페이스 설계", href: DEVLOG_URL },
    ],
  },

  // ── 6. Cluvit 도메인 거래·옥션·운영 플랫폼 ──────────────────────────────
  {
    slug: "cluvit",
    title: "Cluvit — 도메인 거래·옥션·운영 플랫폼",
    category: "플랫폼",
    featured: false,
    period: "프로젝트 수행",
    role: "사용자 웹·대시보드 UI/UX 및 Frontend, 운영자 백오피스",
    tech: ["Next.js", "React", "TypeScript", "NextAuth", "Zustand", "TanStack Query"],
    headline: "도메인 검색·구매·옥션·보유 관리와 운영 백오피스를 하나의 제품 흐름으로 구축",
    keyResult: "사용자 거래 흐름과 주문·정산·권한·운영 로그를 연결한 운영형 플랫폼 구축",
    tags: ["운영형 플랫폼", "Server/Client State", "권한·다국어"],
    summary:
      "도메인 검색·구매·옥션·보유 관리로 이어지는 사용자 서비스와, 주문·정산·쿠폰·CS·권한·로그를 다루는 백오피스를 하나의 도메인으로 보고 함께 구축했습니다.",
    overview:
      "도메인 검색부터 등록·구매·옥션·보유 도메인 관리까지 이어지는 사용자 서비스와, 도메인·옥션·주문·정산·쿠폰·CS·공지·FAQ·배너·팝업·설정·권한·로그를 다루는 백오피스를 함께 구축한 프로젝트입니다.",
    scope: [
      "사용자 웹 및 대시보드 UI/UX·프론트엔드 개발",
      "도메인 검색·구매·옥션·보유 관리 화면 구현",
      "운영자 백오피스 프론트엔드 개발",
      "인증·상태·서버 데이터 관리 구조 설계",
      "다국어 화면·콘텐츠 확장을 고려한 UI 구조 적용",
    ],
    problem:
      "사용자 화면만 구현하면 거래 이후 운영자가 주문·정산·CS·옥션 상태를 관리하는 흐름과 끊깁니다. 같은 도메인 데이터가 사용자와 운영자에게 서로 다른 관점으로 보여야 했고, 옥션처럼 서버 상태가 빠르게 변하는 영역과 권한·운영 로그까지 함께 다뤄야 했습니다.",
    decision:
      "사용자 서비스와 운영 시스템을 하나의 도메인으로 보고, Server State와 Client State의 책임을 나눴으며, 관리자 권한·운영 로그와 다국어 확장을 구조에 담았습니다.",
    decisions: [
      {
        heading: "사용자 서비스와 운영 시스템을 하나의 도메인으로 이해",
        body: "거래 이후 운영자가 주문·정산·CS·옥션 상태를 어떻게 관리하는지까지 이어 화면 구조를 설계했습니다. 같은 도메인 데이터가 사용자와 운영자에게 서로 다른 관점으로 보인다는 점을 고려했습니다.",
      },
      {
        heading: "Server State와 Client State 책임 분리",
        body: "원격 데이터의 조회·갱신·캐시 책임과 화면 인터랙션 상태를 갈랐습니다. 거래·옥션처럼 서버 상태가 빠르게 변하는 영역에서 클라이언트 Store가 서버 데이터의 원본 노릇을 하지 않도록 나눴습니다.",
      },
      {
        heading: "관리자 권한과 운영 로그",
        body: "메뉴 노출만으로 권한이 끝나지 않도록 페이지 접근·액션 노출·실제 서버 Permission의 의미를 일치시켰습니다. 주문·정산·쿠폰·CS처럼 운영 영향도가 큰 기능은 변경·실행 이력을 추적할 수 있는 구조와 함께 다뤘습니다.",
      },
      {
        heading: "다국어 확장",
        body: "언어별 텍스트를 화면 안에 그대로 붙이지 않고 언어 리소스와 UI 구조를 분리해, 서비스가 늘어나도 화면 구조를 다시 짜지 않도록 했습니다.",
      },
    ],
    result:
      "사용자 거래 흐름과 주문·정산·권한·운영 로그를 하나로 이은 운영형 플랫폼을 구축했습니다.",
    results: [
      "사용자 거래 흐름과 운영 백오피스를 하나의 제품 흐름으로 연결",
      "Server/Client State 책임 분리로 갱신 빈도 높은 데이터 관리",
      "권한·운영 로그·다국어 확장을 구조로 반영",
    ],
    highlights: [
      "사용자 서비스와 운영 백오피스를 하나의 도메인으로 설계",
      "Server State / Client State 책임 분리",
      "관리자 권한과 운영 로그 정합성 확보",
      "언어 리소스와 UI 구조 분리로 다국어 확장",
    ],
    interviewPoints: [
      "사용자 대시보드와 관리자 백오피스의 상태 책임은 어떻게 다른가",
      "옥션처럼 갱신 빈도가 높은 서버 데이터를 어떻게 다뤘는가",
      "관리자 권한을 프론트엔드와 서버에서 어떻게 나눴는가",
      "다국어 서비스에서 UI 구조와 번역 리소스를 어떻게 분리했는가",
    ],
    relatedPosts: [
      { title: "Suspense와 ErrorBoundary", href: DEVLOG_URL },
      { title: "서버 사이드 리액트", href: DEVLOG_URL },
    ],
  },

  // ── 7. 클릭비 공개 사이트·컴포넌트 모노레포 ─────────────────────────────
  {
    slug: "clickb-site",
    title: "클릭비 — IT 외주 에이전시 공개 사이트·컴포넌트 모노레포",
    category: "플랫폼",
    featured: false,
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
    summary:
      "800만 유저 뱅크몰을 만든 IT 외주 개발사 클릭비의 공개 사이트를 pnpm 모노레포로 구축하고, ui·hook·api-client·observability 등 8개 공유 패키지로 앱과 재사용 코드의 경계를 분리했습니다. 홈 오비탈 3D는 포트폴리오 데이터의 해시태그 빈도를 시각화하고, 포트폴리오는 ISR로 재검증합니다.",
    overview:
      "클릭비는 웹·앱·플랫폼 구축을 기획부터 운영까지 제공하는 IT 외주 개발사입니다. 공개 사이트는 회사·포트폴리오를 알리는 마케팅 창구이자, 사내에서 늘어날 여러 앱이 공유할 컴포넌트·훅·API·관측성 코드를 담는 모노레포의 첫 소비 앱입니다.",
    scope: [
      "pnpm 워크스페이스 모노레포 및 8개 공유 패키지 설계",
      "@click-b/ui 디자인시스템(105개 컴포넌트·Ladle)",
      "공개 사이트 Frontend(홈·포트폴리오·문의)",
      "ISR·BFF 데이터 계층 및 pino→Loki 관측성",
    ],
    problem:
      "마케팅 사이트 하나는 정적 페이지로 끝나지만, 사내에서 계속 늘어날 앱들이 같은 디자인시스템·훅·API 규칙·로깅을 매번 다시 만들면 유지보수가 흩어집니다. 포트폴리오는 어드민에서 수시로 바뀌어, 매 요청마다 백엔드를 조회하면 부하와 지연이 생깁니다.",
    decision:
      "재사용 코드를 8개 워크스페이스 패키지로 분리하고, 데이터 조회는 ISR 태그 캐싱과 BFF로 감쌌으며, 3D는 장식이 아니라 데이터 시각화로 설계했습니다.",
    decisions: [
      {
        heading: "재사용 코드를 워크스페이스 패키지로 분리했습니다",
        body: "ui(105개 컴포넌트·Ladle 스토리), hook(페이지네이션·미디어쿼리 등), api-client(ky 인터셉터), observability(pino→Loki), types·utils·config·scripts로 나눴습니다. 앱은 조합만 하고 공통 규칙은 패키지가 소유하도록 경계를 그었고, changesets로 패키지 버전을 관리하며 create-app·create-package 스캐폴딩 스크립트로 신규 앱·패키지 생성을 자동화했습니다.",
      },
      {
        heading: "ISR 태그 캐싱과 BFF로 백엔드 부하를 흡수했습니다",
        body: "포트폴리오 목록·상세를 revalidate 300초로 재검증하고, fetch 레벨에 next.tags를 붙여 Data Cache가 백엔드 응답을 흡수하도록 했습니다. 공개 앱은 /api/portfolios/* BFF 라우트로 백엔드를 프록시해, 클라이언트가 백엔드 스펙에 직접 묶이지 않게 했습니다.",
      },
      {
        heading: "3D를 데이터 시각화로 묶었습니다",
        body: "홈 오비탈(react-three-fiber)이 포트폴리오 해시태그 빈도를 집계한 키워드 풀을 렌더하도록 해, 콘텐츠가 늘면 시각화도 함께 자라도록 했습니다. 장식용 3D가 아니라 실제 데이터가 흐르는 화면으로 뒀습니다.",
      },
      {
        heading: "관측성을 패키지로 표준화했습니다",
        body: "pino + pino-loki로 서버 로그를 Loki에 적재하고, 브라우저 로그는 /api/log 라우트로 수집해 서버·클라이언트 로깅을 하나의 관측성 패키지로 통일했습니다.",
      },
    ],
    result:
      "디자인시스템·훅·API·관측성을 앱과 분리한 모노레포를 구축하고, 수시로 바뀌는 포트폴리오를 백엔드 부하 없이 갱신하는 공개 사이트를 완성했습니다.",
    results: [
      "8개 공유 패키지로 디자인시스템·훅·API·관측성을 앱과 분리 (모노레포 전체 약 1,000개 TS 파일)",
      "ISR 태그 캐싱 + BFF로 포트폴리오를 백엔드 부하 없이 재검증",
      "홈 오비탈 3D를 포트폴리오 데이터 기반으로 자동 갱신",
      "changesets·스캐폴딩으로 앱·패키지 추가 비용 축소",
    ],
    highlights: [
      "pnpm 워크스페이스 모노레포에 8개 공유 패키지 설계 (@click-b/ui·hook·api-client·observability·types·utils·config·scripts)",
      "105개 컴포넌트 디자인시스템 + Ladle 스토리로 컴포넌트 개발·문서화",
      "react-three-fiber 오비탈을 DB 포트폴리오 해시태그 빈도 기반으로 렌더",
      "ISR revalidate 300s + fetch next.tags Data Cache + /api/portfolios BFF 라우트",
      "pino→Loki 서버 로그 + /api/log 브라우저 로그 수집 관측성 패키지",
      "changesets 버전 관리 · create-app/create-package 스캐폴딩 자동화",
    ],
    interviewPoints: [
      "마케팅 사이트에 모노레포·디자인시스템까지 도입한 판단 기준과 손익",
      "ISR revalidate와 fetch 태그 캐싱을 함께 쓴 이유, 온디맨드 갱신과의 트레이드오프",
      "3D를 데이터 시각화로 묶어 얻은 것과 성능 관리 방법",
      "공유 패키지 경계를 어디서 끊었고 앱과 패키지 책임을 어떻게 나눴는가",
    ],
  },

  // ── 8. 클릭비 제안서·포트폴리오 운영 어드민 ───────────────────────────────
  {
    slug: "clickb-admin",
    title: "클릭비 — 제안서·포트폴리오 운영 어드민(제안서 자동 구조화·발행)",
    category: "백오피스·자동화",
    cardCategory: "Ops · Automation",
    angle: "제안서 자동화·운영",
    featured: true,
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
    summary:
      "영업 담당자가 제안서 원문을 붙여넣으면 백엔드 AI가 12개 섹션으로 구조화하고, 어드민에서 섹션을 검수·보정해 고정 렌더러로 고유 URL에 발행하는 운영 도구입니다. Vite 기반 SPA에 TanStack Router 타입세이프 라우팅과 서버/UI/폼 상태 3분할, Feature-Sliced Design을 적용했습니다.",
    overview:
      "영업 건마다 제안서를 새로 디자인·조판해 시간이 들고 담당자·건별 품질 편차가 컸으며, 산출물이 PDF/PPT라 모바일 열람과 포트폴리오 연계가 불편했습니다. 발주 플랫폼 규정상 회사명·연락처 노출도 금지돼, '글만 준비하면 보낼 수 있는 웹 제안서가 나온다'를 컨셉으로 제안서를 데이터(내용) × 렌더러(디자인)로 분리해 템플릿화했습니다. 어드민은 이 제안서를 구조화·검수·발행하고 포트폴리오·프로젝트·프롬프트를 함께 운영하는 도구입니다.",
    scope: [
      "제안서 섹션 에디터 — 12개 섹션 구조화·검수·완성도 체크",
      "제안서 발행·미리보기 및 공개 URL(proposals/[slug])",
      "포트폴리오·프로젝트 CRUD 및 발행 연동",
      "AI 프롬프트 관리(prompts) — 구조화 프롬프트 운영",
      "TanStack Router 타입세이프 라우팅·인증 가드·공통 API 계층",
    ],
    problem:
      "제안서 원문 형식이 제각각이라 사람이 매번 섹션을 나누고 조판했고, 서버 데이터(제안서·포트폴리오·프로젝트)와 편집 UI 상태, 폼 입력이 뒤섞이면 화면이 커질수록 상태 추적이 어려워집니다. AI 구조화 결과를 그대로 믿을 수도 없어, 사람이 검수·보정할 편집 계층이 필요했습니다.",
    decision:
      "제안서를 데이터 × 렌더러로 분리하고, 서버/UI/폼 상태를 3분할했으며, AI는 '생성'이 아니라 '구조화 + 검수 대상'으로 한정하고 규칙 기반 폴백을 뒀습니다.",
    decisions: [
      {
        heading: "제안서를 데이터 × 렌더러로 분리했습니다",
        body: "바뀌는 것은 섹션 데이터뿐이고 레이아웃·디자인은 고정입니다. 12개 섹션마다 전용 에디터·렌더러가 해당 데이터만 다루고, 섹션 완성도 체크로 빠진 항목을 드러냈습니다. 결과물은 파일이 아니라 고유 URL(proposals/[slug])로 발행해 모바일 열람·재전송 없는 수정·포트폴리오 연계를 자연스럽게 했고, 회사명·연락처 같은 신원 정보는 기본값에서 구조적으로 배제했습니다.",
      },
      {
        heading: "서버 · UI · 폼 상태를 3분할했습니다",
        body: "원격 데이터의 조회·캐시·무효화는 TanStack Query가, 화면 인터랙션 상태는 Jotai가, 폼 입력·검증은 React Hook Form + Zod가 맡도록 책임을 갈랐습니다. 서버 데이터가 클라이언트 Store의 사본으로 흩어지지 않게 해 편집·발행 흐름의 상태를 예측 가능하게 유지했습니다.",
      },
      {
        heading: "TanStack Router 타입세이프 라우팅 + FSD를 적용했습니다",
        body: "라우터 플러그인이 생성하는 routeTree로 경로·파라미터를 타입 수준에서 보장하고, 진입 가드로 인증을 처리했습니다. entities·features·widgets·shared 계층으로 제안서·포트폴리오·프로젝트·프롬프트 도메인을 나눠 기능이 늘어도 같은 패턴으로 확장하도록 했습니다.",
      },
      {
        heading: "AI는 '생성'이 아니라 '구조화 + 검수 대상'으로 한정했습니다",
        body: "사실·수치·의미는 원문 그대로 두고, 형식이 제각각인 원문을 정해진 섹션으로 분해하는 데만 AI를 썼습니다. 구조화는 백엔드가 수행하고 어드민은 프롬프트를 관리·튜닝하며 결과 섹션을 사람이 검수·보정합니다. AI 장애·거부·빈 입력에도 발행이 멈추지 않도록 규칙 기반 폴백을 뒀습니다.",
      },
    ],
    beforeAfter: [
      { aspect: "산출물", before: "PDF/PPT 파일", after: "고유 URL 웹 제안서" },
      { aspect: "제작 방식", before: "건별 수동 디자인·조판", after: "원문 → 섹션 구조화·검수·렌더" },
      { aspect: "수정·전달", before: "수정 후 파일 재전송", after: "같은 링크에 그대로 반영" },
      { aspect: "상태 관리", before: "서버·UI·폼 상태 혼재", after: "Query·Jotai·RHF 3분할" },
      { aspect: "신원 노출", before: "실수로 노출 위험", after: "비노출을 기본값으로 구조적 차단" },
    ],
    result:
      "원문 입력 → 섹션 구조화 → 검수 → 발행까지 동작하는 어드민을 구축했습니다. 조판 과정을 없애 작성 시간을 줄이고 품질을 상향 평준화했으며, 링크 기반 발행으로 열람 편의성과 포트폴리오 연계 설득력을 확보했습니다.",
    results: [
      "원문 입력 → 섹션 구조화 → 검수 → 발행 전 과정 동작",
      "제안서 조판 과정 제거로 작성 시간 단축·품질 상향 평준화",
      "서버/UI/폼 상태 3분할로 편집·발행 흐름 상태 예측 가능화",
      "AI 구조화 + 규칙 기반 폴백으로 AI 없이도 발행 지속",
    ],
    highlights: [
      "제안서를 데이터 × 렌더러로 분리해 12개 섹션 에디터·렌더러·완성도 체크 구현",
      "TanStack Query·Jotai·React Hook Form으로 서버/UI/폼 상태 3분할",
      "TanStack Router 생성형 routeTree로 타입세이프 라우팅·인증 가드",
      "Feature-Sliced Design으로 제안서·포트폴리오·프로젝트·프롬프트 도메인 분리",
      "AI 프롬프트 관리(prompts)와 결과 섹션 검수·규칙 기반 폴백",
      "발행 URL(proposals/[slug])·미리보기, 신원 비노출 기본값",
    ],
    interviewPoints: [
      "서버/UI/폼 상태를 3분할한 기준과 각 계층의 책임",
      "AI를 '구조화 + 검수 대상'으로 한정한 이유와 무손실·폴백 보장 방법",
      "데이터 × 렌더러 분리가 템플릿 유지보수에 주는 이점",
      "TanStack Router 타입세이프 라우팅과 FSD로 얻은 확장성",
    ],
    relatedPosts: [
      { title: "제안서 페이지 템플릿 개발 노트", href: DEVLOG_URL },
    ],
  },

  // ── 9. 모여바 (mario-wifi-front) — 여행 바우처 셀프 관리 웹 ──────────────
  {
    slug: "moyeoba",
    title: "모여바 — USJ 티켓·e-SIM 여행 바우처 셀프 관리 웹",
    category: "플랫폼",
    cardCategory: "SI",
    angle: "End-to-End",
    featured: true,
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
    summary:
      "네이버 스마트스토어에서 USJ 티켓·익스프레스 패스·닌텐도 파크·e-SIM 등을 구매한 고객이 알림톡 인증코드로 로그인해 바우처를 수령·예약·활성화하고 방문일까지 직접 바꾸는 모바일 웹입니다.",
    overview:
      "회원가입 없이 구매자가 스스로 바우처를 수령·관리·변경하는 모바일 셀프서비스 창구입니다. Next.js 15 App Router 위에 Feature-Sliced Design 아키텍처를 얹어, 서로 다른 상품 5종을 같은 패턴으로 확장할 수 있게 설계했습니다.",
    scope: [
      "인증코드 로그인 — 알림톡 6자리 코드 기반 무회원 로그인",
      "주문 목록·상세 — USJ 입장권/익스프레스 패스/닌텐도/JTR/e-SIM 5종",
      "USJ 입장권 방문일 변경 — 티켓 선택 → 재고·차액 캘린더 → 환불·입금정보 → 약관동의 → 확정 다단계 플로우",
      "e-SIM 활성화 — QR 발급, 사용량·잔량 표시, 기기별 설치 가이드",
      "공통 API 계층·인증·관측성(에러 로깅·analytics)",
    ],
    problem:
      "스마트스토어에서 여행 상품을 파는 동안 발권·예약·방문일 변경·e-SIM 활성화 같은 구매 후 처리를 수기 CS로 감당하기 벅찼습니다. 회원가입 없이 구매자가 직접 바우처를 수령·관리·변경할 수 있는 창구가 필요했습니다.",
    decision:
      "Feature-Sliced Design으로 상품 5종을 같은 패턴으로 확장하고, 인터셉터 기반 Fetcher 계층과 NextAuth 무회원 인증, 모바일 실사용 대응을 함께 설계했습니다.",
    decisions: [
      {
        heading: "Feature-Sliced Design 아키텍처",
        body: "app / widgets / features / entities / shared 5계층으로 책임을 갈랐습니다. entities는 순수 API·타입·상수, features는 도메인 단위 UI·쿼리·모델, widgets는 이를 조합한 뷰로 두어 상품 5종을 같은 패턴으로 확장했습니다.",
      },
      {
        heading: "인터셉터 기반 Fetcher 계층 · 서버/클라이언트 이원화",
        body: "BaseFetcher에 요청·응답 인터셉터 파이프라인을 두고 서버·클라이언트 Fetcher로 나눴습니다. 요청 인터셉터가 JWT를 자동 주입하고, 응답 인터셉터가 401에서 자동 로그아웃·쿠키 정리를 처리합니다. fetch가 4xx/5xx에 reject하지 않는 문제는 명시적 에러 throw로 보정해 mutation 성공 콜백이 잘못 호출되는 것을 막았습니다.",
      },
      {
        heading: "인증코드 기반 무회원가입 로그인",
        body: "스마트스토어 구매자가 알림톡으로 받은 코드를 검증해 accessToken을 발급하고, NextAuth v5 Credentials + JWT 세션에 담아 미들웨어에서 라우트를 가드했습니다. 미인증 상태면 callbackUrl을 붙여 로그인으로 보내고, 인증된 상태에서 로그인 페이지에 접근하면 홈으로 되돌립니다.",
      },
      {
        heading: "모바일 실사용 환경 대응 + 관측성",
        body: "카카오 인앱 브라우저를 감지해 외부 브라우저로 자동 이탈시키고(타임아웃·취소·재시도·URL 복사 fallback), 전역 에러는 Slack Webhook으로 프록시 전송했습니다. GA4 기반 커스텀 analytics 계층으로 클릭·유저플로우·페이지를 추적했습니다.",
      },
    ],
    result:
      "무회원 인증코드 로그인부터 상품 5종의 발권·예약·활성화, 방문일 변경 다단계 플로우까지 셀프서비스로 묶어, 구매 후 처리를 수기 CS에 기대던 부담을 줄였습니다.",
    results: [
      "상품 5종을 같은 패턴으로 확장 가능한 프론트 아키텍처 확보",
      "회원가입 없이 인증코드만으로 로그인·라우트 가드 동작",
      "방문일 변경·발권·활성화까지 셀프서비스로 처리 가능",
      "인앱 브라우저 이탈·Slack 에러 로깅·GA4로 실사용 관측성 확보",
    ],
    highlights: [
      "Feature-Sliced Design 5계층으로 상품 5종 확장 구조 설계",
      "요청/응답 인터셉터 기반 서버·클라이언트 이원화 Fetcher 계층 — JWT 자동 주입·401 자동 로그아웃",
      "NextAuth v5 Credentials + JWT + 미들웨어로 무회원 인증·라우트 가드 구현",
      "USJ 입장권 방문일 변경 다단계 플로우 구현(React Hook Form + Zod)",
      "카카오 인앱 브라우저 이탈 처리 · Slack 에러 로깅 · GA4 커스텀 analytics 구축",
    ],
    interviewPoints: [
      "FSD의 entities/features/widgets/shared 경계를 어떤 기준으로 나눴고, 상품 5종 확장 시 중복을 어떻게 통제했나",
      "BaseFetcher 인터셉터 파이프라인과 서버/클라이언트 분기 설계, fetch가 4xx에 reject하지 않는 문제를 어떻게 보정했나",
      "NextAuth Credentials + JWT에서 미들웨어 가드와 401 인터셉터의 자동 로그아웃을 어떻게 연동했나",
      "방문일 변경 캘린더의 재고·차액 조회 queryKey를 어떻게 설계했나",
    ],
    relatedPosts: [
      { title: "Feature Sliced Design 그게 뭔데...", href: DEVLOG_URL },
      { title: "Next.js fetch를 활용한 API fetcher 인터페이스 설계", href: DEVLOG_URL },
      { title: "Suspense와 ErrorBoundary", href: DEVLOG_URL },
      { title: "API 중복 요청, 버튼 더블 클릭 방지하기", href: DEVLOG_URL },
    ],
  },
];

export const techStack: TechStackGroup[] = [
  {
    category: "Frontend",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "React Native",
      "Tailwind CSS",
    ],
  },
  {
    category: "State & Data",
    items: ["Zustand", "TanStack Query", "TanStack Router"],
  },
  {
    category: "Build & Infra",
    items: ["pnpm", "Vite", "Ladle", "changesets", "Docker", "pino", "Loki"],
  },
  {
    category: "Testing",
    items: ["Jest", "React Testing Library", "Vitest"],
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

export const portfolioIntro =
  "이력서에는 성과와 핵심 의사결정만 간추렸습니다. 상세 포트폴리오에서는 운영 서비스에서 마주한 문제와 기술적 판단, 구현 과정과 결과를 프로젝트 단위로 풀어 정리했습니다.";

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

// 이력서 홈에 노출할 대표 프로젝트 (Featured) — 표시 순서 고정 (01~05)
// 금융 3건(사용자 경험·상태 모델링·정책) → SI End-to-End(모여바) → OPS·Automation(클릭비 어드민)
const FEATURED_ORDER: string[] = [
  "bankmall-mortgage-flow",
  "bankmall-credit-flow",
  "bankmall-strategy",
  "moyeoba",
  "clickb-admin",
];
export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort(
    (a, b) => FEATURED_ORDER.indexOf(a.slug) - FEATURED_ORDER.indexOf(b.slug),
  );

// 카테고리 목록 (포트폴리오 필터용)
export const projectCategories: ProjectCategory[] = [
  "금융 서비스",
  "플랫폼",
  "모바일 앱",
  "백오피스·자동화",
];
