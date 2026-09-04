import "server-only";
import { Client } from "@notionhq/client";

// @notionhq/client v5 — 데이터소스(collection) 단위로 쿼리한다.
// (v5에서 databases.query 는 제거되고 dataSources.query 로 대체되었다.)
// env 는 NOTION_DATA_SOURCE_ID(우선) 또는 NOTION_DATABASE_ID(자동 해석)를 받는다.
export const notionEnabled = () =>
  Boolean(
    process.env.NOTION_TOKEN &&
      (process.env.NOTION_DATA_SOURCE_ID || process.env.NOTION_DATABASE_ID),
  );

export const notion = () => new Client({ auth: process.env.NOTION_TOKEN });

let cachedDataSourceId: string | undefined;

// data_source_id 를 직접 지정했으면 그대로, database id 만 있으면
// databases.retrieve 로 첫 데이터소스를 해석해 캐시한다(인스턴스 수명 동안 재사용).
export async function resolveDataSourceId(): Promise<string> {
  if (process.env.NOTION_DATA_SOURCE_ID) return process.env.NOTION_DATA_SOURCE_ID;
  if (cachedDataSourceId) return cachedDataSourceId;

  const db = await notion().databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID as string,
  });
  const id = (db as { data_sources?: Array<{ id: string }> }).data_sources?.[0]?.id;
  if (!id) throw new Error("Notion 데이터베이스에서 data source를 찾을 수 없습니다.");
  cachedDataSourceId = id;
  return id;
}
