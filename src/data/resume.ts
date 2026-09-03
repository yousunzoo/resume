// ────────────────────────────────────────────────────────────────────────────
// [재-export shim] 이력서·포트폴리오 데이터의 정본은 entities 슬라이스로 이동했습니다.
//   · 도메인 타입/데이터/셀렉터 → @/entities/project, @/entities/profile
//   · 전역 상수(DEVLOG_URL)      → @/shared/config/site
// 기존 `@/data/resume` 소비자가 마이그레이션될 때까지 API 호환을 위한 얇은 재-export.
// 컴포넌트 마이그레이션 완료 후 삭제 예정.
// ────────────────────────────────────────────────────────────────────────────

export { DEVLOG_URL } from "@/shared/config/site";

export * from "@/entities/project";
export * from "@/entities/profile";
