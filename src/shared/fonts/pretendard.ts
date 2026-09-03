import localFont from "next/font/local";

/**
 * Self-hosted Pretendard (variable) via next/font/local.
 * Replaces the render-blocking jsdelivr CDN @import — no external DNS/request,
 * no layout shift. The variable axis range for Pretendard v1.3.9 is 45–920.
 */
export const pretendard = localFont({
  src: "./PretendardVariable.woff2",
  weight: "45 920",
  style: "normal",
  display: "swap",
  variable: "--font-pretendard",
  fallback: [
    "Apple SD Gothic Neo",
    "Malgun Gothic",
    "Noto Sans KR",
    "system-ui",
    "sans-serif",
  ],
});
