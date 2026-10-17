import type { ReactNode } from "react";
import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";

/** Icon + short text, e.g. location, date, read time. */
export function MetaItem({
  icon,
  children,
  className,
}: {
  icon: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-caption text-caption text-on-surface-variant",
        className,
      )}
    >
      <Icon name={icon} className="text-[16px]" />
      {children}
    </span>
  );
}
