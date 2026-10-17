import type { Metadata } from "next";
import { EventExplorer } from "@/components/organisms/events/EventExplorer";
import { PastEvents } from "@/components/organisms/events/PastEvents";
import { PageHero } from "@/components/organisms/site/PageHero";
import { getEventsByTime } from "@/sanity/lib/content";

const description =
  "Engage with industry leaders, participate in hands-on decarbonization workshops, and join our global community in the shift to a sustainable future.";

export const metadata: Metadata = { title: "Events", description };

export default async function EventsPage() {
  const { upcoming, past } = await getEventsByTime();
  return (
    <div className="flex flex-col">
      <PageHero
        title="Upcoming Events & Workshops"
        description={description}
        mobile={{
          title: "Events Archive",
          description:
            "Explore upcoming symposiums and past recordings driving the industrial transition to zero carbon.",
        }}
      />
      <EventExplorer events={upcoming} />
      <PastEvents events={past} />
    </div>
  );
}
