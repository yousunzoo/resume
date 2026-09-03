import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/entities/project";
import { ProjectView } from "@/views/project";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "프로젝트를 찾을 수 없습니다" };
  return {
    title: `${project.title} · 유선주`,
    description: project.headline,
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return <ProjectView project={project} />;
}
