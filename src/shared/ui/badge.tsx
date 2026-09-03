import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { Text } from "@/shared/ui/text";

interface BadgeProps {
  children: ReactNode;
  tone?: "outline" | "solid";
  /** 선행 도트 렌더 — "재직 중" 상태 표기용. */
  dot?: boolean;
  className?: string;
}

/** "재직 중" / "Featured" / ★ 류 상태 라벨. overline 사이즈, 대문자. */
export function Badge({ children, tone = "outline", dot = false, className }: BadgeProps) {
  const toneClass =
    tone === "solid" ? "bg-ink text-white" : "border border-ink text-ink";
  return (
    <Text
      as="span"
      variant="overline"
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 uppercase",
        toneClass,
        className
      )}
    >
      {dot && (
        <span
          aria-hidden
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-current"
        />
      )}
      {children}
    </Text>
  );
}
