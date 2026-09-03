import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { Eyebrow } from "@/shared/ui/eyebrow";
import { Heading, Text } from "@/shared/ui/text";

interface SectionHeadingProps {
  /**
   * - "main":    메인 컬럼 섹션 제목. eyebrow(대문자 라벨) 위 + title-2 제목(id/scroll-mt).
   * - "detail":  프로젝트 상세 섹션. 좌측 KO 제목(title-3) + 우측 EN 대문자 라벨, 하단 헤어라인.
   * - "sidebar": 사이드바 소제목. 대문자 소형 + 하단 border-ink 규칙.
   */
  variant: "main" | "detail" | "sidebar";
  id?: string;
  /** "main" 전용 상단 eyebrow 라벨. */
  eyebrow?: string;
  /** 주 제목 텍스트. main/sidebar = 그대로, detail = 좌측 KO 제목. */
  title: string;
  /** "detail" 전용 우측 EN 대문자 라벨. */
  en?: string;
  children?: ReactNode;
}

/**
 * 세 가지 섹션 제목 패턴을 variant 로 통합.
 * (ui.tsx SectionTitle / ProjectDetail Section / ResumeSidebar SidebarHeading)
 */
export function SectionHeading({
  variant,
  id,
  eyebrow,
  title,
  en,
  children,
}: SectionHeadingProps) {
  if (variant === "main") {
    return (
      <div className="mb-7">
        {eyebrow && <Eyebrow className="mb-2">{eyebrow}</Eyebrow>}
        <Heading as="h2" variant="title-2" id={id} className="scroll-mt-24 text-ink">
          {title}
        </Heading>
        {children}
      </div>
    );
  }

  if (variant === "detail") {
    return (
      <div className="mb-5 flex items-baseline justify-between gap-3 border-b border-line pb-2.5">
        <Heading as="h2" variant="title-3" id={id} className="text-ink">
          {title}
        </Heading>
        {en && (
          <Text
            as="span"
            variant="eyebrow"
            weight="semibold"
            className="uppercase tracking-[0.16em] text-ink-faint"
          >
            {en}
          </Text>
        )}
      </div>
    );
  }

  // sidebar
  return (
    <Heading
      as="h2"
      variant="eyebrow"
      id={id}
      className={cn(
        "border-b border-ink pb-1.5 uppercase tracking-[0.18em] text-ink"
      )}
    >
      {title}
    </Heading>
  );
}
