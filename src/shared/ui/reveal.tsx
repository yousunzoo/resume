import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}

/**
 * 정적 콘텐츠 래퍼. 스크롤 리빌 애니메이션은 제거되어 요청 요소로 즉시 렌더한다.
 */
export function Reveal({ children, className, as = "div" }: RevealProps) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
}
