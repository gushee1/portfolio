"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type IconProps = {
  className?: string;
};

function LinkedinIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M7.2 9.5v8.2M7.2 6.4v.1M11 17.7v-4.9c0-2.1 1.2-3.4 3-3.4 1.7 0 2.8 1.2 2.8 3.4v4.9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M5.3 21h13.4c1.3 0 2.3-1 2.3-2.3V5.3C21 4 20 3 18.7 3H5.3C4 3 3 4 3 5.3v13.4C3 20 4 21 5.3 21Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function MailIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M4.5 7.5 12 13l7.5-5.5M6.2 19h11.6c1.5 0 2.7-1.2 2.7-2.7V7.7C20.5 6.2 19.3 5 17.8 5H6.2C4.7 5 3.5 6.2 3.5 7.7v8.6C3.5 17.8 4.7 19 6.2 19Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ResumeIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M8 3.8h5.2L18 8.6v11.6H8c-1.1 0-2-.9-2-2V5.8c0-1.1.9-2 2-2Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path d="M13 4v5h5M9.5 13h5M9.5 16h4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

function ToggleIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M8 6h8M8 12h8M8 18h8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

const profileLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: LinkedinIcon
  },
  {
    label: "Email",
    href: "mailto:hello@example.com",
    icon: MailIcon
  },
  {
    label: "Resume",
    href: "/resume",
    icon: ResumeIcon
  }
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayName, setDisplayName] = useState("W.G.");

  useEffect(() => {
    if (!isExpanded) {
      setDisplayName("W.G.");
      return;
    }

    const fullName = "Will Gushée";
    setDisplayName("W");

    let nextLength = 2;
    const timer = window.setInterval(() => {
      setDisplayName(fullName.slice(0, nextLength));
      nextLength += 1;

      if (nextLength > fullName.length + 1) {
        window.clearInterval(timer);
      }
    }, 55);

    return () => window.clearInterval(timer);
  }, [isExpanded]);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 flex flex-col border-r border-[var(--line)] bg-[var(--background)] transition-[width] duration-300 ${
        isExpanded ? "w-72" : "w-20"
      }`}
    >
      <div className="flex h-full flex-col px-4 py-5">
        <button
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          className="mb-8 flex h-10 w-10 items-center justify-center rounded border border-[var(--line)] text-[var(--muted)] transition hover:text-[var(--foreground)]"
          type="button"
          onClick={() => setIsExpanded((current) => !current)}
        >
          <ToggleIcon className="h-5 w-5" />
        </button>

        <Link
          className={`relative mb-3 block overflow-hidden bg-[var(--line)] no-underline transition-[width,height,border-radius] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isExpanded ? "h-64 w-full" : "h-14 w-14"
          }`}
          style={{ borderRadius: isExpanded ? "4px" : "28px" }}
          href="/"
          aria-label="Home"
        >
          <Image
            src="/images/budapest_shot_web_head.jpg"
            alt="Profile portrait"
            fill
            sizes={isExpanded ? "256px" : "56px"}
            className={`object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isExpanded ? "scale-100" : "scale-110"
            }`}
            priority
          />
        </Link>

        <p
          className={`mb-6 min-h-5 text-sm font-medium uppercase text-[var(--muted)] transition-[text-align] duration-300 ${
            isExpanded ? "text-left" : "w-14 text-center"
          }`}
          aria-live="polite"
        >
          {displayName}
        </p>

        <div
          className={`overflow-hidden transition-[max-height,opacity,transform] duration-300 ${
            isExpanded ? "max-h-80 translate-y-0 opacity-100" : "max-h-0 -translate-y-2 opacity-0"
          }`}
        >
          <p className="mb-8 text-sm leading-6 text-[var(--muted)]">
            Developer focused on clear interfaces, useful tools, and software that feels calm under
            real use.
          </p>
        </div>

        <nav aria-label="Profile links" className="mt-auto flex flex-col gap-2">
          {profileLinks.map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <Icon className="h-5 w-5 shrink-0" />
                <span className={`${isExpanded ? "inline" : "sr-only"}`}>{item.label}</span>
              </>
            );
            const className =
              "flex h-11 items-center gap-3 rounded px-2 text-sm text-[var(--muted)] no-underline transition hover:text-[var(--foreground)]";

            if (item.href.startsWith("/")) {
              return (
                <Link key={item.label} className={className} href={item.href}>
                  {content}
                </Link>
              );
            }

            return (
              <a key={item.label} className={className} href={item.href}>
                {content}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
