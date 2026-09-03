import { aboutMe } from "@/entities/profile";
import { Reveal, SectionHeading, Text } from "@/shared/ui";

/* ─── About ───────────────────────────────────────────────────────────────── */
export function AboutSection() {
  const [lead, ...rest] = aboutMe;
  return (
    <section aria-labelledby="about-title">
      <Reveal>
        <SectionHeading
          variant="main"
          eyebrow="Profile"
          title="자기소개"
          id="about-title"
        />
      </Reveal>
      <Reveal>
        <Text variant="lead" className="leading-relaxed text-ink">
          {lead}
        </Text>
      </Reveal>
      <div className="mt-5 space-y-4">
        {rest.map((para, i) => (
          <Reveal key={i}>
            <Text className="leading-relaxed text-ink-body">{para}</Text>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
