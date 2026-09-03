import Link from "next/link";
import type { Project } from "@/data/resume";
import { ArrowUpRightIcon } from "@/components/icons";
import { getCategoryMeta } from "@/components/category";

/**
 * Monochrome project card. No color, no gradients — hierarchy comes from
 * type weight, a leading index number, and hairline rules. The category is
 * shown as a plain uppercase text label. `featured` cards go wider and
 * horizontal on larger viewports to break the uniform 2-up rhythm.
 */
export function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const meta = getCategoryMeta(project.category);
  const num = String(index).padStart(2, "0");

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      aria-label={`${project.title} 상세 보기`}
      className={`group relative flex h-full flex-col rounded-xl border border-line bg-paper p-6 shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[var(--shadow-md)] focus-visible:-translate-y-1 ${
        featured ? "sm:flex-row sm:gap-8 sm:p-7" : ""
      }`}
    >
      {/* ── Index + meta rail ─────────────────────────────────────── */}
      <div
        className={`flex items-start justify-between gap-3 ${
          featured ? "sm:w-[30%] sm:flex-col sm:justify-start sm:gap-4" : "mb-4"
        }`}
      >
        <div>
          <span className="tnum block text-[2rem] font-bold leading-none tracking-tight text-ink/85">
            {num}
          </span>
          <span className="mt-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
            {project.cardCategory ?? meta.label}
          </span>
          {featured && (
            <span className="mt-3 hidden w-fit border border-ink px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.18em] text-ink sm:inline-block">
              Featured
            </span>
          )}
        </div>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-ink-faint transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white sm:group-hover:translate-x-0">
          <ArrowUpRightIcon
            width={16}
            height={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>

      {/* ── Body ──────────────────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {featured && (
          <span className="mb-2 inline-block w-fit text-[9.5px] font-bold uppercase tracking-[0.18em] text-ink sm:hidden">
            Featured
          </span>
        )}

        <p className="tnum mb-2 text-[11px] font-medium text-ink-faint">
          {project.angle ?? project.category} · {project.period}
        </p>

        <h3
          className={`font-bold leading-snug text-ink ${
            featured ? "text-[1.2rem]" : "text-[1.05rem]"
          }`}
        >
          {project.title}
        </h3>

        <p
          className={`mt-2.5 text-[13.5px] leading-relaxed text-ink-muted ${
            featured ? "line-clamp-3" : "line-clamp-2"
          }`}
        >
          {project.headline}
        </p>

        {/* Key result — the primary scan hook (monochrome, rule-led) */}
        <div className="mt-4 border-t border-line pt-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-faint">
            Key Result
          </p>
          <p className="mt-1 text-[12.5px] font-semibold leading-snug text-ink">
            {project.keyResult}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-x-2.5 gap-y-1 pt-4">
          {project.tech.slice(0, featured ? 6 : 4).map((t) => (
            <span key={t} className="text-[11px] font-medium text-ink-muted">
              {t}
            </span>
          ))}
          {project.tech.length > (featured ? 6 : 4) && (
            <span className="text-[11px] font-medium text-ink-faint">
              +{project.tech.length - (featured ? 6 : 4)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
