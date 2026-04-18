"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
    href: "https://www.linkedin.com/in/william-gushee/",
    icon: LinkedinIcon
  },
  {
    label: "Email",
    href: "mailto:wgushee@umich.edu",
    icon: MailIcon
  },
  {
    label: "Resume",
    href: "/resume",
    icon: ResumeIcon
  }
];

export function Sidebar() {
  const sidebarRef = useRef<HTMLElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayName, setDisplayName] = useState("W.G.");
  const [isTypingName, setIsTypingName] = useState(false);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!sidebarRef.current?.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isExpanded]);

  useEffect(() => {
    if (!isExpanded) {
      setDisplayName("W.G.");
      setIsTypingName(false);
      return;
    }

    const fullName = "Will Gushée";
    const frames = ["W.G", "W.", "W", ...Array.from({ length: fullName.length - 1 }, (_, index) =>
      fullName.slice(0, index + 2)
    )];

    let frameIndex = 0;
    let timer: number | undefined;
    const startDelay = window.setTimeout(() => {
      setIsTypingName(true);
      timer = window.setInterval(() => {
        setDisplayName(frames[frameIndex]);
        frameIndex += 1;

        if (frameIndex >= frames.length && timer) {
          window.clearInterval(timer);
          setIsTypingName(false);
        }
      }, 210);
    }, 600);

    return () => {
      window.clearTimeout(startDelay);

      if (timer) {
        window.clearInterval(timer);
      }

      setIsTypingName(false);
    };
  }, [isExpanded]);

  return (
    <aside
      ref={sidebarRef}
      className={`fixed inset-y-0 left-0 z-20 flex flex-col border-r border-[var(--line)] bg-[var(--background)] transition-[width] duration-300 ${
        isExpanded ? "w-72" : "w-20"
      }`}
    >
      <div
        className={`flex h-full flex-col px-4 py-5 transition-[align-items] duration-300 ${
          isExpanded ? "items-stretch" : "items-center"
        }`}
      >
        <button
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          className="mb-8 flex h-10 w-10 shrink-0 items-center justify-center rounded border border-[var(--line)] text-[var(--muted)] transition hover:text-[var(--foreground)]"
          type="button"
          onClick={() => setIsExpanded((current) => !current)}
        >
          <ToggleIcon className="h-5 w-5" />
        </button>

        <Link
          className={`relative mb-3 block shrink-0 overflow-hidden bg-[var(--line)] no-underline transition-[width,height,border-radius] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isExpanded ? "h-[clamp(8rem,30vh,16rem)] w-full" : "h-14 w-14"
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
          <span
            aria-hidden="true"
            className={`ml-1 inline-block h-[1em] w-[2px] align-[-0.15em] bg-current ${
              isTypingName ? "typing-caret opacity-100" : "opacity-0"
            }`}
          />
        </p>

        <div
          className={`overflow-hidden transition-[max-height,opacity,transform] duration-300 ${
            isExpanded ? "max-h-[28rem] translate-y-0 opacity-100" : "max-h-0 -translate-y-2 opacity-0"
          }`}
        >
          <p className="mb-8 text-sm leading-6 text-[var(--muted)]">
            Hi! I'm a software engineer currently based in Washington, D.C. I have interests in 
            video game development, but when I'm writing traditional software, I love working on
            developer-facing tools. I'm always trying out a new idea, so feel free to get in touch!
          </p>
        </div>

        <nav
          aria-label="Profile links"
          className={`flex flex-col gap-0.5 ${isExpanded ? "mt-10 w-full" : "mt-auto items-center"}`}
        >
          {profileLinks.map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <Icon className="h-5 w-5 shrink-0" />
                <span className={`${isExpanded ? "inline" : "sr-only"}`}>{item.label}</span>
              </>
            );
            const className =
              `flex h-9 items-center rounded text-sm text-[var(--muted)] no-underline transition hover:text-[var(--foreground)] ${
                isExpanded ? "w-full gap-3 px-2" : "w-10 justify-center px-0"
              }`;

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
