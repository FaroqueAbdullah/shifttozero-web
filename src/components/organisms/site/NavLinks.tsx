"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActivePath, mainNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
      {mainNav.map(({ href, label }) => {
        const active = isActivePath(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "font-label-md text-label-md transition-colors hover:text-primary",
              active ? "border-b-2 border-primary pb-1 text-primary" : "text-on-surface-variant",
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
