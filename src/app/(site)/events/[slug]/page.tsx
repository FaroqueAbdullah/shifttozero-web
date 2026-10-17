import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/atoms/JsonLd";
import { EventDetails } from "@/components/organisms/events/EventDetails";
import { EventHero } from "@/components/organisms/events/EventHero";
import { absoluteUrl, ORGANIZATION_ID, pageMetadata, shareImageUrl } from "@/lib/seo";
import { getEvent, getEventSlugs, getEventsByTime, toStaticParams } from "@/sanity/lib/content";
import type { EventDetail } from "@/sanity/lib/types";

export async function generateStaticParams() {
  return toStaticParams(await getEventSlugs());
}

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return {};
  return pageMetadata({
    path: `/events/${slug}`,
    title: event.title,
    description: event.summary,
    image: event.heroImage,
    seo: event.seo,
  });
}

/** schema.org Event, so Google can list it in event search results. */
function eventJsonLd(event: EventDetail, url: string) {
  const inPerson = event.mode === "In person";
  const image = shareImageUrl(event.heroImage);
  return {
    "@type": "Event",
    name: event.title,
    description: event.summary,
    url,
    startDate: event.startsAt,
    ...(event.endsAt && { endDate: event.endsAt }),
    ...(image && { image }),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: inPerson
      ? "https://schema.org/OfflineEventAttendanceMode"
      : "https://schema.org/OnlineEventAttendanceMode",
    location: inPerson
      ? {
          "@type": "Place",
          name: event.venue?.name ?? event.location,
          address: event.venue?.address ?? event.location,
        }
      : { "@type": "VirtualLocation", url: event.cta?.url ?? url },
    organizer: { "@id": ORGANIZATION_ID },
  };
}

export default async function EventPage({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  const [event, { past }] = await Promise.all([getEvent(slug), getEventsByTime()]);
  if (!event) notFound();
  const isPast = past.some((e) => e._id === event._id);

  return (
    <>
      <JsonLd data={eventJsonLd(event, absoluteUrl(`/events/${slug}`))} />
      <EventHero event={event} past={isPast} />
      <EventDetails event={event} />
    </>
  );
}
