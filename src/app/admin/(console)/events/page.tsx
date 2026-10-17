import type { Metadata } from "next";
import { Suspense } from "react";
import { Icon } from "@/components/atoms/Icon";
import { Skeleton } from "@/components/atoms/Skeleton";
import { AdminPageHeader } from "@/components/organisms/admin/AdminPageHeader";
import { EventsTable } from "@/components/organisms/admin/EventsTable";
import { requestTime, requireAdmin } from "@/lib/dal";
import { studioCreateUrl } from "@/lib/studio";
import { getAdminEvents } from "@/sanity/lib/content";

export const metadata: Metadata = { title: "Event Management" };

async function List() {
  await requireAdmin();
  const [rows, now] = await Promise.all([getAdminEvents(), requestTime()]);
  return <EventsTable events={rows} now={now} />;
}

export default function ManageEventsPage() {
  return (
    <>
      <AdminPageHeader
        title="Event Management"
        description="Organize and monitor industrial decarbonization summits and workshops."
        actions={
          <a
            href={studioCreateUrl("event")}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-label-md text-label-md text-on-primary hover:bg-primary-container hover:text-on-primary-container"
          >
            <Icon name="add" /> Create New Event
          </a>
        }
      />
      <div className="flex flex-1 flex-col px-margin-mobile pb-12 lg:px-margin-desktop">
        <Suspense fallback={<Skeleton className="h-96" />}>
          <List />
        </Suspense>
      </div>
    </>
  );
}
