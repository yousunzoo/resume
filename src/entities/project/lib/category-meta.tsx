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

/* 클라이언트 SI — connected nodes (client delivery / platforms) */
function ClientSIIcon(props: IconProps) {
  return (
    <svg {...iconBase} {...props}>
      <circle cx="6" cy="6" r="2.3" />
      <circle cx="18" cy="7" r="2.3" />
      <circle cx="12" cy="18" r="2.3" />
      <path d="M7.6 7.6 10.6 16M16.7 8.8 13.4 16M8 6.4h8" />
    </svg>
  );
}

/* 자체 도구·인프라 — gear / automation */
function ToolingIcon(props: IconProps) {
  return (
    <svg {...iconBase} {...props}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3v2.4M12 18.6V21M4.2 7.5l2 1.2M17.8 15.3l2 1.2M4.2 16.5l2-1.2M17.8 8.7l2-1.2" />
    </svg>
  );
}

/* 개인·학습 — open book / spark */
function LearningIcon(props: IconProps) {
  return (
    <svg {...iconBase} {...props}>
      <path d="M12 6c-1.8-1.3-4-1.8-6.5-1.6v11c2.5-.2 4.7.3 6.5 1.6 1.8-1.3 4-1.8 6.5-1.6v-11C16 4.2 13.8 4.7 12 6z" />
      <path d="M12 6v11" />
    </svg>
  );
}

export interface CategoryMeta {
  /** Short EN label shown alongside the KO category name. */
  label: string;
  Icon: (props: IconProps) => React.JSX.Element;
}

export const CATEGORY_META: Record<ProjectCategory, CategoryMeta> = {
  "클라이언트 SI": { label: "Client SI", Icon: ClientSIIcon },
  "자체 도구·인프라": { label: "Tooling · Infra", Icon: ToolingIcon },
  "개인·학습": { label: "Personal · Learning", Icon: LearningIcon },
};

export function getCategoryMeta(category: ProjectCategory): CategoryMeta {
  return CATEGORY_META[category];
}
