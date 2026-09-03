import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { Text } from "@/shared/ui/text";

interface ChipProps {
  children: ReactNode;
  tone?: "neutral" | "accent";
  className?: string;
}

/** 소형 키워드 칩. accent = 잉크 테두리, neutral = 헤어라인 위 muted. */
export function Chip({ children, tone = "neutral", className }: ChipProps) {
  const toneClass =
    tone === "accent"
      ? "border-ink bg-paper text-ink"
      : "border-line bg-paper-2 text-ink-muted";
  return (
    <Text
      as="span"
      variant="caption"
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1",
        toneClass,
        className
      )}
    >
      {children}
    </Text>
  );
}
