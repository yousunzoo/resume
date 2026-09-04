// ────────────────────────────────────────────────────────────────────────────
// project 엔티티 — 파생 셀렉터 (Notion 원본 기반, async)
// ────────────────────────────────────────────────────────────────────────────

import type { Project, ProjectCategory, ProjectDetail } from "./types";
import { fetchProjects } from "../api/fetch-projects";
import { fetchProjectDetail } from "../api/fetch-project-detail";

export async function getProjects(): Promise<Project[]> {
  return fetchProjects();
}

// 대표 프로젝트(Featured) — Notion Order 오름차순 정렬
export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await fetchProjects();
  return all
    .filter((p) => p.featured)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export async function getProjectDetail(slug: string): Promise<ProjectDetail | null> {
  return fetchProjectDetail(slug);
}

// 카테고리 목록 (포트폴리오 필터용) — 정적 상수 유지
export const projectCategories: ProjectCategory[] = [
  "금융 서비스",
  "플랫폼",
  "모바일 앱",
  "백오피스·자동화",
];
