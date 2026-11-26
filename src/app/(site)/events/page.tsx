import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/organisms/EmptyState";
import { PageHero } from "@/components/organisms/site/PageHero";
import { pageMetadata } from "@/lib/seo";

const description = "Events run by Shift to Zero Carbon will be listed here.";

export const metadata: Metadata = {
  ...pageMetadata({ path: "/events", title: "Events", description }),
  // Not linked from the site while there are no events; kept so old links don't 404.
  robots: { index: false, follow: true },
};

export default function EventsPage() {
  return (
    <>
      <PageHero title="Events" description={description} />
      <div className="container-page pb-24">
        <EmptyState
          icon="event_busy"
          title="No upcoming events"
          text="We are not running any events right now."
        />
        <p className="mt-8 text-center font-body-md text-body-md text-on-surface-variant">
          Want to hear when we do?{" "}
          <Link href="/contact" className="text-primary underline">
            Contact us
          </Link>
          .
        </p>
      </div>
    </>
  );
}
