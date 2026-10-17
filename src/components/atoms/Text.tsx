import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "body-lg" | "body-md" | "label" | "caption" | "overline";

const variants: Record<Variant, string> = {
  "body-lg": "font-body-lg text-body-lg text-on-surface-variant",
  "body-md": "font-body-md text-body-md text-on-surface-variant",
  label: "font-label-md text-label-md text-on-surface",
  caption: "font-caption text-caption text-on-surface-variant",
  overline: "font-label-md text-label-md uppercase text-primary",
};

type TextProps = HTMLAttributes<HTMLElement> & {
  as?: Extract<ElementType, "p" | "span" | "div" | "time">;
  variant?: Variant;
};

export function Text({ as: Tag = "p", variant = "body-md", className, ...props }: TextProps) {
  return <Tag className={cn(variants[variant], className)} {...props} />;
}
