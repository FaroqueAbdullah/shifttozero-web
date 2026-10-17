import { cn } from "@/lib/utils";

/** Endless horizontal strip of labels; pauses on hover, becomes a static wrapped list with reduced motion. */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  if (!items.length) return null;
  const pill =
    "shrink-0 rounded-full border border-outline-variant bg-surface-container-lowest px-5 py-2 font-label-md text-label-md text-on-surface-variant";
  return (
    <div
      className={cn(
        "group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <ul className="hidden w-max gap-3 group-hover:[animation-play-state:paused] motion-safe:flex motion-safe:animate-marquee">
        {[...items, ...items].map((item, i) => (
          <li key={i} className={pill} aria-hidden={i >= items.length}>
            {item}
          </li>
        ))}
      </ul>
      <ul className="flex flex-wrap justify-center gap-3 motion-safe:hidden">
        {items.map((item) => (
          <li key={item} className={pill}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
