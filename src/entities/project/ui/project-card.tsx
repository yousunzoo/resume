import Link from "next/link";
import { ArrowUpRightIcon, Badge, Text } from "@/shared/ui";
import type { Project } from "../model/types";
import { getCategoryMeta } from "../lib/category-meta";

/**
 * Monochrome project card. No color, no gradients — hierarchy comes from
 * type weight, a leading index number, and hairline rules. The category is
 * shown as a plain uppercase text label. `featured` cards go wider and
 * horizontal on larger viewports to break the uniform 2-up rhythm.
 *
 * Typography is consumed through shared/ui role tokens (Text / Badge), not
 * hardcoded px/rem sizes.
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
          <Text
            as="span"
            variant="title-1"
            weight="bold"
            tnum
            className="block leading-none text-ink/85"
          >
            {num}
          </Text>
          <Text
            as="span"
            variant="overline"
            weight="semibold"
            className="mt-2 block uppercase text-ink-faint"
          >
            {project.cardCategory ?? meta.label}
          </Text>
          {featured && (
            <Badge className="mt-3 hidden w-fit tracking-[0.18em] sm:inline-block">
              Featured
            </Badge>
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
          <Badge className="mb-2 w-fit border-0 px-0 py-0 tracking-[0.18em] sm:hidden">
            Featured
          </Badge>
        )}

        <Text
          as="p"
          variant="caption"
          weight="medium"
          tnum
          className="mb-2 text-ink-faint"
        >
          {project.angle ?? project.category} · {project.period}
        </Text>

        <Text
          as="h3"
          variant={featured ? "title-3" : "heading"}
          weight="bold"
          className="leading-snug text-ink"
        >
          {project.title}
        </Text>

        <Text
          as="p"
          variant="body-sm"
          className={`mt-2.5 leading-relaxed text-ink-muted ${
            featured ? "line-clamp-3" : "line-clamp-2"
          }`}
        >
          {project.headline}
        </Text>

        {/* Key result — the primary scan hook (monochrome, rule-led) */}
        <div className="mt-4 border-t border-line pt-3">
          <Text
            as="p"
            variant="overline"
            weight="bold"
            className="uppercase tracking-[0.14em] text-ink-faint"
          >
            Key Result
          </Text>
          <Text
            as="p"
            variant="caption"
            weight="semibold"
            className="mt-1 leading-snug text-ink"
          >
            {project.keyResult}
          </Text>
        </div>

        <div className="mt-auto flex flex-wrap gap-x-2.5 gap-y-1 pt-4">
          {project.tech.slice(0, featured ? 6 : 4).map((t) => (
            <Text
              key={t}
              as="span"
              variant="caption"
              weight="medium"
              className="text-ink-muted"
            >
              {t}
            </Text>
          ))}
          {project.tech.length > (featured ? 6 : 4) && (
            <Text as="span" variant="caption" weight="medium" className="text-ink-faint">
              +{project.tech.length - (featured ? 6 : 4)}
            </Text>
          )}
        </div>
      </div>
    </Link>
  );
}
