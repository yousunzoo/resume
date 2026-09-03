import { cn } from "@/shared/lib/cn";
import { Text } from "@/shared/ui/text";

export interface NumberedListItem {
  title: string;
  body?: string;
}

interface NumberedListProps {
  items: NumberedListItem[];
  /** strong = 잉크 인덱스, muted = 흐린 인덱스. */
  tone?: "muted" | "strong";
  as?: "ol" | "ul";
  /** 시작 번호(기본 1). */
  start?: number;
}

/**
 * 01/02… 제로패딩 인덱스 + 굵은 제목 + 선택적 본문.
 * (담당영역 / Key Impact / Decisions / Results 의 4중 중복 패턴을 통합.)
 */
export function NumberedList({
  items,
  tone = "muted",
  as: Tag = "ol",
  start = 1,
}: NumberedListProps) {
  const indexClass = tone === "strong" ? "text-ink" : "text-ink/40";

  return (
    <Tag className="space-y-0">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-4 border-t border-line py-5 first:border-t-0 first:pt-0"
        >
          <Text
            as="span"
            variant="heading"
            tnum
            aria-hidden
            className={cn("shrink-0", indexClass)}
          >
            {String(start + i).padStart(2, "0")}
          </Text>
          <div className="min-w-0">
            <Text as="h3" variant="body-sm" weight="bold" className="text-ink">
              {item.title}
            </Text>
            {item.body && (
              <Text variant="body-sm" className="mt-2 text-ink-body">
                {item.body}
              </Text>
            )}
          </div>
        </li>
      ))}
    </Tag>
  );
}
