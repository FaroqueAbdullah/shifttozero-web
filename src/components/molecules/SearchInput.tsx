import type { ComponentProps } from "react";
import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";

type SearchInputProps = Omit<ComponentProps<"input">, "type"> & { label: string };

export function SearchInput({ label, className, ...props }: SearchInputProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <Icon
        name="search"
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant"
      />
      <input
        type="search"
        aria-label={label}
        className="w-full rounded-lg border border-surface-variant bg-background py-3 pr-4 pl-10 font-body-md text-body-md text-on-background transition-all outline-none placeholder:text-outline focus:border-primary focus:ring-1 focus:ring-primary"
        {...props}
      />
    </div>
  );
}
