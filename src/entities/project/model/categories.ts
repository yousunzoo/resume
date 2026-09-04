import type { ProjectCategory } from "./types";

// 카테고리 목록 (포트폴리오 필터용) — 클라이언트 안전 상수.
// selectors(server-only 의존)와 분리해 클라이언트 번들 오염을 막는다.
export const projectCategories: ProjectCategory[] = [
  "금융 서비스",
  "플랫폼",
  "모바일 앱",
  "백오피스·자동화",
];
