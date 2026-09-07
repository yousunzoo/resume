import Image from "next/image";
import Link from "next/link";
import { profile, techStack, focusAreas } from "@/entities/profile";
import { site } from "@/shared/config/site";
import {
  MailIcon,
  PhoneIcon,
  GithubIcon,
  BookIcon,
  Heading,
  SectionHeading,
  Text,
} from "@/shared/ui";

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
        <div className="flex h-full flex-col gap-10 px-7 py-9 lg:px-8 lg:pt-12 lg:pb-40 print:gap-6 print:px-0 print:py-0">
          {/* Identity */}
          <div className="print-block">
            {profile.image && (
              <div className="relative mb-6 h-24 w-24 overflow-hidden rounded-full ring-1 ring-line-strong lg:h-28 lg:w-28">
                <Image
                  src={profile.image}
                  alt={`${profile.name} 프로필 사진`}
                  fill
                  sizes="(min-width: 1024px) 112px, 96px"
                  className="object-cover"
                  priority
                />
              </div>
            )}
            <Heading
              as="h1"
              variant="title-1"
              weight="extrabold"
              className="leading-[1.05] tracking-tight text-ink lg:text-display"
            >
              {profile.name}
            </Heading>
            <Text
              variant="caption"
              weight="semibold"
              className="mt-2 uppercase tracking-[0.22em] text-ink-muted"
            >
              {profile.title}
            </Text>
            <Text
              variant="body-sm"
              className="mt-5 border-t border-line pt-5 leading-relaxed text-ink-muted"
            >
              {profile.tagline}
            </Text>
          </div>

          {/* Focus */}
          <section aria-labelledby="side-focus" className="print-block print:hidden">
            <SectionHeading variant="sidebar" id="side-focus" title="Focus" />
            <ul className="mt-3.5 flex flex-wrap gap-x-2 gap-y-1.5">
              {focusAreas.map((area, i) => (
                <Text
                  as="li"
                  key={area}
                  variant="body-sm"
                  weight="medium"
                  className="flex items-center gap-2 text-ink-body"
                >
                  {i > 0 && (
                    <span aria-hidden className="text-ink-faint">
                      ·
                    </span>
                  )}
                  {area}
                </Text>
              ))}
            </ul>
          </section>

          {/* Contact + Skills — 인쇄 시 두 섹션을 좌우 2열 그리드로 묶어
              세로 높이를 줄인다. 화면에서는 contents 로 녹아 기존 flex 흐름 유지. */}
          <div className="contents print:grid print:grid-cols-2 print:items-start print:gap-x-8">
            {/* Contact */}
            <section aria-labelledby="side-contact">
            <SectionHeading
              variant="sidebar"
              id="side-contact"
              title="Contact"
            />
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
                    className="group -mx-2 flex min-h-11 items-center gap-3 rounded-lg px-2 py-2 transition-colors duration-200 hover:bg-paper-3 print:mx-0 print:min-h-0 print:px-0 print:py-1.5"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line text-ink-faint transition-colors duration-200 group-hover:border-ink group-hover:text-ink">
                      {row.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <Text
                        as="span"
                        variant="overline"
                        weight="semibold"
                        className="block uppercase tracking-widest text-ink-faint"
                      >
                        {row.label}
                      </Text>
                      <Text
                        as="span"
                        variant="body-sm"
                        className="block truncate text-ink-body transition-colors duration-200 group-hover:text-ink"
                      >
                        {row.value}
                      </Text>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Tech stack */}
          <section aria-labelledby="side-skills">
            <SectionHeading variant="sidebar" id="side-skills" title="Skills" />
            <div className="mt-4 space-y-4">
              {techStack.map((group) => (
                <div key={group.category} className="print-block">
                  <Text
                    as="h3"
                    variant="eyebrow"
                    weight="semibold"
                    className="uppercase tracking-wider text-ink-faint"
                  >
                    {group.category}
                  </Text>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <Text
                        as="li"
                        key={item}
                        variant="caption"
                        weight="medium"
                        className="cursor-default rounded-md border border-line bg-paper px-2 py-1 text-ink-body transition-colors duration-200 hover:border-ink hover:text-ink"
                      >
                        {item}
                      </Text>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            </section>
          </div>

          {/* Footer link */}
          <div className="no-print mt-auto border-t border-line pt-5">
            <Link
              href={site.devlogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-ink-faint transition-colors hover:text-ink"
            >
              <Text as="span" variant="caption" weight="medium">
                개발 기록 보기
              </Text>
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
