import Link from "next/link";
import { ProjectCard } from "@/entities/project";
import { getFeaturedProjects } from "@/entities/project/server";
import { ArrowRightIcon, Reveal, SectionHeading, Text } from "@/shared/ui";

/* ─── Projects ────────────────────────────────────────────────────────────── */
export async function ProjectsSection() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <section aria-labelledby="proj-title" className="print:hidden">
      <Reveal>
        <div className="mb-7 flex items-end justify-between gap-4">
          <SectionHeading
            variant="main"
            eyebrow="Work"
            title="주요 프로젝트"
            id="proj-title"
          />
          <Link
            href="/portfolio"
            className="no-print group mb-1 inline-flex shrink-0 items-center gap-1.5 text-ink transition-colors"
          >
            <Text as="span" variant="body-sm" weight="semibold">
              전체 보기
            </Text>
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
          <Reveal key={p.slug} className="h-full">
            <ProjectCard project={p} index={i + 1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
