"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/entities/project";

/** 필터 상태 유니온 — "전체" 또는 특정 카테고리. */
export type Filter = "전체" | ProjectCategory;

export interface UseProjectFilterResult {
  /** 현재 선택된 필터. */
  active: Filter;
  setActive: (filter: Filter) => void;
  /** 필터 바에 렌더할 순서 — ["전체", ...categories]. */
  filters: Filter[];
  /** 현재 필터가 적용된, 정렬된 프로젝트 목록. */
  visible: Project[];
  /** 필터별 프로젝트 개수 (배지용). */
  counts: Record<Filter, number>;
}

/**
 * 포트폴리오 테이블의 상태 + 파생 로직.
 *
 * 정렬 규칙: `featured` 프로젝트가 최상단으로 뜨고, 그 외에는 원본 순서를
 * 보존한다(안정 정렬). 이후 `active` 필터로 좁힌다. 모든 파생값은 memo 로
 * 캐시한다.
 */
export function useProjectFilter(
  projects: Project[],
  categories: ProjectCategory[]
): UseProjectFilterResult {
  const [active, setActive] = useState<Filter>("전체");

  const filters = useMemo<Filter[]>(() => ["전체", ...categories], [categories]);

  // Featured projects float to the top; original order is otherwise preserved.
  const ordered = useMemo(
    () =>
      [...projects]
        .map((p, i) => ({ p, i }))
        .sort((a, b) => {
          if (a.p.featured !== b.p.featured) return a.p.featured ? -1 : 1;
          return a.i - b.i;
        })
        .map(({ p }) => p),
    [projects]
  );

  const visible = useMemo(
    () =>
      active === "전체" ? ordered : ordered.filter((p) => p.category === active),
    [active, ordered]
  );

  const counts = useMemo(() => {
    const map = { 전체: projects.length } as Record<Filter, number>;
    for (const c of categories) {
      map[c] = projects.filter((p) => p.category === c).length;
    }
    return map;
  }, [projects, categories]);

  return { active, setActive, filters, visible, counts };
}
