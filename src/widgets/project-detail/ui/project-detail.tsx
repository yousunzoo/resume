import Link from "next/link";
import { getCategoryMeta, type ProjectDetail as ProjectDetailData } from "@/entities/project";
import { ArrowLeftIcon, Reveal, Text } from "@/shared/ui";
import { NotionBlocks } from "./notion-blocks";

/**
 * Project detail page — monochrome. 히어로(카테고리·기간·제목·헤드라인·역할·
 * Key Result·기술)는 카드 속성으로 조립하고, 본문은 Notion 페이지 블록을
 * NotionBlocks 로 렌더한다. 색·그라데이션 없이 타이포·hairline 으로 위계를 만든다.
 */
export function ProjectDetail({ project: p }: { project: ProjectDetailData }) {
  const meta = getCategoryMeta(p.category);

  return (
    <article className="space-y-12 print:space-y-8">
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

          <Text variant="body-sm" weight="medium" className="mt-4 text-ink-muted">
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

      {/* ── Body (Notion 페이지 본문) ──────────────────────────── */}
      <Reveal as="section">
        <NotionBlocks blocks={p.blocks} />
      </Reveal>

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
