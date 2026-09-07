import "server-only";
import { NextResponse } from "next/server";
import { notion, resolveDataSourceId, notionEnabled } from "@/entities/project/api/notion-client";

// 진단 전용 — 시크릿 값은 노출하지 않고 존재 여부/마스킹만 반환한다.
// Vercel 런타임에서 어느 fallback 경로로 빠지는지 증거를 잡기 위한 임시 엔드포인트.
export const dynamic = "force-dynamic";

const mask = (v?: string) =>
  v ? `${v.slice(0, 4)}…${v.slice(-4)} (len:${v.length})` : null;

export async function GET() {
  const env = {
    NOTION_TOKEN: Boolean(process.env.NOTION_TOKEN),
    NOTION_TOKEN_prefix: process.env.NOTION_TOKEN?.slice(0, 4) ?? null,
    NOTION_DATA_SOURCE_ID: Boolean(process.env.NOTION_DATA_SOURCE_ID),
    NOTION_DATA_SOURCE_ID_masked: mask(process.env.NOTION_DATA_SOURCE_ID),
    NOTION_DATABASE_ID: Boolean(process.env.NOTION_DATABASE_ID),
    NOTION_DATABASE_ID_masked: mask(process.env.NOTION_DATABASE_ID),
    notionEnabled: notionEnabled(),
    VERCEL_ENV: process.env.VERCEL_ENV ?? null,
  };

  if (!notionEnabled()) {
    return NextResponse.json({ ok: false, path: "!notionEnabled", env }, { status: 200 });
  }

  try {
    const dataSourceId = await resolveDataSourceId();
    const res = await notion().dataSources.query({ data_source_id: dataSourceId });
    const first = res.results[0] as { properties?: Record<string, unknown> } | undefined;
    return NextResponse.json(
      {
        ok: true,
        env,
        resolvedDataSourceId: mask(dataSourceId),
        resultCount: res.results.length,
        firstPropertyKeys: first?.properties ? Object.keys(first.properties) : [],
      },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        path: "query-threw",
        env,
        error: {
          name: (err as Error)?.name,
          message: (err as Error)?.message,
          code: (err as { code?: string })?.code,
        },
      },
      { status: 200 },
    );
  }
}
