import { describe, it, expect } from "vitest";
import { splitTech, parseFeatured, mapPropsToProject } from "./map";

describe("splitTech", () => {
  it("· 구분 문자열을 배열로 나눈다", () => {
    expect(splitTech("React · Next.js · TypeScript")).toEqual(["React", "Next.js", "TypeScript"]);
  });
  it("빈 값은 빈 배열", () => {
    expect(splitTech("")).toEqual([]);
  });
});

describe("parseFeatured", () => {
  it("체크됨 → true", () => expect(parseFeatured(true)).toBe(true));
  it("null → false", () => expect(parseFeatured(null)).toBe(false));
});

describe("mapPropsToProject", () => {
  it("Notion page 속성을 Project로 매핑한다", () => {
    const page = {
      properties: {
        Project: { type: "title", title: [{ plain_text: "뱅크몰" }] },
        Category: { type: "select", select: { name: "클라이언트 SI" } },
        Featured: { type: "checkbox", checkbox: true },
        Order: { type: "number", number: 1 },
        Period: { type: "rich_text", rich_text: [{ plain_text: "2024.02 – 2024.03" }] },
        Role: { type: "rich_text", rich_text: [{ plain_text: "개발" }] },
        Tech: { type: "rich_text", rich_text: [{ plain_text: "React · Next.js" }] },
        Headline: { type: "rich_text", rich_text: [{ plain_text: "요약" }] },
        "Key Result": { type: "rich_text", rich_text: [{ plain_text: "성과" }] },
        Slug: { type: "rich_text", rich_text: [{ plain_text: "bankmall-mortgage-flow" }] },
        Tags: { type: "multi_select", multi_select: [{ name: "금융" }, { name: "IME" }] },
      },
    };
    expect(mapPropsToProject(page as never)).toEqual({
      slug: "bankmall-mortgage-flow",
      title: "뱅크몰",
      category: "클라이언트 SI",
      featured: true,
      order: 1,
      period: "2024.02 – 2024.03",
      role: "개발",
      tech: ["React", "Next.js"],
      headline: "요약",
      keyResult: "성과",
      tags: ["금융", "IME"],
    });
  });
});
