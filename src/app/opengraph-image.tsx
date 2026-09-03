import { ImageResponse } from "next/og";
import { profile } from "@/entities/profile";

// 공유(OG) 카드 이미지 — 프로필 사진이 스크래퍼에 잡히지 않도록 명시적으로 지정.
// ImageResponse 기본 폰트는 한글(CJK)을 렌더하지 못하므로 영문 텍스트만 사용한다.
export const alt = `${profile.title} Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 브랜드 팔레트 (globals.css와 일치)
const CANVAS = "#f6f6f4";
const PAPER = "#ffffff";
const INK = "#17181a";
const INK_BODY = "#33353a";
const INK_FAINT = "#767a82";
const LINE = "#cfcfca";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: CANVAS,
          padding: 64,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: PAPER,
            border: `1px solid ${LINE}`,
            borderRadius: 24,
            padding: 72,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 8,
              fontWeight: 700,
              textTransform: "uppercase",
              color: INK_FAINT,
            }}
          >
            Portfolio
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 108,
                fontWeight: 800,
                letterSpacing: -2,
                color: INK,
                lineHeight: 1.05,
              }}
            >
              {profile.title}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontSize: 34,
                color: INK_BODY,
              }}
            >
              React / Next.js / TypeScript / React Native
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: `1px solid ${LINE}`,
              paddingTop: 32,
              fontSize: 26,
              color: INK_FAINT,
            }}
          >
            <div style={{ display: "flex" }}>github.com/yousunzoo</div>
            <div style={{ display: "flex" }}>yousunzoo.dev</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
