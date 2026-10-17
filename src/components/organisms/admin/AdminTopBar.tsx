"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/atoms/Avatar";
import { ThemeToggle } from "@/components/molecules/ThemeToggle";
import { adminNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { isAdminActive } from "./AdminSidebar";

export function AdminTopBar({ userName }: { userName?: string }) {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-20 border-b border-outline-variant bg-surface-bright/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-margin-mobile lg:px-gutter">
        <p className="font-headline-md text-headline-md font-extrabold text-primary">Shift to Zero Carbon</p>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {userName && <Avatar name={userName} size={40} />}
        </div>
      </div>
      {/* Compact nav replaces the sidebar on small screens. */}
      <nav aria-label="Admin" className="flex gap-1 overflow-x-auto px-margin-mobile pb-2 lg:hidden">
        {adminNav.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "rounded-full px-3 py-1.5 font-label-md text-label-md whitespace-nowrap",
              isAdminActive(pathname, href)
                ? "bg-primary-container/20 text-primary"
                : "text-on-surface-variant hover:bg-surface-container",
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
