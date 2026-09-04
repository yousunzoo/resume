// project 엔티티 — 서버 전용 public API.
// Notion(server-only) 데이터 접근은 이 진입점으로만 노출한다. 서버 컴포넌트
// (뷰·라우트·sitemap)에서 import 하고, 클라이언트 컴포넌트는 index.ts 를 쓴다.
export {
  getProjects,
  getFeaturedProjects,
  getProjectDetail,
} from "./model/selectors";
