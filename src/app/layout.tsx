import type { Metadata } from "next";
import "./globals.css";
import { pretendard } from "@/shared/fonts/pretendard";
import { profile } from "@/entities/profile";

export const metadata: Metadata = {
  title: `${profile.name} · ${profile.title}`,
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} · ${profile.title}`,
    description: profile.tagline,
    type: "profile",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${pretendard.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
