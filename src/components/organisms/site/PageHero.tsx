import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: ReactNode;
  description?: ReactNode;
  /** "center": Blog, Get Involved. "left": Events, Tools, Team. */
  align?: "center" | "left";
  /** Tinted background band (Get Involved). */
  tinted?: boolean;
  /** Tighter top/bottom spacing (Tools: search bar sits right under the intro). */
  compact?: boolean;
  /** Short header used on phones instead of the large hero (e.g. "Blog Archive"). */
  mobile?: {
    title: ReactNode;
    description?: ReactNode;
    align?: "center" | "left";
    tone?: "primary" | "default";
  };
  children?: ReactNode;
};

export function PageHero({
  title,
  description,
  align = "left",
  tinted,
  compact,
  mobile,
  children,
}: PageHeroProps) {
  return (
    <>
      {mobile && (
        <section
          className={cn(
            "px-margin-mobile pt-6 pb-4 md:hidden",
            mobile.align === "center" ? "text-center" : "text-left",
          )}
        >
          <h1
            className={cn(
              "mb-2 font-headline-lg-mobile text-headline-lg-mobile",
              mobile.tone === "default" ? "text-on-background" : "text-primary",
            )}
          >
            {mobile.title}
          </h1>
          {mobile.description && (
            <p className="font-body-md text-body-md text-on-surface-variant">{mobile.description}</p>
          )}
        </section>
      )}
      <section className={cn(tinted && "bg-surface-container-low", mobile && "hidden md:block")}>
        <div
          className={cn(
            compact ? "container-page pt-12 pb-6" : "container-page py-16 md:py-24",
            align === "center" ? "text-center" : "text-left",
          )}
        >
          <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
            <h1 className="mb-4 font-headline-lg-mobile text-headline-lg-mobile text-heading md:mb-6 md:font-headline-xl md:text-headline-xl">
              {title}
            </h1>
            {description && (
              <p
                className={cn(
                  "font-body-lg text-body-lg text-on-surface-variant",
                  align === "center" && "mx-auto max-w-2xl",
                )}
              >
                {description}
              </p>
            )}
          </div>
          {children}
        </div>
      </section>
    </>
  );
}
