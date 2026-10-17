import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** Custom design tokens (globals.css @theme). tailwind-merge must know them, or it treats
 * `text-headline-md` as a color and drops it when a color class like `text-on-surface` follows. */
const typeScale = [
  "headline-xl",
  "headline-lg",
  "headline-lg-mobile",
  "headline-md",
  "body-lg",
  "body-md",
  "label-md",
  "caption",
];

const twMerge = extendTailwindMerge({
  extend: {
    theme: { radius: ["button", "card", "feature"] },
    classGroups: {
      "font-size": [{ text: typeScale }],
      "font-family": [{ font: [...typeScale, "headline", "sans"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
