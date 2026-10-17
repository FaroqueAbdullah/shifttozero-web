import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Size = "xl" | "lg" | "md";

/** Responsive by design: xl and lg step down to headline-lg-mobile on small screens. */
const sizes: Record<Size, string> = {
  xl: "font-headline-lg-mobile text-headline-lg-mobile md:font-headline-xl md:text-headline-xl",
  lg: "font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg",
  md: "font-headline-md text-headline-md",
};

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: Extract<ElementType, "h1" | "h2" | "h3" | "h4" | "p">;
  size?: Size;
};

export function Heading({ as: Tag = "h2", size = "lg", className, ...props }: HeadingProps) {
  return <Tag className={cn(sizes[size], "text-heading", className)} {...props} />;
}
