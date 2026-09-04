import type { NotionBlock } from "./notion-block";

export type ProjectCategory =
  | "금융 서비스"
  | "플랫폼"
  | "모바일 앱"
  | "백오피스·자동화";

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
