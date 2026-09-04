import "server-only";
import type { Project } from "../model/types";
import { notion, resolveDataSourceId, notionEnabled } from "./notion-client";
import { mapPropsToProject } from "./map";
import { fallbackProjects } from "../model/fallback-projects";

// 카드/목록용 — DB 속성만 가볍게 조회한다. env 미설정·실패 시 정적 폴백.
export async function fetchProjects(): Promise<Project[]> {
  if (!notionEnabled()) return fallbackProjects;
  try {
    const res = await notion().dataSources.query({
      data_source_id: await resolveDataSourceId(),
    });
    const projects = res.results
      .map((page) => mapPropsToProject(page as never))
      .filter((p) => p.slug);
    return projects.length > 0 ? projects : fallbackProjects;
  } catch (err) {
    console.warn("[notion] fetchProjects 실패 — 폴백 사용", err);
    return fallbackProjects;
  }
}
