import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventDetails } from "@/components/organisms/events/EventDetails";
import { EventHero } from "@/components/organisms/events/EventHero";
import { getEvent, getEventSlugs, getEventsByTime, toStaticParams } from "@/sanity/lib/content";
import { urlFor } from "@/sanity/lib/image";

export async function generateStaticParams() {
  return toStaticParams(await getEventSlugs());
}

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return {};
  const image = event.heroImage?.asset ? urlFor(event.heroImage).width(1200).height(630).url() : undefined;
  return {
    title: event.title,
    description: event.summary,
    openGraph: { title: event.title, description: event.summary, images: image ? [image] : undefined },
  };
}

export default async function EventPage({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  const [event, { past }] = await Promise.all([getEvent(slug), getEventsByTime()]);
  if (!event) notFound();
  const isPast = past.some((e) => e._id === event._id);

  return (
    <>
      <EventHero event={event} past={isPast} />
      <EventDetails event={event} />
    </>
  );
}
