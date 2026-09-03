import type { ElementType, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

/** 타이포그래피 역할(role) 유니온. globals.css 의 --text-* 토큰과 1:1 매핑. */
export type TextVariant =
  | "display"
  | "title-1"
  | "title-2"
  | "title-3"
  | "heading"
  | "lead"
  | "body"
  | "body-sm"
  | "caption"
  | "eyebrow"
  | "overline";

/**
 * 정적 클래스 맵 — Tailwind 가 스캔할 수 있도록 전체 클래스명을 리터럴로 둔다.
 * `text-${variant}` 같은 동적 조합은 절대 사용하지 않는다.
 */
const VARIANT_CLASS: Record<TextVariant, string> = {
  display: "text-display",
  "title-1": "text-title-1",
  "title-2": "text-title-2",
  "title-3": "text-title-3",
  heading: "text-heading",
  lead: "text-lead",
  body: "text-body",
  "body-sm": "text-body-sm",
  caption: "text-caption",
  eyebrow: "text-eyebrow",
  overline: "text-overline",
};

/** weight prop → font-* 유틸. role 이 정의한 weight 를 덮어쓴다. */
export type TextWeight = "normal" | "medium" | "semibold" | "bold" | "extrabold";

const WEIGHT_CLASS: Record<TextWeight, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

interface TextOwnProps {
  as?: ElementType;
  variant?: TextVariant;
  weight?: TextWeight;
  /** tabular-nums (`.tnum`) 적용 — 수치/날짜 정렬용. */
  tnum?: boolean;
  className?: string;
  children?: ReactNode;
}

type TextProps = TextOwnProps & Record<string, unknown>;

export function Text({
  as: Tag = "p",
  variant = "body",
  weight,
  tnum = false,
  className,
  children,
  ...rest
}: TextProps) {
  return (
    <Tag
      className={cn(
        VARIANT_CLASS[variant],
        weight && WEIGHT_CLASS[weight],
        tnum && "tnum",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

type HeadingProps = Omit<TextOwnProps, "as"> &
  Record<string, unknown> & {
    as: "h1" | "h2" | "h3" | "h4";
  };

/** 제목 전용. as 를 h1~h4 로 제한하고 variant 기본값을 title-2 로 둔다. */
export function Heading({ as, variant = "title-2", ...rest }: HeadingProps) {
  return <Text as={as} variant={variant} {...rest} />;
}
