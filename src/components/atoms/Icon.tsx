import { cn } from "@/lib/utils";

type IconProps = {
  /** Material Symbols name, e.g. "eco", "arrow_forward" */
  name: string;
  filled?: boolean;
  className?: string;
};

/**
 * Decorative icon. The ligature name is drawn by CSS from `data-icon` (see globals.css), so words
 * like "arrow_forward" never appear in the page text, copy/paste, reader view or search snippets.
 * Icons are always aria-hidden: give icon-only controls their own aria-label.
 */
export function Icon({ name, filled = false, className }: IconProps) {
  return (
    <span
      aria-hidden="true"
      data-icon={name}
      className={cn("material-symbols-outlined leading-none select-none", className)}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
    />
  );
}
