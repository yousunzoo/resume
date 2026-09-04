import { Fragment } from "react";
import type { NotionBlock, RichSpan } from "@/entities/project";
import { DotIcon, Text } from "@/shared/ui";
import { RichText } from "./rich-text";

/**
 * Notion 페이지 본문 블록 → 디자인 시스템 렌더. 흑백 톤·타이포 역할토큰을
 * 유지하고, 매핑되지 않는 블록은 안전하게 건너뛴다. mermaid 코드블록은 1차로
 * 스타일된 <pre> 로 표시한다.
 */
export function NotionBlocks({ blocks }: { blocks: NotionBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => (
        <Fragment key={i}>{renderBlock(block)}</Fragment>
      ))}
    </div>
  );
}

function renderBlock(block: NotionBlock) {
  switch (block.type) {
    case "heading2":
      return (
        <Text
          as="h2"
          variant="heading"
          weight="bold"
          className="mt-10 border-b border-line pb-2 leading-snug text-ink first:mt-0"
        >
          <RichText spans={block.rich} />
        </Text>
      );
    case "heading3":
      return (
        <Text
          as="h3"
          variant="title-3"
          weight="semibold"
          className="mt-6 leading-snug text-ink"
        >
          <RichText spans={block.rich} />
        </Text>
      );
    case "paragraph":
      return (
        <Text as="p" className="leading-relaxed text-ink-body">
          <RichText spans={block.rich} />
        </Text>
      );
    case "bulleted_list":
      return (
        <ul className="space-y-2.5">
          {block.items.map((item, i) => (
            <Text
              as="li"
              key={i}
              variant="body-sm"
              className="flex items-start gap-2.5 leading-relaxed text-ink-body"
            >
              <DotIcon className="mt-[7px] shrink-0 text-ink" />
              <span>
                <RichText spans={item} />
              </span>
            </Text>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div className="rounded-xl border border-line bg-paper-2 p-5">
          <Text
            as="p"
            variant="body-sm"
            className="whitespace-pre-line leading-relaxed text-ink-body"
          >
            <RichText spans={block.rich} />
          </Text>
        </div>
      );
    case "table":
      return <BlockTable hasHeader={block.hasHeader} rows={block.rows} />;
    case "code":
      return (
        <pre className="overflow-x-auto rounded-xl border border-line bg-paper-2 p-4">
          <Text
            as="code"
            variant="caption"
            className="whitespace-pre font-mono text-ink-body"
          >
            {block.text}
          </Text>
        </pre>
      );
    default:
      return null;
  }
}

/* Notion 표 — 개선 전후 표와 같은 흑백 hairline 스타일 재사용. */
function BlockTable({
  hasHeader,
  rows,
}: {
  hasHeader: boolean;
  rows: RichSpan[][][];
}) {
  if (rows.length === 0) return null;
  const head = hasHeader ? rows[0] : null;
  const body = hasHeader ? rows.slice(1) : rows;

  return (
    <div className="-mx-1 overflow-x-auto sm:mx-0">
      <table className="w-full min-w-[460px] border-collapse text-left">
        {head && (
          <thead>
            <tr className="border-b-2 border-ink">
              {head.map((cell, i) => (
                <Text
                  as="th"
                  key={i}
                  variant="eyebrow"
                  weight="bold"
                  className="px-4 py-3 align-bottom uppercase tracking-wider text-ink-faint first:pl-0"
                >
                  <RichText spans={cell} />
                </Text>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri} className="border-b border-line">
              {row.map((cell, ci) => (
                <Text
                  as={ci === 0 ? "th" : "td"}
                  key={ci}
                  variant="body-sm"
                  weight={ci === 0 ? "semibold" : "normal"}
                  scope={ci === 0 ? "row" : undefined}
                  className={`px-4 py-3 align-top first:pl-0 ${
                    ci === 0 ? "text-ink" : "text-ink-muted"
                  }`}
                >
                  <RichText spans={cell} />
                </Text>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
