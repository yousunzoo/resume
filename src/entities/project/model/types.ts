import type { NotionBlock } from "./notion-block";

export type ProjectCategory =
  | "클라이언트 SI"
  | "자체 도구·인프라"
  | "개인·학습";

// 카드/목록용 — Notion DB 속성에서 매핑
export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  featured: boolean;
  order: number | null;
  period: string;
  role: string;
  tech: string[];
  headline: string;
  keyResult: string;
  tags: string[];
}

// 상세용 — 카드 + Notion 페이지 본문 블록
export interface ProjectDetail extends Project {
  blocks: NotionBlock[];
}

export type { NotionBlock, RichSpan } from "./notion-block";
