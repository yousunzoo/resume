import type { Metadata } from "next";
import "./globals.css";
import { pretendard } from "@/shared/fonts/pretendard";
import { profile } from "@/entities/profile";
import { site } from "@/shared/config/site";

const title = `${profile.name} · ${profile.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: profile.tagline,
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "React Native",
    "프론트엔드 개발자",
    "프론트엔드",
    "유선주",
    "이력서",
    "포트폴리오",
    "웹 개발자",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description: profile.tagline,
    type: "profile",
    url: site.url,
    siteName: title,
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${pretendard.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
