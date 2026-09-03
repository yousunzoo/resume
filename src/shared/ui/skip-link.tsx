import { cn } from "@/shared/lib/cn";

interface SkipLinkProps {
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

/** 키보드 포커스 시 나타나는 본문 바로가기 링크 (WCAG 2.4.1). */
export function SkipLink({
  href = "#main",
  className,
  children = "본문으로 건너뛰기",
}: SkipLinkProps) {
  return (
    <a href={href} className={cn("skip-link no-print", className)}>
      {children}
    </a>
  );
}
