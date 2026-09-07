export interface RichSpan {
  text: string;
  bold: boolean;
  code: boolean;
  href: string | null;
}

export type NotionBlock =
  | { type: "heading2"; rich: RichSpan[] }
  | { type: "heading3"; rich: RichSpan[] }
  | { type: "paragraph"; rich: RichSpan[] }
  | { type: "bulleted_list"; items: RichSpan[][] }
  | { type: "callout"; icon: string | null; rich: RichSpan[]; body: RichSpan[][] }
  | { type: "table"; hasHeader: boolean; rows: RichSpan[][][] }
  | { type: "code"; language: string; text: string };
