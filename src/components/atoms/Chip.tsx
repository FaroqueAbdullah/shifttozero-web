import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ChipProps = ComponentProps<"button"> & {
  active?: boolean;
  /** "pill": Blog/Tools. "rounded": Events filter bar. */
  shape?: "pill" | "rounded";
};

/** Filter pill. Use inside ChipGroup for single-select filters. */
export function Chip({ active, shape = "pill", className, type = "button", ...props }: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={active}
      className={cn(
        "border px-4 py-2 font-label-md text-label-md transition-colors focus-visible:outline-2 focus-visible:outline-primary",
        shape === "pill" ? "rounded-full" : "rounded-lg",
        active
          ? "border-primary bg-primary text-on-primary hover:bg-surface-tint"
          : "border-surface-variant bg-background text-on-surface-variant hover:bg-surface-container",
        className,
      )}
      {...props}
    />
  );
}
