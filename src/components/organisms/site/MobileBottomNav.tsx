"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/atoms/Icon";
import { isActivePath, mobileTabs } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-around border-t border-outline-variant bg-surface px-2 pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      {mobileTabs.map(({ href, label, icon }) => {
        const active = isActivePath(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex h-full w-full flex-col items-center justify-center rounded-xl px-4 py-1 font-caption text-caption transition-colors active:scale-90",
              active
                ? "bg-primary-container/20 text-primary"
                : "text-on-surface-variant hover:bg-surface-container-low",
            )}
          >
            <Icon name={icon} filled={active} className="mb-1" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
