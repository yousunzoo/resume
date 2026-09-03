import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

/** 헤어라인 카드 표면. hover 시 살짝 떠오르며 테두리/그림자가 강해진다. */
export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-paper shadow-[var(--shadow-sm)]",
        hover &&
          "transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-md)]",
        className
      )}
    >
      {children}
    </div>
  );
}
