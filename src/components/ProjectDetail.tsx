import Link from "next/link";
import type { Project } from "@/data/resume";
import { Reveal } from "@/components/Reveal";
import { getCategoryMeta } from "@/components/category";
import {
  ArrowUpRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  DotIcon,
} from "@/components/icons";

/**
 * Project detail page — monochrome. No color, no gradients. Structure comes
 * from a large title, uppercase section labels with hairline rules, numbered
 * decisions, and a clean before/after table. Category is a plain text label.
 */
export function ProjectDetail({ project: p }: { project: Project }) {
  const meta = getCategoryMeta(p.category);

  return (
    <article className="space-y-14">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <header className="print-block">
        <Reveal>
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
            <span>{p.category}</span>
            <span aria-hidden>·</span>
            <span>{meta.label}</span>
            <span aria-hidden>·</span>
            <span className="tnum normal-case tracking-normal">{p.period}</span>
          </div>

          <h1 className="mt-4 text-[2rem] font-bold leading-[1.12] tracking-tight text-ink sm:text-[2.5rem]">
            {p.title}
          </h1>

          <p className="mt-5 max-w-[62ch] text-[1.05rem] leading-relaxed text-ink-body">
            {p.headline}
          </p>

          <p className="mt-4 text-[13px] font-medium text-ink-muted">
            <span className="text-ink-faint">역할 &nbsp;</span>
            {p.role}
          </p>
        </Reveal>

        {/* Key result — bordered band, no fill color */}
        <Reveal delay={0.06}>
          <div className="mt-7 border-y-2 border-ink py-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink-faint">
              Key Result
            </p>
            <p className="mt-1.5 text-[1.05rem] font-semibold leading-snug text-ink">
              {p.keyResult}
            </p>
          </div>
        </Reveal>

        {/* Tech chips — hairline outlines only */}
        <Reveal delay={0.1}>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-paper px-2.5 py-1 text-[12px] font-medium text-ink-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </header>

      {/* ── Overview ───────────────────────────────────────────── */}
      {(p.overview || p.summary) && (
        <Section title="Overview" ko="개요">
          {p.overview && (
            <p className="leading-relaxed text-ink-body">{p.overview}</p>
          )}
          {p.summary && p.summary !== p.overview && (
            <p className="mt-3 border-l-2 border-line-strong pl-4 text-[14px] leading-relaxed text-ink-muted">
              {p.summary}
            </p>
          )}
        </Section>
      )}

      {/* ── Scope ──────────────────────────────────────────────── */}
      {p.scope && p.scope.length > 0 && (
        <Section title="Scope" ko="담당 범위">
          <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {p.scope.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-[13.5px] leading-snug text-ink-body"
              >
                <DotIcon className="mt-[7px] shrink-0 text-ink" />
                {s}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ── Problem ────────────────────────────────────────────── */}
      {p.problem && (
        <Section title="Problem" ko="문제">
          <div className="border-l-2 border-ink py-1 pl-5">
            <p className="leading-relaxed text-ink-body">{p.problem}</p>
          </div>
        </Section>
      )}

      {/* ── Decisions ──────────────────────────────────────────── */}
      {p.decisions && p.decisions.length > 0 && (
        <Section title="Decisions" ko="기술적 의사결정">
          {p.decision && (
            <p className="mb-6 leading-relaxed text-ink-muted">{p.decision}</p>
          )}
          <ol className="space-y-0">
            {p.decisions.map((d, i) => (
              <Reveal as="li" key={i} delay={i * 0.04}>
                <div className="flex gap-4 border-t border-line py-5 first:border-t-0 first:pt-0">
                  <span
                    aria-hidden
                    className="tnum shrink-0 text-[15px] font-bold text-ink/40"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-bold text-ink">
                      {d.heading}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-body">
                      {d.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Section>
      )}

      {/* ── Before / After ─────────────────────────────────────── */}
      {p.beforeAfter && p.beforeAfter.length > 0 && (
        <Section title="Before / After" ko="개선 전후">
          <div className="-mx-1 overflow-x-auto sm:mx-0">
            <table className="w-full min-w-[460px] border-collapse text-left text-[13px]">
              <thead>
                <tr className="border-b-2 border-ink">
                  <th className="w-[20%] py-3 pr-4 text-[11px] font-bold uppercase tracking-wider text-ink-faint">
                    항목
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-ink-faint">
                    Before
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-ink">
                    <span className="inline-flex items-center gap-1.5">
                      <ArrowRightIcon width={13} height={13} />
                      After
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {p.beforeAfter.map((row, i) => (
                  <tr key={i} className="border-b border-line">
                    <th
                      scope="row"
                      className="py-3 pr-4 align-top font-semibold text-ink"
                    >
                      {row.aspect}
                    </th>
                    <td className="px-4 py-3 align-top text-ink-muted">
                      {row.before}
                    </td>
                    <td className="px-4 py-3 align-top font-medium text-ink">
                      {row.after}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {/* ── Highlights ─────────────────────────────────────────── */}
      {p.highlights && p.highlights.length > 0 && (
        <Section title="Highlights" ko="핵심 작업">
          <ul className="space-y-2.5">
            {p.highlights.map((h, i) => (
              <li key={i} className="flex gap-2.5 leading-relaxed text-ink-body">
                <CheckIcon
                  width={16}
                  height={16}
                  className="mt-1 shrink-0 text-ink"
                />
                <span className="text-[14px]">{h}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ── Results ────────────────────────────────────────────── */}
      {((p.results && p.results.length > 0) || p.result) && (
        <Section title="Results" ko="결과">
          {p.result && (
            <p className="mb-5 leading-relaxed text-ink-body">{p.result}</p>
          )}
          {p.results && p.results.length > 0 && (
            <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {p.results.map((r, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 border-t border-line pt-3 text-[13.5px] font-medium leading-snug text-ink"
                >
                  <span className="tnum shrink-0 text-[12px] font-bold text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          )}
        </Section>
      )}

      {/* ── Related posts ──────────────────────────────────────── */}
      {p.relatedPosts && p.relatedPosts.length > 0 && (
        <Section title="Related Posts" ko="관련 개발 기록">
          <ul>
            {p.relatedPosts.map((post, i) => (
              <li key={i} className="border-t border-line last:border-b">
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-3.5 transition-colors"
                >
                  <span className="text-[14px] text-ink-body group-hover:text-ink group-hover:underline group-hover:underline-offset-4">
                    {post.title}
                  </span>
                  <ArrowUpRightIcon
                    width={16}
                    height={16}
                    className="shrink-0 text-ink-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ── Footer nav ─────────────────────────────────────────── */}
      <footer className="no-print border-t border-line pt-8">
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink transition-colors"
        >
          <ArrowLeftIcon
            width={16}
            height={16}
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          다른 프로젝트 보기
        </Link>
      </footer>
    </article>
  );
}

/* Section with an uppercase EN label + KO heading over a hairline rule. */
function Section({
  title,
  ko,
  children,
}: {
  title: string;
  ko: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="section">
      <div className="mb-5 flex items-baseline justify-between gap-3 border-b border-line pb-2.5">
        <h2 className="text-[1.25rem] font-bold tracking-tight text-ink">
          {ko}
        </h2>
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
          {title}
        </span>
      </div>
      {children}
    </Reveal>
  );
}
