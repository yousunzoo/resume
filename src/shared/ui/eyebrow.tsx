import type { ElementType, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { Text } from "@/shared/ui/text";

interface EyebrowProps {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}

/**
 * 섹션 위에 얹는 소형 라벨. eyebrow 역할 토큰 + 대문자 + faint 잉크.
 * (uppercase 는 font-size 토큰이 담을 수 없어 컴포넌트에서 baked 한다.)
 */
export function Eyebrow({ as = "p", className, children }: EyebrowProps) {
  return (
    <Text as={as} variant="eyebrow" className={cn("uppercase text-ink-faint", className)}>
      {children}
    </Text>
  );
}
