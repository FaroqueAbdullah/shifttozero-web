import { AgendaItem } from "@/components/molecules/AgendaItem";
import { StatTile } from "@/components/molecules/StatTile";
import type { EventDetail } from "@/sanity/lib/types";
import { RichText } from "../blog/RichText";

function BlockTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 md:mb-6">
      <h2 className="font-headline-md text-headline-md text-on-surface md:mb-4 md:font-headline-lg md:text-headline-lg">
        {children}
      </h2>
      <div className="hidden h-1 w-12 bg-primary md:block" />
    </div>
  );
}

const glanceTones = ["primary", "secondary", "tertiary"] as const;

/** Bento grid: About (8 cols) + At a Glance (4 cols), then Agenda and Venue full width. */
export function EventDetails({ event }: { event: EventDetail }) {
  const mapsQuery = encodeURIComponent([event.venue?.name, event.venue?.address].filter(Boolean).join(", "));
  const hasAside = Boolean(event.highlights?.length);

  return (
    <section className="container-page grid grid-cols-1 gap-8 py-8 md:grid-cols-12 md:gap-gutter md:py-20">
      {event.about?.length ? (
        <div
          className={`md:rounded-xl md:border md:border-outline-variant md:bg-surface-container-lowest md:p-8 md:shadow-sm ${hasAside ? "md:col-span-8" : "md:col-span-12"}`}
        >
          <BlockTitle>About the Event</BlockTitle>
          <RichText value={event.about} className="font-body-md text-body-md text-on-surface-variant" />
        </div>
      ) : null}

      {hasAside && (
        <aside className="hidden rounded-xl border border-outline-variant bg-surface-container-low p-8 md:col-span-4 md:block">
          <h2 className="mb-6 font-headline-md text-headline-md text-on-surface">At a Glance</h2>
          <ul className="space-y-6">
            {event.highlights!.map((h, i) => (
              <li key={h._key}>
                <StatTile
                  variant="glance"
                  icon={h.icon}
                  value={h.value ?? ""}
                  label={h.label ?? ""}
                  tone={glanceTones[i % glanceTones.length]}
                />
              </li>
            ))}
          </ul>
        </aside>
      )}

      {event.agenda?.length ? (
        <div className="md:col-span-12 md:mt-12">
          <BlockTitle>Agenda</BlockTitle>
          {/* Phones: timeline (Stitch mobile event detail) */}
          <ol className="ml-1.5 border-l-2 border-outline-variant md:hidden">
            {event.agenda.map((item, i) => (
              <li key={item._key} className="relative pb-6 pl-6 last:pb-0">
                <span
                  aria-hidden
                  className={`absolute top-1.5 -left-[7px] h-3 w-3 rounded-full ${i === 0 ? "bg-primary" : "bg-outline-variant"}`}
                />
                <p
                  className={`font-label-md text-label-md ${i === 0 ? "text-primary" : "text-on-surface-variant"}`}
                >
                  {item.time}
                </p>
                <h3 className="font-body-lg text-body-lg font-semibold text-on-surface">{item.title}</h3>
                {item.speaker?.name && (
                  <p className="font-body-md text-body-md text-on-surface-variant">{item.speaker.name}</p>
                )}
              </li>
            ))}
          </ol>
          <div className="hidden overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm md:block">
            {event.agenda.map((item) => (
              <AgendaItem key={item._key} item={item} />
            ))}
          </div>
        </div>
      ) : null}

      {event.venue?.name && (
        <div className="md:col-span-12 md:mt-12">
          <BlockTitle>Venue</BlockTitle>
          <div className="relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm md:h-96 md:bg-surface-container">
            <iframe
              title={`Map of ${event.venue.name}`}
              src={`https://maps.google.com/maps?q=${mapsQuery}&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-48 w-full border-0 grayscale-[30%] md:h-full"
            />
            <div className="bg-surface-container-lowest p-6 md:absolute md:bottom-6 md:left-6 md:w-96 md:rounded-lg md:border md:border-outline-variant md:shadow-lg">
              <h3 className="mb-2 font-body-lg text-body-lg font-semibold text-on-surface md:font-headline-md md:text-headline-md">
                {event.venue.name}
              </h3>
              {event.venue.address && (
                <p className="mb-4 font-body-md text-body-md whitespace-pre-line text-on-surface-variant">
                  {event.venue.address}
                </p>
              )}
              <a
                href={event.venue.mapUrl || `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noreferrer"
                className="block w-full rounded-lg border border-secondary px-4 py-2 text-center font-label-md text-label-md text-secondary transition-colors hover:bg-surface-container-low"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
