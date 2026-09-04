// project 엔티티 public API
// entities 계층은 shared 와 외부 패키지에만 의존한다.

export type {
  ProjectCategory,
  Project,
  ProjectDetail,
  NotionBlock,
  RichSpan,
} from "./model/types";

// 클라이언트 안전 public API. Notion 데이터 fetch(server-only)는 ./server 로 분리.
export { portfolioIntro } from "./model/fallback-projects";
export { projectCategories } from "./model/categories";

export {
  CATEGORY_META,
  getCategoryMeta,
  type CategoryMeta,
} from "./lib/category-meta";

export { ProjectCard } from "./ui/project-card";
export { CategoryTag } from "./ui/category-tag";
