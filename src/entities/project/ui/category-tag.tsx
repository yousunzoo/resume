import { Text } from "@/shared/ui";
import type { ProjectCategory } from "../model/types";
import { getCategoryMeta } from "../lib/category-meta";

/**
 * Category as a small labeled tag with its line-icon — the Notion-style select
 * tag used in the portfolio table row. Icon + KO category name in a paper-3
 * rounded capsule. Text label always accompanies the icon (WCAG 1.4.1).
 */
export function CategoryTag({ category }: { category: ProjectCategory }) {
  const meta = getCategoryMeta(category);

  return (
    <Text
      as="span"
      variant="caption"
      weight="medium"
      className="inline-flex max-w-full items-center gap-1 truncate rounded-md bg-paper-3 px-2 py-0.5 text-ink-body"
    >
      <meta.Icon width={12} height={12} className="shrink-0 text-ink-faint" />
      {category}
    </Text>
  );
}
