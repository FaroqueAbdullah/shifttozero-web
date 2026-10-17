import { dayOfMonth, monthShort } from "@/lib/format";
import { cn } from "@/lib/utils";

type DateBadgeProps = {
  date: string;
  /** "tile": full-width header on Home event cards. "compact": square badge on the events list. */
  variant?: "tile" | "compact";
  muted?: boolean;
};

export function DateBadge({ date, variant = "compact", muted }: DateBadgeProps) {
  if (variant === "tile") {
    return (
      <div className="flex flex-col items-center justify-center border-b border-outline-variant bg-surface-container p-6">
        <span
          className={cn(
            "font-headline-md text-headline-md uppercase",
            muted ? "text-outline" : "text-primary",
          )}
        >
          {monthShort(date)}
        </span>
        <span className="font-headline-xl text-headline-xl text-on-surface">{dayOfMonth(date)}</span>
      </div>
    );
  }
  return (
    <div className="flex h-24 w-20 shrink-0 flex-col items-center justify-center rounded-lg border border-outline-variant/50 bg-surface-container">
      <span className="font-label-md text-label-md text-on-surface-variant uppercase">
        {monthShort(date)}
      </span>
      <span className="font-headline-lg text-headline-lg text-primary">{dayOfMonth(date)}</span>
    </div>
  );
}
