import Image from "next/image";
import Link from "next/link";
import { profile, techStack, DEVLOG_URL } from "@/data/resume";
import {
  MailIcon,
  PhoneIcon,
  GithubIcon,
  BookIcon,
} from "@/components/icons";

/* Contact rows: email, phone, then external links from data. */
function contactRows() {
  const rows: {
    icon: React.ReactNode;
    label: string;
    value: string;
    href: string;
    external?: boolean;
  }[] = [
    {
      icon: <MailIcon />,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
  ];

  if (profile.phone) {
    rows.push({
      icon: <PhoneIcon />,
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/[^0-9+]/g, "")}`,
    });
  }

  for (const link of profile.links) {
    const isGithub = link.label.toLowerCase().includes("github");
    rows.push({
      icon: isGithub ? <GithubIcon /> : <BookIcon />,
      label: link.label,
      value: link.href.replace(/^https?:\/\//, "").replace(/\/$/, ""),
      href: link.href,
      external: true,
    });
  }

  return rows;
}

export function ResumeSidebar() {
  const rows = contactRows();

  return (
    <aside
      aria-label="프로필 · 연락처 · 기술"
      className="border-b border-line bg-paper lg:border-b-0 lg:border-r"
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:overflow-y-auto">
        <div className="flex h-full flex-col gap-10 px-7 py-9 lg:px-8 lg:pt-12 lg:pb-40">
          {/* Identity */}
          <div className="print-block">
            {profile.image && (
              <div className="relative mb-6 h-24 w-24 overflow-hidden rounded-full ring-1 ring-line-strong lg:h-28 lg:w-28">
                <Image
                  src={profile.image}
                  alt={`${profile.name} 프로필 사진`}
                  fill
                  sizes="(min-width: 1024px) 112px, 96px"
                  className="object-cover grayscale"
                  priority
                />
              </div>
            )}
            <h1 className="text-[2rem] font-extrabold leading-[1.05] tracking-tight text-ink lg:text-[2.35rem]">
              {profile.name}
            </h1>
            <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
              {profile.title}
            </p>
            <p className="mt-5 border-t border-line pt-5 text-[13px] leading-relaxed text-ink-muted">
              {profile.tagline}
            </p>
          </div>

          {/* Contact */}
          <section aria-labelledby="side-contact">
            <SidebarHeading id="side-contact">Contact</SidebarHeading>
            <ul className="mt-3.5 space-y-0.5">
              {rows.map((row) => (
                <li key={row.label}>
                  <a
                    href={row.href}
                    {...(row.external
                      ? {
                          target: "_blank",
                          rel: "noopener noreferrer",
                          "aria-label": `${row.label} (새 탭에서 열기)`,
                        }
                      : { "aria-label": `${row.label}: ${row.value}` })}
                    className="group -mx-2 flex min-h-11 items-center gap-3 rounded-lg px-2 py-2 transition-colors duration-200 hover:bg-paper-3"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line text-ink-faint transition-colors duration-200 group-hover:border-ink group-hover:text-ink">
                      {row.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-semibold uppercase tracking-widest text-ink-faint">
                        {row.label}
                      </span>
                      <span className="block truncate text-[13px] text-ink-body transition-colors duration-200 group-hover:text-ink">
                        {row.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Tech stack */}
          <section aria-labelledby="side-skills">
            <SidebarHeading id="side-skills">Skills</SidebarHeading>
            <div className="mt-4 space-y-4">
              {techStack.map((group) => (
                <div key={group.category} className="print-block">
                  <h3 className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
                    {group.category}
                  </h3>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="cursor-default rounded-md border border-line bg-paper px-2 py-1 text-[12px] font-medium text-ink-body transition-colors duration-200 hover:border-ink hover:text-ink"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Footer link */}
          <div className="no-print mt-auto border-t border-line pt-5">
            <Link
              href={DEVLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-faint transition-colors hover:text-ink"
            >
              개발 기록 보기
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="border-b border-ink pb-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-ink"
    >
      {children}
    </h2>
  );
}
