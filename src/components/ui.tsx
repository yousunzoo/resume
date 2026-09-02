import type { ReactNode } from "react";

/* Section heading with an index label + rule, used down the main column. */
export function SectionTitle({
  eyebrow,
  title,
  id,
}: {
  eyebrow?: string;
  title: string;
  id?: string;
}) {
  return (
    <div className="mb-7">
      {eyebrow && (
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-faint">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="scroll-mt-24 text-[1.6rem] font-bold leading-tight tracking-tight text-ink"
      >
        {title}
      </h2>
    </div>
  );
}

/* Small keyword chip. */
export function Chip({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent";
}) {
  const styles =
    tone === "accent"
      ? "border-ink bg-paper text-ink"
      : "border-line bg-paper-2 text-ink-muted";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[12px] font-medium ${styles}`}
    >
      {children}
    </span>
  );
}

/* Hairline card surface. */
export function Card({
  children,
  className = "",
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-line bg-paper shadow-[var(--shadow-sm)] ${
        hover
          ? "transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-md)]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
