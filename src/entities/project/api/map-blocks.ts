import type { NotionBlock, RichSpan } from "../model/notion-block";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Raw = any;

export const mapRich = (rt: Raw[] = []): RichSpan[] =>
  rt.map((t) => ({
    text: t.plain_text ?? "",
    bold: Boolean(t.annotations?.bold),
    code: Boolean(t.annotations?.code),
    href: t.href ?? null,
  }));

export function mapBlocks(raw: Raw[]): NotionBlock[] {
  const out: NotionBlock[] = [];
  let bullets: RichSpan[][] | null = null;

  const flush = () => {
    if (bullets) {
      out.push({ type: "bulleted_list", items: bullets });
      bullets = null;
    }
  };

  for (const b of raw) {
    if (b.type === "bulleted_list_item") {
      bullets ??= [];
      bullets.push(mapRich(b.bulleted_list_item.rich_text));
      continue;
    }
    flush();
    switch (b.type) {
      case "heading_2":
        out.push({ type: "heading2", rich: mapRich(b.heading_2.rich_text) });
        break;
      case "heading_3":
        out.push({ type: "heading3", rich: mapRich(b.heading_3.rich_text) });
        break;
      case "paragraph": {
        const rich = mapRich(b.paragraph.rich_text);
        if (rich.some((r) => r.text.trim())) out.push({ type: "paragraph", rich });
        break;
      }
      case "callout":
        out.push({ type: "callout", icon: b.callout.icon?.emoji ?? null, rich: mapRich(b.callout.rich_text) });
        break;
      case "code":
        out.push({ type: "code", language: b.code.language ?? "", text: mapRich(b.code.rich_text).map((r) => r.text).join("") });
        break;
      case "table": {
        const rows: RichSpan[][][] = (b.children ?? []).map((r: Raw) =>
          (r.table_row?.cells ?? []).map((cell: Raw[]) => mapRich(cell))
        );
        out.push({ type: "table", hasHeader: Boolean(b.table.has_column_header), rows });
        break;
      }
      default:
        break;
    }
  }
  flush();
  return out;
}
