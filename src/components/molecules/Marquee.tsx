import { cn } from "@/lib/utils";

/**
 * Endless horizontal strip of labels; pauses on hover, becomes a static wrapped list with reduced motion.
 *
 * The labels are in the DOM once. The loop needs a second copy to scroll into view; that copy is
 * aria-hidden and draws its labels with CSS (data-label), so they are not repeated in the page text.
 */
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
      <div className="flex w-max group-hover:[animation-play-state:paused] motion-safe:animate-marquee motion-reduce:w-full">
        <ul className="flex gap-3 pr-3 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0">
          {items.map((item) => (
            <li key={item} className={pill}>
              {item}
            </li>
          ))}
        </ul>
        <ul aria-hidden className="flex gap-3 pr-3 motion-reduce:hidden">
          {items.map((item) => (
            <li key={item} data-label={item} className={cn(pill, "before:content-[attr(data-label)]")} />
          ))}
        </ul>
      </div>
    </div>
  );
}
