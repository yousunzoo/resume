import { cn } from "@/shared/lib/cn";

interface DividerProps {
  className?: string;
  /** true = 잉크 라인(강조), false = 헤어라인(기본). */
  strong?: boolean;
}

/** 얇은 수평 규칙. */
export function Divider({ className, strong = false }: DividerProps) {
  return (
    <hr
      className={cn(
        "border-t",
        strong ? "border-ink" : "border-line",
        className
      )}
    />
  );
}
