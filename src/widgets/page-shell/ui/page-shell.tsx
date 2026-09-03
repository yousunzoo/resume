import Link from "next/link";
import type { ReactNode } from "react";
import { profile } from "@/entities/profile";
import { ArrowLeftIcon, SkipLink, Text } from "@/shared/ui";

/**
 * Portfolio shell — a lean top header (mini identity + back link) over a wide
 * single column. No resume sidebar here; the portfolio list & detail get the
 * full width. Monochrome, consistent with the résumé home.
 */
export function PageShell({
  backLabel = "이력서로 돌아가기",
  backHref = "/",
  children,
}: {
  backLabel?: string;
  backHref?: string;
  children: ReactNode;
}) {
  return (
    <>
      <SkipLink />
      <div className="min-h-screen bg-canvas">
        {/* Top header — mini identity + back link */}
        <header className="sticky top-0 z-30 border-b border-line bg-paper/85 backdrop-blur-sm">
          <div className="mx-auto flex max-w-[1080px] items-center justify-between gap-4 px-6 py-4 sm:px-9 lg:px-12">
            <Link
              href="/"
              className="group flex items-baseline gap-2.5"
              aria-label={`${profile.name} 이력서 홈으로`}
            >
              <Text
                as="span"
                variant="body"
                weight="bold"
                className="tracking-tight text-ink"
              >
                {profile.name}
              </Text>
              <Text
                as="span"
                variant="eyebrow"
                weight="semibold"
                className="hidden uppercase tracking-[0.18em] text-ink-faint sm:inline"
              >
                {profile.title}
              </Text>
            </Link>

            <Link
              href={backHref}
              className="no-print group -mr-2 inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2 py-1.5 text-ink-muted transition-colors duration-200 hover:bg-paper-3 hover:text-ink"
            >
              <ArrowLeftIcon
                width={15}
                height={15}
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              <Text as="span" variant="body-sm" weight="medium">
                {backLabel}
              </Text>
            </Link>
          </div>
        </header>

        {/* Wide single column */}
        <main
          id="main"
          className="mx-auto max-w-[1080px] px-6 py-12 sm:px-9 lg:px-12 lg:py-16"
        >
          {children}
        </main>
      </div>
    </>
  );
}
