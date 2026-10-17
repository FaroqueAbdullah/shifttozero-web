import { cn } from "@/lib/utils";

/** Headline whose words rise in one after another (CSS only, so it shows before JavaScript loads). */
export function AnimatedHeadline({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <h1
      className={cn(
        "font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:font-headline-xl md:text-[56px] md:leading-[64px]",
        className,
      )}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <span
              className="inline-block motion-safe:animate-word-rise"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          </span>
        ))}
      </span>
    </h1>
  );
}
