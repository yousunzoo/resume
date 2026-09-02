import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Kept for call-site compatibility; no longer used (motion removed). */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
  /** Kept for call-site compatibility; no longer used (motion removed). */
  variant?: "up" | "fade" | "left";
}

/**
 * Static content wrapper. Scroll-reveal animation was removed in favor of a
 * calmer, immediately-visible résumé. This just renders children in the
 * requested element so existing call sites keep working.
 */
export function Reveal({ children, className, as = "div" }: RevealProps) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
}
