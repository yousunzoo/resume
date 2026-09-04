import type { Metadata } from "next";
import { portfolioIntro } from "@/entities/project";
import { PortfolioView } from "@/views/portfolio";

export const metadata: Metadata = {
  title: "포트폴리오 · 유선주",
  description: portfolioIntro,
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "포트폴리오 · 유선주",
    description: portfolioIntro,
    url: "/portfolio",
  },
};

// 포트폴리오 목록을 Notion(원본)에서 조회 — ISR 재검증
export const revalidate = 300;

export default function PortfolioPage() {
  return <PortfolioView />;
}
