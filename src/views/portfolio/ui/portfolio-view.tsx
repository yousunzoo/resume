import { PageShell } from "@/widgets/page-shell";
import { ProjectFilter } from "@/features/filter-projects";
import {
  projects,
  projectCategories,
  portfolioIntro,
} from "@/entities/project";
import { Eyebrow, Heading, Text } from "@/shared/ui";

/**
 * 포트폴리오 목록 화면 조립 — PageShell(자체 SkipLink + `<main id="main">") 안에
 * 헤더(Eyebrow/Heading/Text 토큰)와 카테고리 필터 목록을 배치한다.
 */
export function PortfolioView() {
  return (
    <PageShell>
      <header className="mb-9">
        <Eyebrow className="mb-2 tracking-[0.2em]">Portfolio</Eyebrow>
        <Heading
          as="h1"
          variant="title-1"
          className="leading-tight tracking-tight text-ink"
        >
          프로젝트
        </Heading>
        <Text className="mt-4 max-w-[60ch] leading-relaxed text-ink-muted">
          {portfolioIntro}
        </Text>
      </header>

      <ProjectFilter projects={projects} categories={projectCategories} />
    </PageShell>
  );
}
