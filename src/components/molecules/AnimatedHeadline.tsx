import { Fragment } from "react";
import { cn } from "@/lib/utils";

/**
 * Headline whose words rise in one after another (CSS only, so it shows before JavaScript loads).
 * The text is rendered once, with real spaces between the word spans, so screen readers, copy/paste
 * and search engines all get the plain sentence.
 */
export function AnimatedHeadline({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <h1
      className={cn(
        "font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:font-headline-xl md:text-[56px] md:leading-[64px]",
        className,
      )}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden align-bottom">
            <span
              className="inline-block motion-safe:animate-word-rise"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h1>
  );
}
