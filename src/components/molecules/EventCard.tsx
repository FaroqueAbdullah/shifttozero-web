import Link from "next/link";
import { Badge } from "@/components/atoms/Badge";
import { buttonClasses } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { dayOfMonth, formatDate, monthShort } from "@/lib/format";
import type { EventCard as EventCardData } from "@/sanity/lib/types";
import { cn } from "@/lib/utils";
import { DateBadge } from "./DateBadge";
import { MetaItem } from "./MetaItem";

type EventCardProps = {
  event: EventCardData;
  /** "tile": Home carousel. "mobile": Home carousel on phones. "row": events list. "past": compact past-event card. */
  variant?: "tile" | "mobile" | "compact" | "row" | "past";
  past?: boolean;
  className?: string;
};

/** Registration links go to the external URL when set, otherwise to the event page. */
function ctaFor(event: EventCardData, past?: boolean) {
  const detail = `/events/${event.slug}`;
  if (event.cta?.url) {
    return {
      href: event.cta.url,
      label: event.cta.label ?? (past ? "Watch Replay" : "Register Now"),
      external: true,
    };
  }
  return {
    href: detail,
    label: event.cta?.label ?? (past ? "View Details" : "Register Now"),
    external: false,
  };
}

/** Badge color per event type, as in the Stitch events list. */
const typeTone = {
  Summit: "secondary",
  Webinar: "tertiary",
  Workshop: "neutral",
  Conference: "primary",
} as const;

const locationIcon = (event: EventCardData) => (event.mode === "Virtual" ? "videocam" : "location_on");

export function EventCard({ event, variant = "row", past, className }: EventCardProps) {
  const cta = ctaFor(event, past);
  const ctaProps = cta.external ? { target: "_blank", rel: "noreferrer" } : {};
  const detail = `/events/${event.slug}`;

  if (variant === "compact") {
    return (
      <article
        className={cn(
          "overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest",
          className,
        )}
      >
        <div className="flex">
          <div
            className={cn(
              "flex w-20 shrink-0 flex-col items-center justify-center py-4",
              past ? "bg-surface-container text-on-surface-variant" : "bg-primary text-on-primary",
            )}
          >
            <span className="font-label-md text-label-md uppercase">{monthShort(event.startsAt)}</span>
            <span className="font-headline-md text-headline-md font-bold">{dayOfMonth(event.startsAt)}</span>
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 p-4">
            <h3 className="font-body-lg text-body-lg leading-snug font-semibold text-on-surface">
              <Link href={detail}>{event.title}</Link>
            </h3>
            <MetaItem icon={past ? "videocam" : locationIcon(event)}>{event.location ?? event.mode}</MetaItem>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-outline-variant px-4 py-3">
          <span className="font-label-md text-label-md text-on-surface-variant">{event.eventType}</span>
          {past ? (
            <Link
              href={cta.href}
              {...ctaProps}
              className="flex items-center gap-2 rounded-lg border border-secondary px-4 py-2 font-label-md text-label-md text-secondary"
            >
              <Icon name="play_circle" className="text-[18px]" />{" "}
              {cta.label === "View Details" ? "Details" : cta.label}
            </Link>
          ) : (
            <Link
              href={cta.href}
              {...ctaProps}
              className="rounded-lg bg-primary px-4 py-2 font-label-md text-label-md text-on-primary"
            >
              {cta.label}
            </Link>
          )}
        </div>
      </article>
    );
  }

  if (variant === "mobile") {
    return (
      <article className="flex min-w-[280px] snap-start flex-col overflow-hidden rounded-xl border border-surface-container-high bg-surface-container-lowest">
        <div className="flex flex-col items-center justify-center bg-primary p-4 text-on-primary">
          <span className="font-label-md text-label-md uppercase opacity-80">
            {monthShort(event.startsAt)}
          </span>
          <span className="font-headline-md text-headline-md font-bold">{dayOfMonth(event.startsAt)}</span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <h3 className="font-label-md leading-tight text-on-background">
            <Link href={detail}>{event.title}</Link>
          </h3>
          <MetaItem icon={event.mode === "Virtual" ? "public" : "location_on"}>
            {event.location ?? event.mode}
          </MetaItem>
          <Link
            href={cta.href}
            {...ctaProps}
            className="mt-auto rounded-lg bg-primary py-2 text-center font-label-md text-label-md text-on-primary active:scale-95"
          >
            {cta.label}
          </Link>
        </div>
      </article>
    );
  }

  if (variant === "tile") {
    return (
      <div className="flex min-w-[280px] flex-1 flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest transition-shadow hover:shadow-md sm:min-w-[320px]">
        <DateBadge date={event.startsAt} variant="tile" muted={past} />
        <div className="flex flex-col justify-center p-6">
          <MetaItem icon={locationIcon(event)} className="mb-2">
            {event.location ?? event.mode}
          </MetaItem>
          <h3 className="mb-2 font-headline-md text-headline-md text-on-surface">
            <Link href={detail} className="hover:text-primary">
              {event.title}
            </Link>
          </h3>
          <Link
            href={cta.href}
            {...ctaProps}
            className="pt-2 font-label-md text-label-md text-primary hover:underline"
          >
            {cta.label}
          </Link>
        </div>
      </div>
    );
  }

  if (variant === "past") {
    return (
      <div
        className={cn(
          "flex flex-col gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-5",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <time dateTime={event.startsAt} className="font-caption text-caption text-on-surface-variant">
            {formatDate(event.startsAt, "long")}
          </time>
          <Badge tone="neutral" className="rounded px-2 py-0.5">
            {event.eventType}
          </Badge>
        </div>
        <h3 className="font-label-md text-label-md text-on-surface">
          <Link href={detail} className="hover:text-primary">
            {event.title}
          </Link>
        </h3>
        <Link
          href={cta.href}
          {...ctaProps}
          className="mt-auto flex items-center gap-2 self-start rounded border border-secondary px-4 py-2 font-label-md text-label-md text-secondary transition-colors hover:bg-secondary-container hover:text-on-secondary-container"
        >
          <Icon name={cta.label === "Watch Replay" ? "play_circle" : "description"} className="text-[18px]" />{" "}
          {cta.label}
        </Link>
      </div>
    );
  }

  return (
    <article
      className={cn(
        "group relative flex flex-col items-start gap-6 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-6 transition-shadow hover:shadow-lg hover:shadow-primary/5 md:flex-row md:gap-8 md:p-8",
        className,
      )}
    >
      <DateBadge date={event.startsAt} />
      <div className="flex flex-grow flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={typeTone[event.eventType] ?? "secondary"} className="rounded px-2 py-1">
            {event.eventType}
          </Badge>
          <MetaItem icon={locationIcon(event)}>{event.location ?? event.mode}</MetaItem>
        </div>
        <h3 className="font-headline-md text-headline-md text-on-surface">
          <Link href={detail} className="hover:text-primary">
            {event.title}
          </Link>
        </h3>
        {event.summary && (
          <p className="max-w-2xl font-body-md text-body-md text-on-surface-variant">{event.summary}</p>
        )}
      </div>
      <div className="mt-4 w-full shrink-0 md:mt-0 md:w-auto">
        <Link
          href={cta.href}
          {...ctaProps}
          className={cn(
            buttonClasses("primary"),
            "w-full hover:bg-primary-fixed hover:text-on-primary-fixed md:w-auto",
          )}
        >
          {cta.label}
        </Link>
      </div>
    </article>
  );
}
