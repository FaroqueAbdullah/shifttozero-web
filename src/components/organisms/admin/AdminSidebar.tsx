"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Icon } from "@/components/atoms/Icon";
import { Logo } from "@/components/atoms/Logo";
import { adminNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export const isAdminActive = (pathname: string, href: string) =>
  href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

const linkClass =
  "flex items-center gap-3 rounded-lg px-4 py-3 text-on-surface-variant transition-all duration-200 hover:bg-surface-container-high";

export function AdminSidebar({ footer }: { footer?: ReactNode }) {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 z-30 hidden h-full w-64 flex-col border-r border-outline-variant bg-surface py-8 lg:flex">
      <div className="mb-10 flex items-center gap-4 px-6">
        <Logo size={40} className="border border-outline-variant" />
        <div>
          <p className="font-body-lg text-body-lg font-bold whitespace-nowrap text-primary">Shift to Zero</p>
          <p className="font-caption text-caption text-on-surface-variant">Admin Console</p>
        </div>
      </div>

      <nav aria-label="Admin" className="flex-1 space-y-1 px-4">
        {adminNav.map(({ href, label, icon }) => {
          const active = isAdminActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(linkClass, active && "bg-primary-container/15 text-primary")}
            >
              <Icon name={icon} className="text-[20px]" filled={active} />
              <span className="font-body-md text-body-md">{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 space-y-1 border-t border-outline-variant px-4 pt-6">
        <a href="/studio" target="_blank" rel="noreferrer" className={cn(linkClass, "py-2")}>
          <Icon name="open_in_new" className="text-[20px]" />
          <span className="font-body-md text-body-md">Content Studio</span>
        </a>
        <Link href="/" className={cn(linkClass, "py-2")}>
          <Icon name="public" className="text-[20px]" />
          <span className="font-body-md text-body-md">View Site</span>
        </Link>
        {footer}
      </div>
    </aside>
  );
}
