import type { Metadata } from "next";
import { projects, projectCategories, portfolioIntro } from "@/data/resume";
import { SubPageShell } from "@/components/SubPageShell";
import { PortfolioList } from "@/components/PortfolioList";

export const metadata: Metadata = {
  title: "포트폴리오 · 유선주",
  description: portfolioIntro,
};

export default function PortfolioPage() {
  return (
    <SubPageShell>
      <header className="mb-9">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-faint">
          Portfolio
        </p>
        <h1 className="text-[2rem] font-bold leading-tight tracking-tight text-ink">
          프로젝트
        </h1>
        <p className="mt-4 max-w-[60ch] leading-relaxed text-ink-muted">
          {portfolioIntro}
        </p>
      </header>

      <PortfolioList projects={projects} categories={projectCategories} />
    </SubPageShell>
  );
}
