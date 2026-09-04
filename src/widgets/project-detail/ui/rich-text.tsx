import type { RichSpan } from "@/entities/project";

/**
 * Notion rich_text(annotations) → React. bold/code/link 만 반영하고 색은
 * 흑백 톤을 유지한다(장식 색 없음).
 */
export function RichText({ spans }: { spans: RichSpan[] }) {
  return (
    <>
      {spans.map((s, i) => {
        if (s.href) {
          return (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              {s.text}
            </a>
          );
        }
        if (s.code) {
          return (
            <code
              key={i}
              className="rounded bg-paper-2 px-1 py-0.5 font-mono text-[0.88em] text-ink"
            >
              {s.text}
            </code>
          );
        }
        if (s.bold) {
          return (
            <strong key={i} className="font-semibold text-ink">
              {s.text}
            </strong>
          );
        }
        return <span key={i}>{s.text}</span>;
      })}
    </>
  );
}
