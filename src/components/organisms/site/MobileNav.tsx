"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import { isActivePath, mainNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/** Hamburger menu for small screens; covers pages not in the bottom tab bar (Team, Get Involved). */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on Escape; links close it on click.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full text-primary hover:bg-surface-container-low"
      >
        <Icon name={open ? "close" : "menu"} />
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-0 top-16 border-b border-outline-variant bg-surface px-margin-mobile pb-6 shadow-ambient"
        >
          <ul className="flex flex-col">
            {mainNav.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={isActivePath(pathname, href) ? "page" : undefined}
                  className={cn(
                    "block border-b border-keyline py-4 font-label-md text-label-md",
                    isActivePath(pathname, href) ? "text-primary" : "text-on-surface-variant",
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/get-involved"
            onClick={() => setOpen(false)}
            className="mt-6 block rounded-lg bg-primary px-6 py-3 text-center font-label-md text-label-md text-on-primary"
          >
            Get Involved
          </Link>
        </nav>
      )}
    </div>
  );
}
