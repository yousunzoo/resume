// ────────────────────────────────────────────────────────────────────────────
// project 엔티티 — 파생 셀렉터 (조회·필터·정렬)
// ────────────────────────────────────────────────────────────────────────────

import type { Project, ProjectCategory } from "./types";
import { projects } from "./projects";

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
