import Link from "next/link";
import type { ReactNode } from "react";
import { getCategoryMeta, type Project } from "@/entities/project";
import {
  ArrowUpRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  DotIcon,
  NumberedList,
  Reveal,
  SectionHeading,
  Text,
} from "@/shared/ui";

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
          <Text
            as="div"
            variant="eyebrow"
            weight="semibold"
            className="flex flex-wrap items-center gap-x-2.5 gap-y-1 uppercase tracking-[0.16em] text-ink-faint"
          >
            <span>{p.category}</span>
            <span aria-hidden>·</span>
            <span>{meta.label}</span>
            <span aria-hidden>·</span>
            <span className="tnum normal-case tracking-normal">{p.period}</span>
          </Text>

          <Text
            as="h1"
            variant="title-1"
            className="mt-4 leading-[1.12] tracking-tight text-ink sm:text-display"
          >
            {p.title}
          </Text>

          <Text
            variant="lead"
            weight="normal"
            className="mt-5 max-w-[62ch] leading-relaxed text-ink-body"
          >
            {p.headline}
          </Text>

          <Text
            variant="body-sm"
            weight="medium"
            className="mt-4 text-ink-muted"
          >
            <span className="text-ink-faint">역할 &nbsp;</span>
            {p.role}
          </Text>
        </Reveal>

        {/* Key result — bordered band, no fill color */}
        <Reveal>
          <div className="mt-7 border-y-2 border-ink py-4">
            <Text
              as="p"
              variant="overline"
              weight="bold"
              className="uppercase tracking-[0.16em] text-ink-faint"
            >
              Key Result
            </Text>
            <Text
              as="p"
              variant="lead"
              weight="semibold"
              className="mt-1.5 leading-snug text-ink"
            >
              {p.keyResult}
            </Text>
          </div>
        </Reveal>

        {/* Tech chips — hairline outlines only */}
        <Reveal>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <Text
                as="span"
                key={t}
                variant="caption"
                weight="medium"
                className="rounded-full border border-line bg-paper px-2.5 py-1 text-ink-muted"
              >
                {t}
              </Text>
            ))}
          </div>
        </Reveal>
      </header>

      {/* ── Overview ───────────────────────────────────────────── */}
      {(p.overview || p.summary) && (
        <Section title="Overview" ko="개요">
          {p.overview && (
            <Text className="leading-relaxed text-ink-body">{p.overview}</Text>
          )}
          {p.summary && p.summary !== p.overview && (
            <Text
              variant="body-sm"
              className="mt-3 border-l-2 border-line-strong pl-4 leading-relaxed text-ink-muted"
            >
              {p.summary}
            </Text>
          )}
        </Section>
      )}

      {/* ── Scope ──────────────────────────────────────────────── */}
      {p.scope && p.scope.length > 0 && (
        <Section title="Scope" ko="담당 범위">
          <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {p.scope.map((s, i) => (
              <Text
                as="li"
                key={i}
                variant="body-sm"
                className="flex items-start gap-2.5 leading-snug text-ink-body"
              >
                <DotIcon className="mt-[7px] shrink-0 text-ink" />
                {s}
              </Text>
            ))}
          </ul>
        </Section>
      )}

      {/* ── Problem ────────────────────────────────────────────── */}
      {p.problem && (
        <Section title="Problem" ko="문제">
          <div className="border-l-2 border-ink py-1 pl-5">
            <Text className="leading-relaxed text-ink-body">{p.problem}</Text>
          </div>
        </Section>
      )}

      {/* ── Decisions ──────────────────────────────────────────── */}
      {p.decisions && p.decisions.length > 0 && (
        <Section title="Decisions" ko="기술적 의사결정">
          {p.decision && (
            <Text className="mb-6 leading-relaxed text-ink-muted">
              {p.decision}
            </Text>
          )}
          <NumberedList
            items={p.decisions.map((d) => ({ title: d.heading, body: d.body }))}
          />
        </Section>
      )}

      {/* ── Before / After ─────────────────────────────────────── */}
      {p.beforeAfter && p.beforeAfter.length > 0 && (
        <Section title="Before / After" ko="개선 전후">
          <div className="-mx-1 overflow-x-auto sm:mx-0">
            <table className="w-full min-w-[460px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink">
                  <Text
                    as="th"
                    variant="eyebrow"
                    weight="bold"
                    className="w-[20%] py-3 pr-4 uppercase tracking-wider text-ink-faint"
                  >
                    항목
                  </Text>
                  <Text
                    as="th"
                    variant="eyebrow"
                    weight="bold"
                    className="px-4 py-3 uppercase tracking-wider text-ink-faint"
                  >
                    Before
                  </Text>
                  <Text
                    as="th"
                    variant="eyebrow"
                    weight="bold"
                    className="px-4 py-3 uppercase tracking-wider text-ink"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <ArrowRightIcon width={13} height={13} />
                      After
                    </span>
                  </Text>
                </tr>
              </thead>
              <tbody>
                {p.beforeAfter.map((row, i) => (
                  <tr key={i} className="border-b border-line">
                    <Text
                      as="th"
                      variant="body-sm"
                      weight="semibold"
                      scope="row"
                      className="py-3 pr-4 align-top text-ink"
                    >
                      {row.aspect}
                    </Text>
                    <Text
                      as="td"
                      variant="body-sm"
                      className="px-4 py-3 align-top text-ink-muted"
                    >
                      {row.before}
                    </Text>
                    <Text
                      as="td"
                      variant="body-sm"
                      weight="medium"
                      className="px-4 py-3 align-top text-ink"
                    >
                      {row.after}
                    </Text>
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
                <Text as="span" variant="body-sm">
                  {h}
                </Text>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ── Results ────────────────────────────────────────────── */}
      {((p.results && p.results.length > 0) || p.result) && (
        <Section title="Results" ko="결과">
          {p.result && (
            <Text className="mb-5 leading-relaxed text-ink-body">
              {p.result}
            </Text>
          )}
          {p.results && p.results.length > 0 && (
            <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {p.results.map((r, i) => (
                <Text
                  as="li"
                  key={i}
                  variant="body-sm"
                  weight="medium"
                  className="flex items-start gap-2.5 border-t border-line pt-3 leading-snug text-ink"
                >
                  <Text
                    as="span"
                    variant="caption"
                    weight="bold"
                    tnum
                    className="shrink-0 text-ink-faint"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </Text>
                  {r}
                </Text>
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
                  <Text
                    as="span"
                    variant="body-sm"
                    className="text-ink-body group-hover:text-ink group-hover:underline group-hover:underline-offset-4"
                  >
                    {post.title}
                  </Text>
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
          className="group inline-flex items-center gap-1.5 text-ink transition-colors"
        >
          <ArrowLeftIcon
            width={16}
            height={16}
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          <Text as="span" variant="body-sm" weight="semibold">
            다른 프로젝트 보기
          </Text>
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
  children: ReactNode;
}) {
  return (
    <Reveal as="section">
      <SectionHeading variant="detail" title={ko} en={title} />
      {children}
    </Reveal>
  );
}
