import { experiences } from "@/entities/profile";
import type { TitledItem } from "@/entities/profile";
import { Badge, Reveal, SectionHeading, Text } from "@/shared/ui";

/**
 * 담당 영역 / Key Impact 는 컴팩트 넘버드 리스트지만 인덱스 색이 서로 다르다
 * (담당영역 = ink-faint, Key Impact = ink). shared NumberedList 의 tone 은
 * muted=ink/40 로 매핑되어 원본의 ink-faint 와 색이 미묘하게 어긋나므로,
 * 시각 보존을 위해 여기서는 Text 토큰 기반 bespoke 마크업을 유지한다.
 */
function ImpactList({
  items,
  indexTone,
}: {
  items: TitledItem[];
  indexTone: "faint" | "ink";
}) {
  const indexClass = indexTone === "ink" ? "text-ink" : "text-ink-faint";
  return (
    <ul className="space-y-3.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <Text
            as="span"
            variant="caption"
            weight="bold"
            tnum
            className={`shrink-0 pt-px ${indexClass}`}
          >
            {String(i + 1).padStart(2, "0")}
          </Text>
          <div>
            <Text
              variant="body-sm"
              weight="semibold"
              className="leading-snug text-ink"
            >
              {item.title}
            </Text>
            <Text variant="body-sm" className="mt-1 leading-relaxed text-ink-body">
              {item.description}
            </Text>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ─── Experience — timeline (node + connecting line) ──────────────────────── */
export function ExperienceSection() {
  return (
    <section aria-labelledby="exp-title">
      <Reveal>
        <SectionHeading
          variant="main"
          eyebrow="Experience"
          title="경력"
          id="exp-title"
        />
      </Reveal>

      <ol className="relative ml-1">
        {experiences.map((exp) => (
          <li key={exp.company} className="relative pb-2 pl-8">
            {/* vertical connecting line */}
            <span
              aria-hidden
              className="absolute left-[5px] top-2 h-full w-px bg-line-strong"
            />
            {/* circular node */}
            <span
              aria-hidden
              className="absolute left-0 top-1.5 flex h-[11px] w-[11px] items-center justify-center rounded-full border-2 border-ink bg-paper"
            />

            <Reveal>
              <article className="print-block">
                <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <div>
                    <Text
                      as="h3"
                      variant="title-3"
                      className="flex items-center gap-2 text-ink"
                    >
                      {exp.company}
                      {exp.period.includes("재직") && (
                        <Badge dot>재직 중</Badge>
                      )}
                    </Text>
                    <Text
                      as="p"
                      variant="body-sm"
                      weight="semibold"
                      className="mt-1 text-ink-body"
                    >
                      {exp.role}
                      <span className="ml-2 font-normal text-ink-faint">
                        · {exp.team}
                      </span>
                    </Text>
                  </div>
                  <Text
                    as="span"
                    variant="body-sm"
                    weight="medium"
                    tnum
                    className="text-ink-faint"
                  >
                    {exp.period}
                  </Text>
                </header>

                <Text
                  variant="body-sm"
                  className="mt-4 leading-relaxed text-ink-body"
                >
                  {exp.description}
                </Text>

                {/* Responsibilities */}
                <div className="mt-6">
                  <Text
                    as="h4"
                    variant="eyebrow"
                    className="mb-3.5 uppercase tracking-[0.16em] text-ink-faint"
                  >
                    담당 영역
                  </Text>
                  <ImpactList items={exp.responsibilities} indexTone="faint" />
                </div>

                {/* Key Impact — rule-led, numbers stand out via bold */}
                <div className="mt-6 border-t border-ink pt-5">
                  <Text
                    as="h4"
                    variant="eyebrow"
                    className="mb-3.5 uppercase tracking-[0.16em] text-ink"
                  >
                    Key Impact
                  </Text>
                  <ImpactList items={exp.keyImpact} indexTone="ink" />
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
