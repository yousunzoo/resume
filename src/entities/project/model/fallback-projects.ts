// Notion(원본) 미설정·조회 실패 시 사용하는 정적 폴백 카드 데이터.
// 카드 레벨 필드만 담는다(상세 본문은 Notion 전용). Task 10에서 15개로 채운다.
import type { Project } from "./types";

export const fallbackProjects: Project[] = [];

export const portfolioIntro =
  "이력서에는 성과와 핵심 의사결정만 간추렸습니다. 상세 포트폴리오에서는 운영 서비스에서 마주한 문제와 기술적 판단, 구현 과정과 결과를 프로젝트 단위로 풀어 정리했습니다.";
