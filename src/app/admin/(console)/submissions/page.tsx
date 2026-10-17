import type { Metadata } from "next";
import { Suspense } from "react";
import { Skeleton } from "@/components/atoms/Skeleton";
import { AdminPageHeader } from "@/components/organisms/admin/AdminPageHeader";
import { SubmissionsInbox } from "@/components/organisms/admin/SubmissionsInbox";
import { submissionStatus, type SubmissionStatus } from "@/db/schema";
import { requireAdmin } from "@/lib/dal";
import { getSubmission, listSubmissions } from "@/lib/submissions";

export const metadata: Metadata = { title: "Submissions" };

type Search = { id?: string; status?: string };

async function Inbox({ searchParams }: { searchParams: Promise<Search> }) {
  await requireAdmin();
  const { id, status: rawStatus } = await searchParams;
  const status = submissionStatus.enumValues.includes(rawStatus as SubmissionStatus)
    ? (rawStatus as SubmissionStatus)
    : undefined;
  const uuid = id && /^[0-9a-f-]{36}$/i.test(id) ? id : undefined;

  const [items, selected] = await Promise.all([
    listSubmissions({ status }),
    uuid ? getSubmission(uuid) : null,
  ]);
  return (
    <SubmissionsInbox
      items={items}
      selected={selected ?? (items[0] ? await getSubmission(items[0].id) : null)}
      status={status}
    />
  );
}

export default function SubmissionsPage({ searchParams }: PageProps<"/admin/submissions">) {
  return (
    <>
      <AdminPageHeader
        title="Submissions Inbox"
        description="Volunteer applications, partnership requests and inquiries."
      />
      <div className="flex flex-1 flex-col px-margin-mobile pb-12 lg:px-margin-desktop">
        <Suspense fallback={<Skeleton className="h-96" />}>
          <Inbox searchParams={searchParams as Promise<Search>} />
        </Suspense>
      </div>
    </>
  );
}
