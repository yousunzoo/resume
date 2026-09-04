import type { ProjectCategory } from "./types";

// 카테고리 목록 (포트폴리오 필터용) — 클라이언트 안전 상수.
// selectors(server-only 의존)와 분리해 클라이언트 번들 오염을 막는다.
export const projectCategories: ProjectCategory[] = [
  "클라이언트 SI",
  "자체 도구·인프라",
  "개인·학습",
];
