import type { Metadata } from "next";
import { portfolioIntro } from "@/entities/project";
import { PortfolioView } from "@/views/portfolio";

export const metadata: Metadata = {
  title: "포트폴리오 · 유선주",
  description: portfolioIntro,
};

export default function PortfolioPage() {
  return <PortfolioView />;
}
