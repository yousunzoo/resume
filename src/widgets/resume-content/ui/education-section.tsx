import { education } from "@/entities/profile";
import { Reveal, SectionHeading, Text } from "@/shared/ui";

/* ─── Education ───────────────────────────────────────────────────────────── */
export function EducationSection() {
  return (
    <section aria-labelledby="edu-title">
      <Reveal>
        <SectionHeading
          variant="main"
          eyebrow="Education"
          title="학력"
          id="edu-title"
        />
      </Reveal>
      <ul className="border-t border-line">
        {education.map((edu) => (
          <Reveal as="li" key={edu.institution}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line py-4 print-block">
              <div>
                <Text as="h3" variant="body" weight="bold" className="text-ink">
                  {edu.institution}
                  <Text
                    as="span"
                    variant="caption"
                    weight="medium"
                    className="ml-2 text-ink-faint"
                  >
                    {edu.status}
                  </Text>
                </Text>
                <Text
                  variant="body-sm"
                  className="mt-0.5 text-ink-muted"
                >
                  {edu.program}
                </Text>
              </div>
              <Text
                as="span"
                variant="body-sm"
                weight="medium"
                tnum
                className="text-ink-faint"
              >
                {edu.period}
              </Text>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
