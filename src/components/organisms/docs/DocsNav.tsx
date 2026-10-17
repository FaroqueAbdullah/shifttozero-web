"use client";

import { m, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { docsNav } from "@/content/appDocs";
import { cn } from "@/lib/utils";

/** Reading-progress bar plus a sticky "on this page" chip nav that tracks the current section. */
export function DocsNav() {
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      let current: string | null = null;
      for (const { id } of docsNav) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 180) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <m.div
        aria-hidden
        className="fixed top-0 left-0 z-[60] h-1 w-full origin-left bg-primary"
        style={{ scaleX: scrollYProgress }}
      />
      <nav
        aria-label="On this page"
        className="sticky top-16 z-30 border-b border-outline-variant bg-surface/90 backdrop-blur md:top-20"
      >
        <ul className="container-page flex [scrollbar-width:none] gap-1 overflow-x-auto py-2">
          {docsNav.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
                className={cn(
                  "block rounded-full px-3 py-1.5 font-label-md text-label-md whitespace-nowrap transition-colors",
                  active === id
                    ? "bg-primary text-on-primary"
                    : "text-on-surface-variant hover:bg-surface-container",
                )}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
