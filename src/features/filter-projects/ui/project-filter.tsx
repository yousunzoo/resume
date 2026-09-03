"use client";

import Link from "next/link";
import { ArrowUpRightIcon, Text, TechTag } from "@/shared/ui";
import {
  CategoryTag,
  type Project,
  type ProjectCategory,
} from "@/entities/project";
import { useProjectFilter } from "../model/use-project-filter";

interface ProjectFilterProps {
  projects: Project[];
  categories: ProjectCategory[];
}

/**
 * 카테고리 필터 바 + Notion 스타일 데이터베이스 테이블 + 빈 상태 + sr-only
 * 라이브 리전. 상태/파생은 `useProjectFilter` 훅에 위임하고, 이 컴포넌트는
 * 렌더링만 담당한다. 타이포그래피는 shared/ui role 토큰으로 소비한다.
 */
export function ProjectFilter({ projects, categories }: ProjectFilterProps) {
  const { active, setActive, filters, visible, counts } = useProjectFilter(
    projects,
    categories
  );

  return (
    <div>
      {/* Filter bar — monochrome toggles: active = filled ink, rest = hairline */}
      <div
        className="no-print mb-6 flex flex-wrap gap-2"
        role="group"
        aria-label="프로젝트 카테고리 필터"
      >
        {filters.map((f) => {
          const isActive = f === active;
          const count = counts[f];

          return (
            <button
              key={f}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(f)}
              className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-body-sm font-medium transition-[color,background-color,border-color] duration-200 active:scale-[0.97] ${
                isActive
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-paper text-ink-muted hover:border-ink hover:text-ink"
              }`}
            >
              {f}
              <Text
                as="span"
                variant="eyebrow"
                weight="semibold"
                tnum
                className={`tracking-normal ${
                  isActive ? "text-white/70" : "text-ink-faint"
                }`}
              >
                {count}
              </Text>
            </button>
          );
        })}
      </div>

      {/* Notion-style database table */}
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <caption className="sr-only">프로젝트 목록 테이블</caption>
          <thead>
            <tr className="border-b border-line bg-paper-2">
              <Th className="w-[46%] pl-4">프로젝트</Th>
              <Th className="w-[18%]">카테고리</Th>
              <Th className="w-[16%]">기간</Th>
              <Th className="w-[20%]">기술</Th>
              <th className="w-10 py-2.5" aria-label="열기" />
            </tr>
          </thead>

          <tbody>
            {visible.map((p) => (
              <TableRow key={p.slug} project={p} />
            ))}
          </tbody>
        </table>
      </div>

      {visible.length === 0 && (
        <div
          role="status"
          className="mt-4 rounded-xl border border-dashed border-line-strong bg-paper-2 py-16 text-center"
        >
          <Text variant="body-sm" weight="medium" className="text-ink-muted">
            해당 카테고리의 프로젝트가 없습니다.
          </Text>
          <button
            type="button"
            onClick={() => setActive("전체")}
            className="mt-3 text-body-sm font-semibold text-ink underline underline-offset-4"
          >
            전체 프로젝트 보기
          </button>
        </div>
      )}

      {/* Screen-reader live count of filtered results */}
      <Text as="p" className="sr-only" role="status" aria-live="polite">
        {active} 카테고리 · 프로젝트 {visible.length}개
      </Text>
    </div>
  );
}

/* ─── Column header cell ──────────────────────────────────────────────────── */
function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Text
      as="th"
      scope="col"
      variant="eyebrow"
      weight="semibold"
      className={`px-3 py-2.5 uppercase tracking-[0.08em] text-ink-faint ${className}`}
    >
      {children}
    </Text>
  );
}

/* ─── Data row = one project ──────────────────────────────────────────────── */
function TableRow({ project: p }: { project: Project }) {
  return (
    <tr className="group relative border-b border-line last:border-b-0 transition-colors duration-150 hover:bg-paper-2 focus-within:bg-paper-2">
      {/* Project — title + headline, carries the stretched navigation link.
          The row is `relative`, so the link's ::after (inset-0) covers the
          whole row and makes every cell clickable while focus stays on a
          real anchor. */}
      <td className="py-3 pl-4 pr-3 align-top">
        <div className="flex items-start gap-2">
          {p.featured && (
            <Text
              as="span"
              variant="caption"
              aria-hidden
              className="mt-[3px] shrink-0 leading-none text-ink"
              title="대표 프로젝트"
            >
              ★
            </Text>
          )}
          <span className="min-w-0">
            <Link
              href={`/portfolio/${p.slug}`}
              className="text-body-sm font-semibold text-ink underline-offset-4 outline-none after:absolute after:inset-0 after:content-[''] group-hover:underline"
            >
              {p.title}
              {p.featured && <span className="sr-only"> (대표 프로젝트)</span>}
            </Link>
            <Text
              as="span"
              variant="caption"
              weight="normal"
              className="mt-0.5 line-clamp-1 text-ink-muted"
            >
              {p.headline}
            </Text>
          </span>
        </div>
      </td>

      {/* Category — Notion default select tag (monochrome) */}
      <td className="px-3 py-3 align-top">
        <CategoryTag category={p.category} />
      </td>

      {/* Period */}
      <td className="px-3 py-3 align-top">
        <Text
          as="span"
          variant="caption"
          weight="normal"
          tnum
          className="text-ink-muted"
        >
          {p.period}
        </Text>
      </td>

      {/* Tech — 2 chips + overflow count */}
      <td className="px-3 py-3 align-top">
        <span className="flex flex-wrap gap-1">
          {p.tech.slice(0, 2).map((t) => (
            <TechTag key={t} variant="outline" size="xs" className="rounded">
              {t}
            </TechTag>
          ))}
          {p.tech.length > 2 && (
            <Text
              as="span"
              variant="eyebrow"
              weight="medium"
              className="px-1 py-0.5 tracking-normal text-ink-faint"
            >
              +{p.tech.length - 2}
            </Text>
          )}
        </span>
      </td>

      {/* Open affordance */}
      <td className="py-3 pr-3 align-top">
        <ArrowUpRightIcon
          width={15}
          height={15}
          className="text-ink-faint transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
        />
      </td>
    </tr>
  );
}
