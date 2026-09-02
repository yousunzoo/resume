import Link from "next/link";
import {
  aboutMe,
  experiences,
  projects,
  featuredProjects,
  education,
  certifications,
} from "@/data/resume";
import { ResumeSidebar } from "@/components/ResumeSidebar";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionTitle } from "@/components/ui";
import { ArrowRightIcon } from "@/components/icons";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link no-print">
        본문으로 건너뛰기
      </a>
      <div className="min-h-screen bg-canvas">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 lg:grid-cols-[340px_minmax(0,1fr)]">
          {/* Left rail */}
          <ResumeSidebar />

          {/* Main column */}
          <main
            id="main"
            className="bg-canvas px-6 py-10 sm:px-9 lg:px-12 lg:py-14"
          >
            <div className="mx-auto max-w-[720px] space-y-16 lg:space-y-20">
              <AboutSection />
              <ExperienceSection />
              <ProjectsSection />
              <EducationSection />
              <CertificationsSection />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

/* ─── About ───────────────────────────────────────────────────────────────── */
function AboutSection() {
  const [lead, ...rest] = aboutMe;
  return (
    <section aria-labelledby="about-title">
      <Reveal>
        <SectionTitle eyebrow="Profile" title="자기소개" id="about-title" />
      </Reveal>
      <Reveal delay={0.05}>
        <p className="text-[1.15rem] font-semibold leading-relaxed text-ink">
          {lead}
        </p>
      </Reveal>
      <div className="mt-5 space-y-4">
        {rest.map((para, i) => (
          <Reveal key={i} delay={0.08 + i * 0.04}>
            <p className="leading-relaxed text-ink-body">{para}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── Experience — timeline (node + connecting line) ──────────────────────── */
function ExperienceSection() {
  return (
    <section aria-labelledby="exp-title">
      <Reveal>
        <SectionTitle eyebrow="Experience" title="경력" id="exp-title" />
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
                    <h3 className="flex items-center gap-2 text-[1.2rem] font-bold text-ink">
                      {exp.company}
                      {exp.period.includes("재직") && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-ink px-2 py-0.5 text-[10px] font-semibold text-ink">
                          <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                          재직 중
                        </span>
                      )}
                    </h3>
                    <p className="mt-1 text-[14px] font-semibold text-ink-body">
                      {exp.role}
                      <span className="ml-2 font-normal text-ink-faint">
                        · {exp.team}
                      </span>
                    </p>
                  </div>
                  <span className="tnum text-[13px] font-medium text-ink-faint">
                    {exp.period}
                  </span>
                </header>

                <p className="mt-4 text-[14px] leading-relaxed text-ink-body">
                  {exp.description}
                </p>

                {/* Responsibilities */}
                <div className="mt-6">
                  <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-faint">
                    담당 영역
                  </h4>
                  <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                    {exp.responsibilities.map((r, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-[13px] leading-snug text-ink-body"
                      >
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Impact — rule-led, numbers stand out via bold */}
                <div className="mt-6 border-t border-ink pt-5">
                  <h4 className="mb-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink">
                    Key Impact
                  </h4>
                  <ul className="space-y-3">
                    {exp.keyImpact.map((k, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-[13.5px] leading-relaxed text-ink-body"
                      >
                        <span className="tnum shrink-0 pt-px text-[12px] font-bold text-ink-faint">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{k}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ─── Projects ────────────────────────────────────────────────────────────── */
function ProjectsSection() {
  return (
    <section aria-labelledby="proj-title">
      <Reveal>
        <div className="mb-7 flex items-end justify-between gap-4">
          <SectionTitle eyebrow="Work" title="주요 프로젝트" id="proj-title" />
          <Link
            href="/portfolio"
            className="no-print group mb-1 inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-ink transition-colors"
          >
            전체 보기
            <ArrowRightIcon
              width={15}
              height={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2">
        {featuredProjects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05} className="h-full">
            <ProjectCard
              project={p}
              index={projects.findIndex((x) => x.slug === p.slug) + 1}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── Education ───────────────────────────────────────────────────────────── */
function EducationSection() {
  return (
    <section aria-labelledby="edu-title">
      <Reveal>
        <SectionTitle eyebrow="Education" title="학력" id="edu-title" />
      </Reveal>
      <ul className="border-t border-line">
        {education.map((edu, i) => (
          <Reveal as="li" key={edu.institution} delay={i * 0.04}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line py-4 print-block">
              <div>
                <h3 className="text-[15px] font-bold text-ink">
                  {edu.institution}
                  <span className="ml-2 text-[12px] font-medium text-ink-faint">
                    {edu.status}
                  </span>
                </h3>
                <p className="mt-0.5 text-[13px] text-ink-muted">
                  {edu.program}
                </p>
              </div>
              <span className="tnum text-[13px] font-medium text-ink-faint">
                {edu.period}
              </span>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* ─── Certifications ──────────────────────────────────────────────────────── */
function CertificationsSection() {
  return (
    <section aria-labelledby="cert-title">
      <Reveal>
        <SectionTitle
          eyebrow="Certifications"
          title="자격증"
          id="cert-title"
        />
      </Reveal>
      <ul className="grid gap-x-8 sm:grid-cols-2">
        {certifications.map((cert, i) => (
          <Reveal as="li" key={cert.name} delay={i * 0.04}>
            <div className="flex items-baseline gap-2 border-b border-line py-3 print-block">
              <span className="text-[14px] font-medium text-ink">
                {cert.name}
              </span>
              <span
                aria-hidden
                className="mb-1 min-w-4 flex-1 border-b border-dotted border-line-strong"
              />
              <span className="text-[12px] text-ink-muted">{cert.issuer}</span>
              <span className="tnum shrink-0 text-[12px] font-medium text-ink-faint">
                {cert.year}
              </span>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
