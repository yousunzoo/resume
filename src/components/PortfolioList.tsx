"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Project, ProjectCategory } from "@/data/resume";
import { getCategoryMeta } from "@/components/category";
import { ArrowUpRightIcon } from "@/components/icons";

type Filter = "전체" | ProjectCategory;

export function PortfolioList({
  projects,
  categories,
}: {
  projects: Project[];
  categories: ProjectCategory[];
}) {
  const [active, setActive] = useState<Filter>("전체");
  const filters: Filter[] = useMemo(() => ["전체", ...categories], [categories]);

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
      active === "전체"
        ? ordered
        : ordered.filter((p) => p.category === active),
    [active, ordered]
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
          const count =
            f === "전체"
              ? projects.length
              : projects.filter((p) => p.category === f).length;

          return (
            <button
              key={f}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(f)}
              className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-[color,background-color,border-color] duration-200 active:scale-[0.97] ${
                isActive
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-paper text-ink-muted hover:border-ink hover:text-ink"
              }`}
            >
              {f}
              <span
                className={`tnum text-[11px] font-semibold ${
                  isActive ? "text-white/70" : "text-ink-faint"
                }`}
              >
                {count}
              </span>
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
          <p className="text-[14px] font-medium text-ink-muted">
            해당 카테고리의 프로젝트가 없습니다.
          </p>
          <button
            type="button"
            onClick={() => setActive("전체")}
            className="mt-3 text-[13px] font-semibold text-ink underline underline-offset-4"
          >
            전체 프로젝트 보기
          </button>
        </div>
      )}

      {/* Screen-reader live count of filtered results */}
      <p className="sr-only" role="status" aria-live="polite">
        {active} 카테고리 · 프로젝트 {visible.length}개
      </p>
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
    <th
      scope="col"
      className={`px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-faint ${className}`}
    >
      {children}
    </th>
  );
}

/* ─── Data row = one project ──────────────────────────────────────────────── */
function TableRow({ project: p }: { project: Project }) {
  const meta = getCategoryMeta(p.category);

  return (
    <tr className="group relative border-b border-line last:border-b-0 transition-colors duration-150 hover:bg-paper-2 focus-within:bg-paper-2">
      {/* Project — title + headline, carries the stretched navigation link.
          The row is `relative`, so the link's ::after (inset-0) covers the
          whole row and makes every cell clickable while focus stays on a
          real anchor. */}
      <td className="py-3 pl-4 pr-3 align-top">
        <div className="flex items-start gap-2">
          {p.featured && (
            <span
              aria-hidden
              className="mt-[3px] shrink-0 text-[12px] leading-none text-ink"
              title="대표 프로젝트"
            >
              ★
            </span>
          )}
          <span className="min-w-0">
            <Link
              href={`/portfolio/${p.slug}`}
              className="text-[14px] font-semibold text-ink underline-offset-4 outline-none after:absolute after:inset-0 after:content-[''] group-hover:underline"
            >
              {p.title}
              {p.featured && <span className="sr-only"> (대표 프로젝트)</span>}
            </Link>
            <span className="mt-0.5 line-clamp-1 text-[12.5px] text-ink-muted">
              {p.headline}
            </span>
          </span>
        </div>
      </td>

      {/* Category — Notion default select tag (monochrome) */}
      <td className="px-3 py-3 align-top">
        <span className="inline-flex max-w-full items-center gap-1 truncate rounded-md bg-paper-3 px-2 py-0.5 text-[12px] font-medium text-ink-body">
          <meta.Icon width={12} height={12} className="shrink-0 text-ink-faint" />
          {p.category}
        </span>
      </td>

      {/* Period */}
      <td className="tnum px-3 py-3 align-top text-[12.5px] text-ink-muted">
        {p.period}
      </td>

      {/* Tech — 2 chips + overflow count */}
      <td className="px-3 py-3 align-top">
        <span className="flex flex-wrap gap-1">
          {p.tech.slice(0, 2).map((t) => (
            <span
              key={t}
              className="rounded border border-line bg-paper px-1.5 py-0.5 text-[11px] font-medium text-ink-muted"
            >
              {t}
            </span>
          ))}
          {p.tech.length > 2 && (
            <span className="px-1 py-0.5 text-[11px] font-medium text-ink-faint">
              +{p.tech.length - 2}
            </span>
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
