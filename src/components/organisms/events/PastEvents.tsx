import { EventCard } from "@/components/molecules/EventCard";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import type { EventCard as EventData } from "@/sanity/lib/types";

export function PastEvents({ events }: { events: EventData[] }) {
  if (!events.length) return null;
  return (
    <section className="pb-8 md:border-t md:border-outline-variant md:bg-surface-container-low md:py-24">
      <div className="container-page">
        <SectionHeader variant="bar" size="lg" title="Past Events" className="mb-4 md:mb-8" />
        <div className="flex flex-col gap-4 md:hidden">
          {events.map((event) => (
            <EventCard key={event._id} event={event} variant="compact" past />
          ))}
        </div>
        <div className="hidden grid-cols-2 gap-6 md:grid lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event._id} event={event} variant="past" past />
          ))}
        </div>
      </div>
    </section>
  );
}
