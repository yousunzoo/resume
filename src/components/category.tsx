import type { SVGProps } from "react";
import type { ProjectCategory } from "@/data/resume";

/**
 * Per-category visual identity for the portfolio.
 *
 * Colors live in globals.css as [data-cat="…"] scopes that expose the generic
 * --c* tokens; this module only carries the *non-color* identity (short English
 * label + a distinct line-icon motif). Category is always communicated with a
 * text label too — never color alone (WCAG 1.4.1).
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

/* 금융 서비스 — layered coins / chart */
function FinanceIcon(props: IconProps) {
  return (
    <svg {...iconBase} {...props}>
      <path d="M4 20h16" />
      <rect x="5" y="12" width="3.4" height="6" rx="1" />
      <rect x="10.3" y="8" width="3.4" height="10" rx="1" />
      <rect x="15.6" y="4.5" width="3.4" height="13.5" rx="1" />
    </svg>
  );
}

/* 플랫폼 — connected nodes */
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

/* 모바일 앱 — device */
function MobileIcon(props: IconProps) {
  return (
    <svg {...iconBase} {...props}>
      <rect x="7" y="3" width="10" height="18" rx="2.5" />
      <path d="M10.5 18h3" />
    </svg>
  );
}

/* 백오피스·자동화 — gear / automation */
function OpsIcon(props: IconProps) {
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
  "금융 서비스": { label: "Finance", Icon: FinanceIcon },
  플랫폼: { label: "Platform", Icon: PlatformIcon },
  "모바일 앱": { label: "Mobile", Icon: MobileIcon },
  "백오피스·자동화": { label: "Ops · Automation", Icon: OpsIcon },
};

export function getCategoryMeta(category: ProjectCategory): CategoryMeta {
  return CATEGORY_META[category];
}
