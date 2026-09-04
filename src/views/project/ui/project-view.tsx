import { PageShell } from "@/widgets/page-shell";
import { ProjectDetail } from "@/widgets/project-detail";
import type { ProjectDetail as ProjectDetailData } from "@/entities/project";

interface ProjectViewProps {
  project: ProjectDetailData;
}

/**
 * 프로젝트 상세 화면 조립 — PageShell(뒤로 가기: 포트폴리오 목록) 안에
 * 읽기 폭(max-w-[760px])으로 ProjectDetail 을 배치한다.
 */
export function ProjectView({ project }: ProjectViewProps) {
  return (
    <PageShell backLabel="포트폴리오 목록" backHref="/portfolio">
      <div className="mx-auto max-w-[760px]">
        <ProjectDetail project={project} />
      </div>
    </PageShell>
  );
}
