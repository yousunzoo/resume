// ────────────────────────────────────────────────────────────────────────────
// project 엔티티 — 프로젝트 콘텐츠 데이터 (Single Source of Truth)
// 카피(문장)는 글 다듬기 에이전트의 리팩토링 대상 영역입니다.
// ────────────────────────────────────────────────────────────────────────────

import { DEVLOG_URL } from "@/shared/config/site";
import type { Project } from "./types";

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
      "Zustand 커스텀 스토어 인터페이스(createStore)로 상태·액션 접근을 일관화하고 미들웨어·리셋을 표준화",
      "모바일 신청 경험 안정화 — iOS Safari visualViewport resize 리스너로 키패드 노출 시 레이아웃 대응, 한글 IME isComposing 처리로 keydown 중복 입력 방지",
    ],
    relatedPosts: [
      { title: "pathname 기반 Multi-Step flow 설계", href: DEVLOG_URL },
      { title: "모바일 환경에서 키패드 등장에 따른 반응형 구현하기", href: DEVLOG_URL },
      { title: "가격 입력 input 만들기", href: DEVLOG_URL },
      { title: "스크롤이 있을 때 하단을 블러 처리하는 컴포넌트 만들기", href: DEVLOG_URL },
      { title: "커스텀 Select 컴포넌트 만들기", href: DEVLOG_URL },
      { title: "zustand를 좀 더 편리하게 사용할 수 있는 인터페이스 만들기", href: DEVLOG_URL },
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
    relatedPosts: [
      { title: "pathname 기반 Multi-Step flow 설계", href: DEVLOG_URL },
      { title: "타입 확장하기, 좁히기", href: DEVLOG_URL },
      { title: "zustand를 좀 더 편리하게 사용할 수 있는 인터페이스 만들기", href: DEVLOG_URL },
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
      "httpOnly Cookie 인증 상태 동기화 · 웹↔네이티브 메시지 브리지(햅틱·공유)",
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
      "httpOnly Cookie 인증 상태를 토큰 노출 없이 동기화 — 서버 검증 결과만 postMessage로 전달해 인증 Source of Truth를 서버에 유지",
      "웹↔네이티브 메시지 프로토콜(eventType::payload) 표준화 · HapticManager로 iOS/Android 햅틱 차이 흡수",
      "커스텀 Fetcher 인터페이스로 API 호출부 추상화",
      "DTO ↔ Form 변환 레이어 도입",
    ],
    relatedPosts: [
      { title: "Next.js fetch를 활용한 API fetcher 인터페이스 설계", href: DEVLOG_URL },
      { title: "React Native WebView에서 httpOnly Cookie 인증을 연결한 방법", href: DEVLOG_URL },
      { title: "React Native WebView에서 햅틱 피드백 연결하기", href: DEVLOG_URL },
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
        body: "ui(105개 컴포넌트·Ladle 스토리), hook(페이지네이션·미디어쿼리 등), api-client(ky 인터셉터), observability(pino→Loki), types·utils·config·scripts로 나눴습니다. 앱은 조합만 하고 공통 규칙은 패키지가 소유하도록 경계를 그었고, changesets로 패키지 버전을 관리하며 스캐폴딩 CLI로 신규 앱·패키지 생성을 자동화했습니다. config 패키지에는 FSD 레이어 규칙을 강제하는 커스텀 ESLint 플러그인(layer-imports·public-api·slice-segments)을 넣어, 아키텍처 경계 위반을 코드 리뷰가 아니라 lint 단계에서 차단했습니다. 스캐폴딩 CLI는 파일을 바로 쓰지 않고 plan→dry-run→apply→self-check→manifest 흐름으로 두어, 생성 전 계획 확인·덮어쓰기 방지·생성 이력 추적을 보장했습니다.",
      },
      {
        heading: "ISR 태그 캐싱과 BFF로 백엔드 부하를 흡수했습니다",
        body: "포트폴리오 목록·상세를 revalidate 300초로 재검증하고, fetch 레벨에 next.tags를 붙여 Data Cache가 백엔드 응답을 흡수하도록 했습니다. 공개 앱은 /api/portfolios/* BFF 라우트로 백엔드를 프록시해, 클라이언트가 백엔드 스펙에 직접 묶이지 않게 했습니다.",
      },
      {
        heading: "3D를 데이터 시각화로 묶었습니다",
        body: "홈 오비탈(react-three-fiber)이 포트폴리오 해시태그 빈도를 집계한 키워드 풀을 렌더하도록 해, 콘텐츠가 늘면 시각화도 함께 자라도록 했습니다. 실제 데이터가 흐르는 화면으로 뒀습니다.",
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
      "FSD 아키텍처 규칙을 ESLint로 강제해 경계 위반을 자동 차단·리뷰 부담 축소",
    ],
    highlights: [
      "pnpm 워크스페이스 모노레포에 8개 공유 패키지 설계 (@click-b/ui·hook·api-client·observability·types·utils·config·scripts)",
      "105개 컴포넌트 디자인시스템 + Ladle 스토리로 컴포넌트 개발·문서화",
      "react-three-fiber 오비탈을 DB 포트폴리오 해시태그 빈도 기반으로 렌더",
      "ISR revalidate 300s + fetch next.tags Data Cache + /api/portfolios BFF 라우트",
      "pino→Loki 서버 로그 + /api/log 브라우저 로그 수집 관측성 패키지",
      "FSD 레이어 규칙을 커스텀 ESLint 플러그인 3종(layer-imports·public-api·slice-segments)으로 강제",
      "스캐폴딩 CLI를 plan→dry-run→apply→self-check→manifest 파이프라인으로 설계 — 덮어쓰기 방지·생성 이력 추적·doctor 재검증",
      "changesets 버전 관리 · 스캐폴딩 CLI로 앱·패키지 추가 자동화",
    ],
    relatedPosts: [
      { title: "FSD 규칙을 ESLint로 강제해보기", href: DEVLOG_URL },
      { title: "SI 프로젝트용 Start-Kit CLI 만들기", href: DEVLOG_URL },
      { title: "Feature Sliced Design 그게 뭔데...", href: DEVLOG_URL },
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
      "제안서를 데이터 × 렌더러로 분리하고, 서버/UI/폼 상태를 3분할했으며, AI는 '구조화 + 검수 대상'으로 한정하고 규칙 기반 폴백을 뒀습니다.",
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
    relatedPosts: [
      { title: "Feature Sliced Design 그게 뭔데...", href: DEVLOG_URL },
      { title: "Next.js fetch를 활용한 API fetcher 인터페이스 설계", href: DEVLOG_URL },
      { title: "Suspense와 ErrorBoundary", href: DEVLOG_URL },
      { title: "API 중복 요청, 버튼 더블 클릭 방지하기", href: DEVLOG_URL },
    ],
  },

  // ── 10. DirectG — 사용자 웹 신규 구축 + PHP 레거시 관리자 이관 ────────────
  {
    slug: "directg",
    title: "DirectG — 사용자 웹 신규 구축 + PHP 레거시 관리자 이관",
    category: "플랫폼",
    cardCategory: "SI · Migration",
    angle: "레거시 점진 이관",
    featured: false,
    period: "진행",
    role: "사용자 웹·신규 관리자 Frontend · 레거시 분석·마이그레이션 맵 설계",
    tech: ["Next.js", "React", "TypeScript", "Vite", "TanStack Router", "pnpm 모노레포"],
    headline:
      "운영 중인 PHP 커머스 백오피스를 멈추지 않고 Next·Vite 구조로 옮기기 위해 500개 이상 화면·핸들러를 기능 단위로 분석하고 점진 이관 기반을 마련",
    keyResult:
      "PHP 레거시 관리자 500+ 화면·핸들러를 기능 단위로 분류하고, strangler 방식 화면 단위 이관 맵·신규 관리자 API 계약 기반 확보",
    tags: ["PHP → Next.js", "Strangler", "레거시 이관", "pnpm 모노레포"],
    summary:
      "DirectG 사용자 웹 신규 개발과 PHP 레거시 관리자 현대화 이관을 병행한 프로젝트입니다. 기능 개선보다 동작 동일성을 우선하고, 트래픽은 PHP에 둔 채 옮긴 경로만 신규 앱으로 보내는 strangler 방식으로 위험을 통제했습니다.",
    overview:
      "DirectG 사용자 웹 신규 개발과 PHP 레거시 관리자 시스템의 현대화 이관을 병행하는 프로젝트입니다. 레거시 백오피스는 상품·주문·회원·프로모션·통계·파트너·공급사 연동 등 운영 전반을 포함하며, 신규 관리자는 Vite + TanStack Router SPA로 이관 중입니다.",
    scope: [
      "PHP `_Admin_` 하위 약 530개 파일·상위 메뉴 13개를 화면·처리 핸들러·AJAX·엑셀·동기화 패턴으로 분류",
      "로그인·권한 등급·메뉴 숨김 기반 인가·슈퍼 관리자 영역 등 레거시 인증/권한 모델의 리스크와 이관 방안 정리",
      "상품·주문·재고·프로모션·통계 영역의 데이터 소스·도메인 클래스·외부 API 연동·상태 전이 문서화",
      "레거시 화면을 React/Vite/TanStack 구조의 screen·route·API 계약으로 쪼개는 마이그레이션 맵 작성",
    ],
    problem:
      "운영 중인 커머스 백오피스라 한 번에 갈아엎을 수 없었습니다. 결제 정산·주문 상품·발송·배송 타입 등 여러 상태 축이 함께 주문 처리를 결정하고, 디지털 키 발급·취소·환불·적립금 확정 시점이 서로 맞물려 있어, 동작을 그대로 유지한 채 옮겨야 했습니다.",
    decision:
      "기능 개선보다 동작 동일성을 우선하고, 선분석 후 구현·DB 스키마 비변경·작은 단위를 원칙으로 삼았으며, 경로 단위로 롤백 가능한 strangler/reverse proxy 방식으로 이관했습니다.",
    decisions: [
      {
        heading: "동작 동일성을 최우선 원칙으로 삼았습니다",
        body: "이관 과정에서 기능을 개선하려는 유혹을 눌렀습니다. DB 스키마는 바꾸지 않고, 세션 구조 개편은 후순위로 미뤄, 이관 자체의 변경 폭을 최소화했습니다. 옮긴 결과가 기존과 같은지부터 검증할 수 있게 범위를 좁혔습니다.",
      },
      {
        heading: "선분석 후 구현 — 화면 단위 마이그레이션 맵을 먼저 그렸습니다",
        body: "500개가 넘는 화면·핸들러를 화면·처리·AJAX·엑셀·동기화 패턴으로 분류하고, 주문 운영처럼 하나의 핸들러가 PG 취소·포인트 환불·재발송·송장 변경 등 여러 mode를 처리하는 구조를 상태 전이와 감사 로그 기준으로 문서화했습니다.",
      },
      {
        heading: "트래픽은 PHP에 두고 옮긴 경로만 신규 앱으로 보냈습니다",
        body: "기본 트래픽은 레거시 PHP가 받고, 이관이 끝난 경로만 신규 앱으로 프록시하는 strangler 방식을 택했습니다. 문제가 생기면 경로 단위로 되돌릴 수 있어, 운영을 멈추지 않고 점진적으로 옮길 수 있었습니다.",
      },
    ],
    result:
      "500개 이상의 레거시 화면·핸들러를 기능 단위로 분석하고, 인증·권한·외부 공급사 연동·데이터 계약을 문서화해 점진적 마이그레이션 기반을 마련했습니다.",
    results: [
      "레거시 관리자 500+ 화면·핸들러를 기능 패턴 단위로 분류",
      "주문·결제·키발급·환불·권한 도메인을 상태 전이·감사 로그 기준으로 문서화",
      "화면 단위 마이그레이션 맵과 신규 관리자 API 계약 기반 확보",
      "경로 단위 롤백이 가능한 strangler 이관 전략 수립",
    ],
    highlights: [
      "PHP `_Admin_` 500+ 파일·메뉴 13개를 화면·핸들러·AJAX·엑셀·동기화 패턴으로 분석",
      "strangler/reverse proxy로 옮긴 경로만 신규 앱에 보내고 경로 단위 롤백 보장",
      "주문 운영 핸들러의 PG 취소·포인트 환불·재발송·송장 변경 mode를 상태 전이로 정리",
      "업무 로그와 PG/API 디버깅 로그가 분리된 감사 추적성까지 이관 대상으로 포함",
      "신규 관리자를 Vite + TanStack Router SPA로 화면 단위 이관",
    ],
    relatedPosts: [
      { title: "운영 중인 PHP 서비스를 멈추지 않고 Next.js로 옮긴 방법", href: DEVLOG_URL },
      { title: "SI 프로젝트용 Start-Kit CLI 만들기", href: DEVLOG_URL },
    ],
  },

  // ── 11. you-are-365 — 뷰티·헬스케어 사용자 서비스 ─────────────────────────
  {
    slug: "you-are-365",
    title: "you-are-365 — 뷰티·헬스케어 모바일 사용자 서비스",
    category: "플랫폼",
    cardCategory: "SI",
    angle: "모바일 사용자 서비스",
    featured: false,
    period: "진행",
    role: "Next.js App Router 사용자 화면 Frontend 개발",
    tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS"],
    headline:
      "챗봇·시술·화장품·마이페이지까지 모바일 중심 라우트를 구현하고, API 동기화·자산 생성 스크립트를 포함한 프론트엔드 개발 환경을 정리",
    keyResult:
      "초기 스캐폴드를 챗봇·시술·화장품·마이페이지 등 실제 서비스 라우트로 구현하고, 외부 스펙·자산 변화에 대응하는 개발 흐름 구성",
    tags: ["Next.js", "App Router", "모바일 웹"],
    summary:
      "Next.js 15·React 19 기반 뷰티·헬스케어 사용자 서비스입니다. 초기 스캐폴드에서 출발해 챗봇·시술·화장품·마이페이지·문의·FAQ·구매 내역 등 실제 서비스 화면 라우트를 구현하고, 앱형 사용자 경험에 맞춰 모바일 레이아웃과 홈 레이아웃을 분리했습니다.",
    overview:
      "Next.js 15, React 19 기반의 뷰티·헬스케어 성격 사용자 서비스입니다. 초기 스캐폴드에서 출발했지만 현재는 챗봇·시술·화장품·마이페이지·문의·FAQ·구매 내역 등 실제 서비스 화면 라우트가 구현되어 있습니다.",
    scope: [
      "App Router 기반 홈·챗봇·시술 상세·화장품 상세·마이페이지·설정·약관·문의·FAQ·피부 타입·구매 내역 화면 구성",
      "모바일 레이아웃과 홈 레이아웃을 분리해 앱형 사용자 경험에 맞춘 페이지 구조 설계",
      "API 동기화 스크립트·아이콘 생성 스크립트로 외부 스펙·자산 변화에 대응하는 개발 흐름 구성",
      "Storybook 기반 컴포넌트 확인 환경과 lint/build 명령 정리",
    ],
    problem:
      "스캐폴드 상태의 프로젝트를 실제 서비스로 키우려면, 화면을 늘리는 것과 별개로 외부 API 스펙·아이콘 자산이 바뀔 때마다 손으로 맞추는 반복 작업이 병목이 됩니다. 앱형 경험을 노리는 만큼 모바일과 일반 레이아웃의 책임도 뒤섞이면 안 됐습니다.",
    decision:
      "화면 라우트를 App Router 구조로 나누고, 모바일·홈 레이아웃을 분리했으며, 외부 스펙·자산 변화는 동기화 스크립트로 흡수했습니다.",
    decisions: [
      {
        heading: "모바일 레이아웃과 홈 레이아웃을 분리했습니다",
        body: "앱형 사용자 경험을 목표로, 하단 네비게이션 중심의 모바일 레이아웃과 홈 레이아웃을 별개의 책임으로 나눴습니다. 화면마다 레이아웃 분기가 흩어지지 않도록 라우트 그룹 단위로 구조를 잡았습니다.",
      },
      {
        heading: "외부 스펙·자산 변화를 스크립트로 흡수했습니다",
        body: "API 동기화 스크립트와 아이콘 생성 스크립트를 두어, 서버 스펙이나 디자인 자산이 바뀔 때 손으로 맞추는 대신 스크립트로 재생성하도록 개발 흐름을 정리했습니다.",
      },
    ],
    result:
      "챗봇·상품/시술 상세·마이페이지 등 모바일 중심 라우트를 구현하고, API 동기화와 자산 생성 스크립트를 포함한 프론트엔드 개발 환경을 정리했습니다.",
    results: [
      "챗봇·시술·화장품·마이페이지 등 실제 서비스 라우트 구현",
      "모바일·홈 레이아웃 분리로 앱형 사용자 경험에 맞춘 구조 확보",
      "API 동기화·아이콘 생성 스크립트로 외부 변화 대응 흐름 정리",
    ],
    highlights: [
      "App Router로 홈·챗봇·시술·화장품·마이페이지·설정·약관·문의·FAQ 라우트 구성",
      "챗봇 대화 플로우(`chatbot/[chatRoomId]`)와 시술·화장품 목록/상세 구현",
      "모바일 레이아웃과 홈 레이아웃 분리 설계",
      "API 동기화·아이콘 생성 스크립트로 외부 스펙·자산 변화 대응",
      "Storybook 기반 컴포넌트 확인 환경 구성",
    ],
  },

  // ── 12. DAMOA — 인테리어·건설 견적 매칭 플랫폼 ───────────────────────────
  {
    slug: "damoa",
    title: "DAMOA — 인테리어·건설 견적 매칭 플랫폼",
    category: "플랫폼",
    cardCategory: "SI",
    angle: "3주체 권한·상담",
    featured: false,
    period: "운영",
    role: "사용자·파트너 웹 + 운영자 백오피스 Frontend 개발",
    tech: ["Next.js 15", "React", "TypeScript", "Tailwind CSS"],
    headline:
      "사용자·파트너·운영자 3주체를 한 서비스에서 처리하기 위해 역할 기반 인증/인가, 폴링 기반 상담 채팅, SEO·보안 대응을 함께 설계",
    keyResult:
      "JWT 역할 기반 라우트 그룹 접근 제어·폴링 차등 갱신 상담 채팅·SEO/미들웨어 보안 대응을 하나의 서비스로 통합",
    tags: ["역할 기반 인가", "폴링 차등 갱신", "SEO·보안"],
    summary:
      "인테리어·건설 시공 견적을 요청·매칭·상담·거래·리뷰로 연결하는 플랫폼입니다. 일반 사용자·파트너 기업·운영자 세 주체가 각기 다른 권한과 목적으로 접근하는 구조라, 인증/인가·상태 전이·상담·SEO·관리자 운영 기능이 핵심 과제였습니다.",
    overview:
      "인테리어·건설 시공 견적을 요청·매칭·상담·거래·리뷰로 연결하는 플랫폼입니다. 일반 사용자·파트너 기업·운영자 세 주체가 각기 다른 권한과 목적을 갖고 접근하는 구조라 인증/인가·상태 전이·상담·SEO·관리자 운영 기능이 핵심 과제였습니다.",
    scope: [
      "사용자·파트너 라우트, 견적 요청 검색, 파트너 대시보드, 회사 인증, 파트너 프로필 관리, 채팅, 마이페이지 등 주요 화면 구현",
      "운영자 백오피스 — 문의·FAQ·공지·CMS 카테고리·지역·고객/기업 사용자 관리·채팅 구현",
      "JWT 세션 역할 정보 기반 라우트 그룹별 접근 제어 + 소셜/이메일/토큰 로그인 흐름을 동일 세션 규격으로 통합",
      "Next.js 미들웨어 취약점 대응, 프록시 뒤 호스트 인식/리다이렉트 문제 해결, 검색 유입을 고려한 SEO 구조 정리",
    ],
    problem:
      "사용자·파트너·운영자가 같은 견적 데이터를 서로 다른 권한과 관점으로 다뤄야 했습니다. 상담 채팅은 즉시성이 필요했지만 WebSocket 인프라 없이 풀어야 했고, 검색 유입이 중요한 서비스라 SEO와 프록시 환경의 호스트 인식·미들웨어 보안까지 함께 걸려 있었습니다.",
    decision:
      "역할을 JWT 세션에 담아 라우트 그룹 단위로 인가하고, 상담 채팅은 폴링 차등 갱신으로 즉시성을 확보했으며, SEO·미들웨어 보안을 서비스 구조에 반영했습니다.",
    decisions: [
      {
        heading: "역할을 라우트 그룹 단위 인가로 통합했습니다",
        body: "JWT 세션의 역할 정보를 기준으로 사용자·파트너·운영자 라우트 그룹의 접근을 제어하고, 소셜·이메일·토큰 로그인 흐름을 동일한 세션 규격으로 통합했습니다. 로그인 경로가 여러 개여도 인가 기준은 하나로 유지했습니다.",
      },
      {
        heading: "상담 채팅을 폴링 차등 갱신으로 풀었습니다",
        body: "WebSocket 없이 폴링으로 상담 채팅의 즉시성을 확보하되, 변경이 감지될 때만 전체 데이터를 갱신하는 차등 갱신으로 과도한 요청을 줄였습니다. 인프라 제약 안에서 실시간성과 서버 부하를 함께 관리했습니다.",
      },
      {
        heading: "SEO·미들웨어 보안을 서비스 구조에 반영했습니다",
        body: "검색 유입을 고려한 SEO 구조를 정리하고, Next.js 미들웨어 취약점과 프록시 뒤 호스트 인식·리다이렉트 문제를 함께 대응해, 기능뿐 아니라 유입·보안까지 서비스가 정상 동작하도록 다뤘습니다.",
      },
    ],
    result:
      "사용자·파트너·운영자가 공존하는 견적 매칭 플랫폼에서 역할 기반 인증/인가, 파트너 견적·프로필 관리, 운영자 CMS, 폴링 기반 상담 채팅, SEO·보안 대응을 Next.js 15 구조로 구현했습니다.",
    results: [
      "3주체 역할 기반 인증/인가를 라우트 그룹 접근 제어로 통합",
      "WebSocket 없이 폴링 차등 갱신으로 상담 채팅 즉시성 확보·요청량 절감",
      "파트너 견적·프로필 관리와 운영자 CMS 백오피스 구현",
      "미들웨어 취약점·프록시 호스트 인식·SEO 구조 대응",
    ],
    highlights: [
      "JWT 세션 역할 기반 사용자·파트너·운영자 라우트 그룹 접근 제어",
      "소셜·이메일·토큰 로그인을 동일 세션 규격으로 통합",
      "폴링 차등 갱신 상담 채팅 — 변경 감지 시에만 전체 갱신으로 요청량 절감",
      "파트너 견적 요청 탐색·제안 전송·프로필(면허·키워드·지역) 관리 구현",
      "운영자 CMS(문의·FAQ·공지·카테고리)·사용자 관리 백오피스 구현",
      "Next.js 미들웨어 취약점·프록시 호스트 인식·리다이렉트·SEO 대응",
    ],
  },

  // ── 13. SI Harness — AI 협업 SI 워크플로우 자동화 환경 ────────────────────
  {
    slug: "si-harness",
    title: "SI Harness — AI 협업 SI 워크플로우 자동화 환경",
    category: "백오피스·자동화",
    cardCategory: "AI · Tooling",
    angle: "AI 워크플로우 자동화",
    featured: false,
    period: "2026.05 – 진행",
    role: "개인 프로젝트 · Claude Code harness 설계·구현",
    tech: ["Claude Code", "Skill / Agent", "Hooks", "TypeScript", "JSON"],
    headline:
      "SI 프로젝트의 제안~인수 전 과정을 AI가 같은 순서로 따라오도록 command·skill·agent·status 파일로 고정한 Claude Code harness",
    keyResult:
      "반복되는 SI 작업 기준을 프롬프트가 아니라 저장소에 고정 · 세션이 끊겨도 phase·gate를 status.json으로 복원",
    tags: ["AI Harness", "워크플로우 자동화", "Claude Code", "상태 파일"],
    summary:
      "SI 프로젝트를 AI와 진행할 때 매번 작업 순서·제약을 다시 설명하던 문제를, 제안·착수·설계·구현·배포·인수 단계를 command와 skill로 나누고 역할별 agent에 위임하며 진행 상태를 status.json에 남기는 harness로 풀었습니다.",
    overview:
      "화면을 만드는 프로젝트가 아니라, 화면을 만드는 과정을 AI가 따라올 수 있게 만든 작업 환경입니다. Claude Code용 command·skill·agent·hook·status 파일을 묶어, SI 프로젝트에서 반복되는 흐름을 저장소에 고정했습니다.",
    scope: [
      "제안~인수 6단계 파이프라인(/si-proposal → kickoff → design → dev → deploy → handoff)",
      "횡단 흐름(/si-cr 변경 요청, /si-hotfix 긴급 수정, /si-status 상태 조회)",
      "역할별 agent(architect·entity-dev·ui-dev·test-eng·reviewer·devops) 위임 구조",
      "Global Layer / Project Layer 분리 및 프로젝트 템플릿(.claude·.si)",
      "세션 시작·컨텍스트 압축 전 상태 보존 hook",
    ],
    problem:
      "SI 프로젝트를 AI와 진행하면 '지금은 요구사항 단계다', 'API 확정 전이다', '화면보다 엔티티 먼저다' 같은 작업 기준을 매번 프롬프트에 다시 써야 했고, 대화가 길어져 컨텍스트가 압축되면 합의했던 순서가 대화 안에서만 흩어져 사라졌습니다.",
    decision:
      "AI에게 '알아서'를 맡기는 대신 반복 흐름을 command·skill로 고정하고, 구현은 역할별 agent에 위임했으며, 진행 상태를 대화가 아니라 status.json 파일에 남겼습니다.",
    decisions: [
      {
        heading: "작업 순서를 command·skill로 고정했습니다",
        body: "제안·착수·설계·구현·배포·인수를 각각 command 또는 skill로 나누고, SI 특성상 상시 발생하는 변경 요청·긴급 수정·상태 조회를 횡단 흐름으로 따로 뒀습니다. 예외를 '수정해줘' 한마디로 뭉뚱그리지 않도록 흐름을 명시했습니다.",
      },
      {
        heading: "구현은 역할별 agent에 위임했습니다",
        body: "'주문 목록 만들어줘'처럼 타입·API·UI·검증을 한 번에 섞지 않고, 데이터 레이어(entity-dev)와 화면 레이어(ui-dev)를 나누고 검증(test-eng·reviewer)을 분리해, 문제가 났을 때 원인을 레이어 단위로 추적할 수 있게 했습니다.",
      },
      {
        heading: "진행 상태를 status.json에 남겼습니다",
        body: "현재 phase·phase 이력·변경 요청·gate 통과 여부를 파일로 관리하고, 세션 시작·컨텍스트 압축 전 hook으로 현재 상태를 출력해, 세션이 바뀌거나 컨텍스트가 끊겨도 다시 이어갈 기준을 만들었습니다.",
      },
      {
        heading: "설계 단계에서 API를 상상하지 않게 했습니다",
        body: "Swagger·백엔드 문서가 있으면 그것을 기준으로 정리하고, 없으면 '없음'으로 표시해 백엔드 요청 사항으로 남겼습니다. AI가 그럴듯한 경로를 지어내 실제 스펙과 어긋나는 코드를 만드는 것을 막았습니다.",
      },
    ],
    result:
      "SI 작업 기준을 저장소에 남겨, 매번 다시 설명하지 않아도 AI가 같은 흐름으로 움직이는 작업 환경을 만들었습니다. 진행 중인 프로젝트로, 일부 단계 구성과 status.json 스키마는 계속 정리하고 있습니다.",
    results: [
      "제안~인수 6단계 + 횡단 3흐름을 command·skill로 고정",
      "구현을 데이터/화면/검증 역할별 agent로 분리해 원인 추적성 확보",
      "status.json + hook으로 세션·컨텍스트가 끊겨도 진행 상태 복원",
      "Global/Project 레이어 분리로 새 SI 프로젝트 작업 환경을 빠르게 심기",
    ],
    highlights: [
      "SI 라이프사이클을 command·skill 파이프라인으로 구조화(제안·착수·설계·구현·배포·인수)",
      "변경 요청·긴급 수정·상태 조회를 횡단 흐름으로 분리(/si-cr·/si-hotfix·/si-status)",
      "역할별 agent 위임 구조로 구현·검증 책임 분리",
      "status.json 단일 상태 원천 + 세션/압축 hook으로 상태 보존",
      "설계 단계에서 API를 상상하지 않고 확인·미확인을 명시하는 원칙",
    ],
    relatedPosts: [
      { title: "SI 전용 AI Harness 만들기", href: DEVLOG_URL },
      { title: "SI 프로젝트용 Start-Kit CLI 만들기", href: DEVLOG_URL },
    ],
  },

  // ── 14. 제안서 템플릿·발행 시스템 — 원문→웹 제안서 발행 풀스택 ────────────
  {
    slug: "proposal-template",
    title: "제안서 템플릿·발행 시스템 — 원문→웹 제안서 발행 풀스택",
    category: "백오피스·자동화",
    cardCategory: "Tooling",
    angle: "제안서 웹 발행",
    featured: false,
    period: "진행",
    role: "사내 영업 도구 · 풀스택 설계·구현",
    tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "OpenAI"],
    headline:
      "제안서 원문을 12개 섹션으로 구조화해 공개 링크·PDF로 발행하고, 관리 앱과 SSR 렌더러를 분리해 포트폴리오 기반 제안서 생성 워크플로우를 제품화",
    keyResult:
      "제안서 원문을 공개 URL(`/p/[slug]`)·PDF 산출물로 전환하고, 관리 앱과 공개 렌더러를 공유 DTO로 느슨하게 연결한 풀스택 프로토타입 구축",
    tags: ["제안서 발행", "데이터 × 렌더러", "SSR 뷰어", "Prisma"],
    summary:
      "제안서 원본을 구조화해 공개 제안서 페이지와 포트폴리오 상세 페이지로 발행하는 Next.js 풀스택 프로토타입입니다. 생성·편집·발행 관리 앱(`proposal-template`)과 SSR 공개 뷰어(`proposal-for-client`)를 분리하고, 제안서를 데이터(내용) × 렌더러(디자인)로 나눠 템플릿화했습니다.",
    overview:
      "제안서 원본을 구조화해 공개 제안서 페이지와 포트폴리오 상세 페이지로 발행하는 Next.js 기반 풀스택 프로토타입입니다. `proposal-template`은 생성·편집·발행 관리 앱, `proposal-for-client`는 발행된 제안서·포트폴리오를 SSR로 렌더링하는 공개 뷰어로 분리되어 있습니다.",
    scope: [
      "제안서 입력 데이터를 섹션 구조로 정규화하고, 공개 URL·포트폴리오 상세 URL로 외부 전달 가능한 산출물로 전환",
      "Next.js Route Handler API와 Prisma/Postgres 계층을 설계해 관리 기능을 별도 서버 없이 통합",
      "공개 렌더러에서 제안서 본문·포트폴리오 상세·인쇄/PDF 흐름을 분리해 읽기·공유·출력 목적에 맞는 화면 구성",
      "민감정보 제거 정책·샘플 데이터 익명화·스캔 스크립트 등 공개 가능성 검토 기준 정리",
    ],
    problem:
      "영업 제안서를 PDF/PPT로 만들면 모바일 가독성이 떨어지고, 수정할 때마다 파일을 다시 공유해야 하며, 포트폴리오 상세로 연결하기 어려웠습니다. 관리 앱과 공개 뷰어가 같은 데이터 모델을 공유하지 않으면 발행 결과가 어긋날 위험도 있었습니다.",
    decision:
      "PDF 대신 웹 링크 발행을 택하고, 제안서를 데이터 × 렌더러로 분리했으며, AI는 섹션 구조화·문장 정리로 한정하고 rule-based fallback을 뒀습니다.",
    decisions: [
      {
        heading: "PDF/PPT 대신 웹 링크 발행을 선택했습니다",
        body: "산출물을 파일이 아니라 공개 URL(`/p/[slug]`)로 발행해 모바일 가독성, 수정 후 재공유, 포트폴리오 상세 연결 문제를 함께 풀었습니다. 인쇄/PDF 흐름은 별도로 두어 출력이 필요할 때만 쓰도록 분리했습니다.",
      },
      {
        heading: "제안서를 데이터 × 렌더러로 분리했습니다",
        body: "greeting·about·team·analysis·strategy·estimate·portfolio·architecture·qa·timeline·warranty·promise 12개 섹션을 `ProposalSectionsData` 공유 계약으로 관리하고, slug·projectInfo·raw content·sections·portfolioSlugs·published 상태로 제안서 데이터 모델을 잡아 관리 앱과 공개 렌더러를 느슨하게 연결했습니다.",
      },
      {
        heading: "AI는 구조화·문장 정리로 한정하고 fallback을 뒀습니다",
        body: "AI가 내용을 새로 꾸며내지 않도록 섹션 구조화와 가벼운 문장 정리에만 썼고, API 키 없음·빈 입력·refusal·예외 상황에서는 rule-based fallback으로 동작하도록 설계해 외부 API 상태와 무관하게 발행이 멈추지 않게 했습니다.",
      },
    ],
    result:
      "제안서 원문을 구조화해 공개 링크·PDF로 발행하는 Next.js 풀스택 프로토타입을 설계·구현하고, 관리 앱과 SSR 렌더러를 공유 DTO로 분리해 포트폴리오 기반 제안서 생성 워크플로우를 제품화했습니다.",
    results: [
      "제안서 원문을 공개 URL·PDF 산출물로 전환",
      "12개 섹션 공유 계약으로 관리 앱·공개 렌더러를 느슨하게 연결",
      "AI 구조화 + rule-based fallback으로 외부 API 상태와 무관하게 발행 지속",
      "민감정보 제거·샘플 익명화 등 공개 가능성 검토 기준 정리",
    ],
    highlights: [
      "관리 앱(`proposal-template`)과 SSR 공개 뷰어(`proposal-for-client`) 분리",
      "`packages/shared` 제안서 DTO로 관리·렌더링 앱 간 데이터 계약 통일",
      "`serverFetch`·내부 토큰·샘플 데이터 폴백으로 백엔드 준비 전에도 독립 실행",
      "Mermaid·마크다운 렌더링·PDF 다운로드 흐름을 포함해 실제 영업 산출물화",
      "AI 섹션 구조화 + deterministic fallback으로 입력 품질·API 상태에 견고",
    ],
    relatedPosts: [
      { title: "제안서 페이지 템플릿 개발 노트", href: DEVLOG_URL },
      { title: "[영업] 제안서 페이지 템플릿 초안 개발", href: DEVLOG_URL },
    ],
  },

  // ── 15. AI 제안서 자동화 시스템 — 공고 수집→RAG 제안서 초안 ───────────────
  {
    slug: "proposal-automation",
    title: "AI 제안서 자동화 시스템 — 공고 수집→RAG 제안서 초안",
    category: "백오피스·자동화",
    cardCategory: "AI · Automation",
    angle: "RAG 영업 자동화",
    featured: false,
    period: "프로토타입",
    role: "사내 업무 자동화 · 파이프라인 설계·구현",
    tech: ["Next.js", "React", "TypeScript", "OpenAI", "Supabase", "pgvector", "Playwright"],
    headline:
      "외주 공고 수집부터 RAG 기반 포트폴리오 추천·AI 제안서 초안 생성까지 이어지는 Next.js 자동화 파이프라인을 구축",
    keyResult:
      "위시켓·프리모아 공고 수집 → 유사 사례 RAG 검색 → GPT 제안서 초안 생성까지 스크래핑·pgvector·Notion·Slack 연동으로 자동화",
    tags: ["RAG", "pgvector", "스크래핑 자동화", "OpenAI"],
    summary:
      "외주 플랫폼 신규 공고를 수집하고, 상세 본문을 바탕으로 유사 포트폴리오 사례를 검색해 AI 제안서 초안을 생성하는 업무 자동화 프로토타입입니다. 단순 데모가 아니라 스크래핑·세션 보존·RAG·Notion 동기화·Slack 알림·운영 문서까지 포함한 실제 파이프라인으로 구성했습니다.",
    overview:
      "외주 플랫폼의 신규 공고를 수집하고, 상세 본문을 바탕으로 AI 제안서 초안을 생성하는 업무 자동화 프로토타입입니다. Project·Portfolio·Prompt를 핵심 엔티티로 나누고, 프로젝트 상태를 발견·검토·지원·미팅·계약 단계로 관리합니다.",
    scope: [
      "위시켓·프리모아 공고 목록·상세 본문을 수집하는 Playwright 스크래퍼와 브라우저 세션 복원 구성",
      "Supabase PostgreSQL·Storage·pgvector RPC로 프로젝트·제안서·임베딩 데이터 관리",
      "Notion 문서를 임베딩해 기존 제안서·포트폴리오 사례를 RAG 컨텍스트로 검색하는 흐름 설계",
      "GPT 기반 제안서 생성·재생성·편집·상태 관리 API를 Next.js Route Handler로 구현",
      "Vercel Cron·Slack 알림·세션 만료 대응·운영 문서까지 자동화 운영 관점으로 정리",
    ],
    problem:
      "외주 공고를 사람이 매번 확인하고, 관련 포트폴리오를 찾아 제안서 초안을 쓰는 과정이 반복 노동이었습니다. AI에 공고만 던지면 회사 실제 사례와 동떨어진 초안이 나와, 유사 사례를 검색해 컨텍스트로 넣는 구조가 필요했습니다.",
    decision:
      "공고 수집을 Playwright로 자동화하고, 포트폴리오를 벡터 검색 대상으로 둔 RAG로 유사 사례를 붙였으며, 프롬프트를 코드와 분리해 운영에서 조정하도록 했습니다.",
    decisions: [
      {
        heading: "포트폴리오를 RAG 검색 대상으로 뒀습니다",
        body: "포트폴리오 문서를 Vector Store/file_search 검색 대상으로 두고, 신규 프로젝트 본문을 검색 쿼리이자 생성 컨텍스트로 사용했습니다. 공고 → 관련 포트폴리오 검색 → 제안서 초안 생성으로 이어지는 업무 흐름을 파이프라인으로 고정했습니다.",
      },
      {
        heading: "포트폴리오 카테고리를 고정해 검색 품질을 높였습니다",
        body: "카테고리를 AI·중개플랫폼·커머스·홈페이지·앱·ERP/CRM·LMS 등으로 고정해, 검색 품질과 프롬프트 일관성을 확보했습니다. 자유 태깅 대신 정해진 축으로 사례를 정리했습니다.",
      },
      {
        heading: "프롬프트 관리를 별도 도메인으로 분리했습니다",
        body: "제안서 생성 로직을 코드 수정 없이 조정할 수 있도록 프롬프트 관리 API를 별도 도메인으로 뒀습니다. 생성 품질을 운영 단계에서 튜닝할 수 있는 구조를 고려했습니다.",
      },
    ],
    result:
      "외주 공고 수집부터 RAG 기반 AI 제안서 생성까지 이어지는 Next.js 자동화 파이프라인을 구현하고, Supabase pgvector·OpenAI·Playwright·Notion·Slack 연동으로 실제 영업 업무에 적용 가능한 프로토타입을 구축했습니다.",
    results: [
      "공고 수집 → 유사 사례 검색 → 제안서 초안 생성 파이프라인 동작",
      "Supabase pgvector `match_proposals` RPC로 유사도 검색 구성",
      "Project·Portfolio·Prompt 엔티티와 프로젝트 상태 파이프라인 설계",
      "Vercel Cron·Slack 알림·세션 복원까지 운영 관점 자동화",
    ],
    highlights: [
      "위시켓·프리모아 Playwright 스크래퍼 + 브라우저 세션 복원",
      "Supabase PostgreSQL·Storage·pgvector RPC로 임베딩·유사도 검색",
      "Notion 문서 임베딩 기반 포트폴리오 RAG 컨텍스트 검색",
      "GPT 제안서 생성·재생성·편집·상태 관리 API(Next.js Route Handler)",
      "포트폴리오 카테고리 고정·프롬프트 관리 도메인 분리로 검색·생성 일관성 확보",
    ],
    relatedPosts: [
      { title: "제안서 RAG 시스템 설계", href: DEVLOG_URL },
      { title: "OpenAI Vector Store 효율성과 RAG 설계 판단 기준", href: DEVLOG_URL },
    ],
  },
];

export const portfolioIntro =
  "이력서에는 성과와 핵심 의사결정만 간추렸습니다. 상세 포트폴리오에서는 운영 서비스에서 마주한 문제와 기술적 판단, 구현 과정과 결과를 프로젝트 단위로 풀어 정리했습니다.";
