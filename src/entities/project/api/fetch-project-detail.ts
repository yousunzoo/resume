import "server-only";
import type { ProjectDetail } from "../model/types";
import { notion, resolveDataSourceId, notionEnabled } from "./notion-client";
import { mapPropsToProject } from "./map";
import { mapBlocks } from "./map-blocks";

// 표(table)는 자식 table_row 를 합성해야 하므로 has_children 인 경우만 재귀 조회한다.
async function listChildren(blockId: string): Promise<unknown[]> {
  const client = notion();
  const acc: unknown[] = [];
  let cursor: string | undefined;
  do {
    const res = await client.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    });
    for (const b of res.results as Array<
      Record<string, unknown> & { id: string; has_children?: boolean; type?: string }
    >) {
      if (b.has_children && b.type === "table") {
        (b as Record<string, unknown>).children = await listChildren(b.id);
      }
      acc.push(b);
    }
    cursor = res.has_more ? res.next_cursor ?? undefined : undefined;
  } while (cursor);
  return acc;
}

export async function fetchProjectDetail(slug: string): Promise<ProjectDetail | null> {
  if (!notionEnabled()) return null;
  try {
    const res = await notion().dataSources.query({
      data_source_id: await resolveDataSourceId(),
      filter: { property: "Slug", rich_text: { equals: slug } },
    });
    const page = res.results[0];
    if (!page) return null;
    const card = mapPropsToProject(page as never);
    const raw = await listChildren((page as { id: string }).id);
    return { ...card, blocks: mapBlocks(raw as never) };
  } catch (err) {
    console.warn(`[notion] fetchProjectDetail(${slug}) 실패`, err);
    return null;
  }
}
