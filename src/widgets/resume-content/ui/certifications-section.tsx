import { certifications } from "@/entities/profile";
import { Reveal, SectionHeading, Text } from "@/shared/ui";

/* ─── Certifications ──────────────────────────────────────────────────────── */
export function CertificationsSection() {
  return (
    <section aria-labelledby="cert-title">
      <Reveal>
        <SectionHeading
          variant="main"
          eyebrow="Certifications"
          title="자격증"
          id="cert-title"
        />
      </Reveal>
      <Reveal>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 print-block">
          {certifications.map((cert) => (
            <Text
              as="li"
              key={cert.name}
              variant="body-sm"
              className="flex items-baseline gap-1.5 text-ink-body"
            >
              <span className="font-medium text-ink">{cert.name}</span>
              <Text as="span" variant="caption" tnum className="text-ink-faint">
                {cert.year}
              </Text>
            </Text>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
