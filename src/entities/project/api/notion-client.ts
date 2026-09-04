import "server-only";
import { Client } from "@notionhq/client";

// @notionhq/client v5 — 데이터소스(collection) 단위로 쿼리한다.
// (v5에서 databases.query 는 제거되고 dataSources.query 로 대체되었다.)
export const notionEnabled = () =>
  Boolean(process.env.NOTION_TOKEN && process.env.NOTION_DATA_SOURCE_ID);

export const notion = () => new Client({ auth: process.env.NOTION_TOKEN });

export const dataSourceId = () => process.env.NOTION_DATA_SOURCE_ID as string;
