"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

function HomeIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M4.5 10.5 12 4l7.5 6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M6.5 9.8v8.7c0 .8.7 1.5 1.5 1.5h8c.8 0 1.5-.7 1.5-1.5V9.8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M10 20v-5h4v5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
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
    label: "Home",
    href: "/",
    icon: HomeIcon
  },
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

const fullTitle = "Will Gushée's Dev Portfolio";
const shortTitle = "Will Gushée";
const routeTitles: Record<string, string> = {
  "/": fullTitle,
  "/resume": "Will Gushée's Resume"
};

function getRouteTitle(pathname: string) {
  return routeTitles[pathname] ?? fullTitle;
}

export function Sidebar() {
  const pathname = usePathname();
  const routeTitle = getRouteTitle(pathname);
  const headerRef = useRef<HTMLElement>(null);
  const displayTitleRef = useRef(routeTitle);
  const activeFullTitleRef = useRef(routeTitle);
  const hasMountedRef = useRef(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayTitle, setDisplayTitle] = useState(routeTitle);
  const [isTypingTitle, setIsTypingTitle] = useState(false);

  useEffect(() => {
    displayTitleRef.current = displayTitle;
  }, [displayTitle]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      activeFullTitleRef.current = routeTitle;
      return;
    }

    const routeChanged = activeFullTitleRef.current !== routeTitle;
    const targetTitle = isExpanded ? shortTitle : routeTitle;
    const waypoints = routeChanged && !isExpanded ? [shortTitle, routeTitle] : [targetTitle];
    activeFullTitleRef.current = routeTitle;

    let timer: number | undefined;
    let nextValue = displayTitleRef.current;
    let waypointIndex = 0;

    if (nextValue === targetTitle && !routeChanged) {
      setIsTypingTitle(false);
      return;
    }

    setIsTypingTitle(true);

    timer = window.setInterval(() => {
      const waypoint = waypoints[waypointIndex];

      if (nextValue === waypoint) {
        waypointIndex += 1;

        if (waypointIndex >= waypoints.length) {
          if (timer) {
            window.clearInterval(timer);
          }
          setIsTypingTitle(false);
        }

        return;
      }

      if (nextValue.length > waypoint.length) {
        nextValue = nextValue.slice(0, -1);
      } else {
        nextValue = waypoint.slice(0, nextValue.length + 1);
      }

      displayTitleRef.current = nextValue;
      setDisplayTitle(nextValue);
    }, 80);

    return () => {
      if (timer) {
        window.clearInterval(timer);
      }
      setIsTypingTitle(false);
    };
  }, [isExpanded, routeTitle]);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isExpanded]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--background)]/95 backdrop-blur"
    >
      <div className="mx-auto max-w-6xl px-5 py-4 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex min-w-0 flex-1 items-stretch gap-4">
            <div
              className={`relative shrink-0 overflow-hidden bg-[var(--line)] transition-[width,height,border-radius] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isExpanded
                  ? "h-40 w-40 rounded-[6px] sm:h-36 sm:w-48"
                  : "h-14 w-14 self-center rounded-[28px] cursor-pointer"
              }`}
              aria-label="Expand menu"
              role={isExpanded ? undefined : "button"}
              tabIndex={isExpanded ? undefined : 0}
              onClick={() => {
                if (!isExpanded) {
                  setIsExpanded(true);
                }
              }}
              onKeyDown={(event) => {
                if (!isExpanded && (event.key === "Enter" || event.key === " ")) {
                  event.preventDefault();
                  setIsExpanded(true);
                }
              }}
            >
              <Image
                src="/images/budapest_shot_web_head.jpg"
                alt="Profile portrait"
                fill
                sizes={isExpanded ? "(min-width: 640px) 192px, 160px" : "56px"}
                className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                priority
              />
            </div>

            <div className="min-w-0 flex-1 self-center">
              <p className="font-[family-name:var(--font-serif)] text-2xl leading-none sm:text-3xl">
                {displayTitle}
                <span
                  aria-hidden="true"
                  className={`ml-1 inline-block h-[1em] w-[2px] align-[-0.15em] bg-current ${
                    isTypingTitle ? "typing-caret opacity-100" : "opacity-0"
                  }`}
                />
              </p>

              <div
                className={`overflow-hidden transition-[max-height,opacity,transform,margin] duration-300 ${
                  isExpanded ? "mt-3 max-h-32 translate-y-0 opacity-100" : "mt-0 max-h-0 -translate-y-2 opacity-0"
                }`}
              >
                <p className="max-w-3xl text-sm leading-6 text-[var(--muted)] sm:text-base">
                  Hi! I'm a software engineer currently based in Washington, D.C. I have interests in
                  video game development, but when I'm writing traditional software, I love working on
                  developer-facing tools. I'm always trying out a new idea, so feel free to get in touch!
                </p>
              </div>
            </div>
          </div>

          <nav aria-label="Profile links" className="ml-auto flex items-center gap-1 sm:gap-2">
            {profileLinks.map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="sr-only">{item.label}</span>
                </>
              );
              const className =
                "flex h-10 w-10 items-center justify-center rounded border border-transparent text-[var(--muted)] no-underline transition hover:border-[var(--line)] hover:text-[var(--foreground)]";

              if (item.href.startsWith("/")) {
                return (
                  <Link key={item.label} className={className} href={item.href} aria-label={item.label}>
                    {content}
                  </Link>
                );
              }

              return (
                <a key={item.label} className={className} href={item.href} aria-label={item.label}>
                  {content}
                </a>
              );
            })}
          </nav>

          <button
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Collapse menu" : "Expand menu"}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-[var(--line)] text-[var(--muted)] transition hover:text-[var(--foreground)]"
            type="button"
            onClick={() => setIsExpanded((current) => !current)}
          >
            <ToggleIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
