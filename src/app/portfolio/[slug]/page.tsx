import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/entities/project";
import { ProjectView } from "@/views/project";
import { JsonLd } from "@/shared/ui";
import { buildCreativeWorkJsonLd } from "@/shared/lib/seo";
import { site } from "@/shared/config/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "프로젝트를 찾을 수 없습니다" };

  const title = `${project.title} · 유선주`;
  const url = `/portfolio/${project.slug}`;

  return {
    title,
    description: project.headline,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: project.headline,
      url,
    },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd
        data={buildCreativeWorkJsonLd({
          name: project.title,
          description: project.headline,
          url: `${site.url}/portfolio/${project.slug}`,
          keywords: project.tech,
        })}
      />
      <ProjectView project={project} />
    </>
  );
}
