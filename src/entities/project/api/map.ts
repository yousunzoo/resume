import type { Project, ProjectCategory } from "../model/types";

const plain = (rt: Array<{ plain_text: string }> = []) =>
  rt.map((t) => t.plain_text).join("");

export const splitTech = (s: string): string[] =>
  s.split("·").map((t) => t.trim()).filter(Boolean);

export const parseFeatured = (v: boolean | null): boolean => v === true;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = Record<string, any>;

export function mapPropsToProject(page: { properties: Props }): Project {
  const p = page.properties;
  return {
    slug: plain(p.Slug?.rich_text),
    title: plain(p.Project?.title),
    category: (p.Category?.select?.name ?? "클라이언트 SI") as ProjectCategory,
    featured: parseFeatured(p.Featured?.checkbox ?? null),
    order: p.Order?.number ?? null,
    period: plain(p.Period?.rich_text),
    role: plain(p.Role?.rich_text),
    tech: splitTech(plain(p.Tech?.rich_text)),
    headline: plain(p.Headline?.rich_text),
    keyResult: plain(p["Key Result"]?.rich_text),
    tags: (p.Tags?.multi_select ?? []).map((t: { name: string }) => t.name),
  };
}
