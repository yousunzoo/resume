import { describe, it, expect } from "vitest";
import { mapRich, mapBlocks } from "./map-blocks";

describe("mapRich", () => {
  it("annotations(bold/link)를 RichSpan으로", () => {
    expect(
      mapRich([
        { plain_text: "굵게", annotations: { bold: true, code: false }, href: null },
        { plain_text: "링크", annotations: { bold: false, code: false }, href: "https://x" },
      ])
    ).toEqual([
      { text: "굵게", bold: true, code: false, href: null },
      { text: "링크", bold: false, code: false, href: "https://x" },
    ]);
  });
});

describe("mapBlocks", () => {
  it("연속 bulleted_list_item을 하나의 bulleted_list로 병합", () => {
    const raw = [
      { type: "bulleted_list_item", bulleted_list_item: { rich_text: [{ plain_text: "a", annotations: {}, href: null }] } },
      { type: "bulleted_list_item", bulleted_list_item: { rich_text: [{ plain_text: "b", annotations: {}, href: null }] } },
    ];
    const out = mapBlocks(raw as never);
    expect(out).toHaveLength(1);
    expect(out[0].type).toBe("bulleted_list");
  });
  it("heading_2 → heading2", () => {
    const raw = [{ type: "heading_2", heading_2: { rich_text: [{ plain_text: "제목", annotations: {}, href: null }] } }];
    expect(mapBlocks(raw as never)[0].type).toBe("heading2");
  });
});
