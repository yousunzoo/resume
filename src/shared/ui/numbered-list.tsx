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
  /**
   * true(기본) = 항목 사이 헤어라인 + py-5 + heading 크기 인덱스 (Decisions 스타일).
   * false = 컴팩트: 보더 없음 + space-y-3.5 + 소형 인덱스 (담당영역 / Key Impact 스타일).
   */
  divided?: boolean;
  /** 인덱스·제목 크기. md(기본) = heading 인덱스, sm = caption 인덱스. */
  size?: "sm" | "md";
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
  divided = true,
  size = "md",
}: NumberedListProps) {
  const indexClass = tone === "strong" ? "text-ink" : "text-ink/40";

  if (!divided) {
    // 컴팩트 스타일 — 담당 영역 / Key Impact
    return (
      <Tag className="space-y-3.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <Text
              as="span"
              variant="caption"
              weight="bold"
              tnum
              aria-hidden
              className={cn("shrink-0 pt-px", indexClass)}
            >
              {String(start + i).padStart(2, "0")}
            </Text>
            <div className="min-w-0">
              <Text
                as="h3"
                variant="body-sm"
                weight="semibold"
                className="leading-snug text-ink"
              >
                {item.title}
              </Text>
              {item.body && (
                <Text variant="body-sm" className="mt-1 text-ink-body">
                  {item.body}
                </Text>
              )}
            </div>
          </li>
        ))}
      </Tag>
    );
  }

  // 분할 스타일(기본) — Decisions
  const indexVariant = size === "sm" ? "caption" : "heading";
  return (
    <Tag className="space-y-0">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-4 border-t border-line py-5 first:border-t-0 first:pt-0"
        >
          <Text
            as="span"
            variant={indexVariant}
            weight="bold"
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
