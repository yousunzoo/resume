// ────────────────────────────────────────────────────────────────────────────
// project 엔티티 — 도메인 타입 정의
// 프로젝트 상세는 Notion "Selected Portfolio" 데이터베이스 기반입니다.
// ────────────────────────────────────────────────────────────────────────────

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
