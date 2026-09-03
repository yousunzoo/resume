import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { Text } from "@/shared/ui/text";

interface TechTagProps {
  children: ReactNode;
  size?: "sm" | "xs";
  /** outline = 헤어라인 캡슐, plain = 텍스트만. */
  variant?: "outline" | "plain";
  className?: string;
}

/**
 * 기술 스택 태그. 현행 3종(ProjectCard 텍스트 / ProjectDetail 라운드 아웃라인 /
 * PortfolioList 소형 아웃라인)을 size × variant 로 통합.
 */
export function TechTag({
  children,
  size = "sm",
  variant = "outline",
  className,
}: TechTagProps) {
  const textVariant = size === "xs" ? "overline" : "caption";

  if (variant === "plain") {
    return (
      <Text
        as="span"
        variant={textVariant}
        weight="medium"
        className={cn("text-ink-muted", className)}
      >
        {children}
      </Text>
    );
  }

  const pad = size === "xs" ? "px-1.5 py-0.5" : "px-2.5 py-1";
  return (
    <Text
      as="span"
      variant={textVariant}
      weight="medium"
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-paper text-ink-muted",
        pad,
        className
      )}
    >
      {children}
    </Text>
  );
}
