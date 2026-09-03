/**
 * 사이트 전역 상수. FSD 최하위 shared/config 계층이 단일 진실 원천이다.
 */
export const site = {
  url: "https://yousunzoo.dev",
  devlogUrl: "https://yousunzoo.notion.site/devlog",
} as const;

/** 레거시 호환용 별칭. 기존 resume.ts 의 DEVLOG_URL 을 대체한다. */
export const DEVLOG_URL = site.devlogUrl;
