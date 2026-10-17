import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";
import { SanityImage } from "@/components/atoms/SanityImage";
import { formatDate } from "@/lib/format";
import { Badge } from "@/components/atoms/Badge";
import type { EventDetail } from "@/sanity/lib/types";

export function EventHero({ event, past }: { event: EventDetail; past: boolean }) {
  // Without an external registration link, upcoming events fall back to the contact form.
  const cta = event.cta?.url
    ? {
        href: event.cta.url,
        label: event.cta.label ?? (past ? "Watch Replay" : "Register Now"),
        external: true,
      }
    : past
      ? null
      : { href: "/contact", label: event.cta?.label ?? "Register Now", external: false };

  const ctaProps = cta?.external ? { target: "_blank", rel: "noreferrer" } : {};

  return (
    <>
      {/* Phones: image banner with an overlapping summary card (Stitch mobile event detail). */}
      <section className="md:hidden">
        <div className="relative h-56 w-full bg-surface-container">
          <SanityImage image={event.heroImage} alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="relative z-10 mx-margin-mobile -mt-8 flex flex-col gap-3 rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-ambient">
          <Badge className="w-fit uppercase">{event.eventType}</Badge>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">{event.title}</h1>
          <p className="flex items-center gap-3 font-body-md text-body-md text-on-surface-variant">
            <Icon name="calendar_month" className="text-primary" />
            <time dateTime={event.startsAt}>{formatDate(event.startsAt, "long")}</time>
          </p>
          <p className="flex items-center gap-3 font-body-md text-body-md text-on-surface-variant">
            <Icon name={event.mode === "Virtual" ? "videocam" : "location_on"} className="text-primary" />
            {event.venue?.name ?? event.location ?? event.mode}
          </p>
          {cta && (
            <Link
              href={cta.href}
              {...ctaProps}
              className="mt-2 rounded-lg bg-primary py-3 text-center font-label-md text-label-md text-on-primary"
            >
              {cta.label}
            </Link>
          )}
        </div>
      </section>

      <section className="relative hidden min-h-[60vh] w-full items-center justify-center overflow-hidden border-b border-outline-variant bg-surface-container-low md:flex">
        <div className="absolute inset-0 z-0">
          <SanityImage
            image={event.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
        </div>
        <div className="relative z-10 mx-auto flex max-w-container-max flex-col items-center px-margin-mobile py-20 text-center md:px-margin-desktop">
          <div className="mb-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-outline-variant bg-surface-container-lowest/90 px-4 py-2 backdrop-blur">
            <Icon name="calendar_today" className="text-[16px] text-primary" />
            <time dateTime={event.startsAt} className="font-label-md text-label-md text-primary">
              {formatDate(event.startsAt)}
            </time>
            <span className="text-outline-variant">|</span>
            <Icon
              name={event.mode === "Virtual" ? "videocam" : "location_on"}
              className="text-[16px] text-primary"
            />
            <span className="font-label-md text-label-md text-primary">{event.location ?? event.mode}</span>
            {past && (
              <span className="ml-1 rounded bg-surface-variant px-2 py-0.5 font-caption text-caption text-on-surface-variant">
                Past event
              </span>
            )}
          </div>
          <h1 className="mb-6 max-w-4xl font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-on-background md:font-headline-xl md:text-headline-xl">
            {event.title}
          </h1>
          {event.summary && (
            <p className="mx-auto mb-10 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
              {event.summary}
            </p>
          )}
          {cta && (
            <Link
              href={cta.href}
              {...(cta.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="rounded-lg bg-primary px-8 py-4 font-label-md text-label-md text-on-primary transition-all duration-300 hover:-translate-y-1 hover:bg-surface-tint hover:shadow-lg"
            >
              {cta.label}
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
