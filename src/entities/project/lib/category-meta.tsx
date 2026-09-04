import type { SVGProps } from "react";
import type { ProjectCategory } from "../model/types";

/**
 * Per-category visual identity for the portfolio.
 *
 * This module carries the *non-color* identity: a short English label plus a
 * distinct line-icon motif per category. Category is always communicated with a
 * text label too — never icon or color alone (WCAG 1.4.1).
 */

type IconProps = SVGProps<SVGSVGElement>;

const iconBase = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/* 금융 서비스 — stacked coins / value flow */
function FinanceIcon(props: IconProps) {
  return (
    <svg {...iconBase} {...props}>
      <ellipse cx="12" cy="6" rx="6.5" ry="2.4" />
      <path d="M5.5 6v5c0 1.3 2.9 2.4 6.5 2.4s6.5-1.1 6.5-2.4V6" />
      <path d="M5.5 11v5c0 1.3 2.9 2.4 6.5 2.4s6.5-1.1 6.5-2.4v-5" />
    </svg>
  );
}

/* 플랫폼 — connected nodes (multi-actor platforms) */
function PlatformIcon(props: IconProps) {
  return (
    <svg {...iconBase} {...props}>
      <circle cx="6" cy="6" r="2.3" />
      <circle cx="18" cy="7" r="2.3" />
      <circle cx="12" cy="18" r="2.3" />
      <path d="M7.6 7.6 10.6 16M16.7 8.8 13.4 16M8 6.4h8" />
    </svg>
  );
}

/* 모바일 앱 — phone / device */
function MobileIcon(props: IconProps) {
  return (
    <svg {...iconBase} {...props}>
      <rect x="7" y="3" width="10" height="18" rx="2.2" />
      <path d="M10.5 18h3" />
    </svg>
  );
}

/* 백오피스·자동화 — gear / automation */
function AutomationIcon(props: IconProps) {
  return (
    <svg {...iconBase} {...props}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3v2.4M12 18.6V21M4.2 7.5l2 1.2M17.8 15.3l2 1.2M4.2 16.5l2-1.2M17.8 8.7l2-1.2" />
    </svg>
  );
}

export interface CategoryMeta {
  /** Short EN label shown alongside the KO category name. */
  label: string;
  Icon: (props: IconProps) => React.JSX.Element;
}

export const CATEGORY_META: Record<ProjectCategory, CategoryMeta> = {
  "금융 서비스": { label: "Financial Service", Icon: FinanceIcon },
  "플랫폼": { label: "Platform", Icon: PlatformIcon },
  "모바일 앱": { label: "Mobile App", Icon: MobileIcon },
  "백오피스·자동화": { label: "Back-office · Automation", Icon: AutomationIcon },
};

/** Fallback for any category not (yet) in CATEGORY_META — e.g. a Notion select
 *  option added upstream before the code catches up. Keeps prerender from
 *  crashing on unknown live data (see getCategoryMeta). */
const FALLBACK_META: CategoryMeta = { label: "Project", Icon: PlatformIcon };

export function getCategoryMeta(category: ProjectCategory): CategoryMeta {
  // Live Notion data can drift from the ProjectCategory union; never assume the
  // key exists. Falling back beats throwing during static generation.
  return CATEGORY_META[category] ?? FALLBACK_META;
}
