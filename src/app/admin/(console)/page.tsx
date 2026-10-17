import Link from "next/link";
import { Suspense } from "react";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/atoms/Skeleton";
import { KpiCard } from "@/components/molecules/KpiCard";
import { ActivityFeed, type Activity } from "@/components/organisms/admin/ActivityFeed";
import { AdminPageHeader } from "@/components/organisms/admin/AdminPageHeader";
import { SubmissionTrendChart } from "@/components/organisms/admin/SubmissionTrendChart";
import { TYPE_LABEL } from "@/components/organisms/admin/SubmissionsInbox";
import { requestTime, requireAdmin } from "@/lib/dal";
import { countNewSubmissions, listSubmissions, submissionCountsByDay } from "@/lib/submissions";
import { getAdminPosts, getContentCounts } from "@/sanity/lib/content";

const DAYS = 7;
const dayLabel = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  weekday: "short",
  month: "short",
  day: "numeric",
});

async function Dashboard() {
  await requireAdmin();
  const now = await requestTime();
  const since = new Date(now - (DAYS - 1) * 86_400_000);
  since.setUTCHours(0, 0, 0, 0);

  // The database is optional while it's being set up; show zeros instead of failing.
  const [counts, newCount, byDay, submissions, posts] = await Promise.all([
    getContentCounts().catch(() => ({ posts: 0, events: 0, team: 0 })),
    countNewSubmissions().catch(() => 0),
    submissionCountsByDay(since).catch(() => []),
    listSubmissions().catch(() => []),
    getAdminPosts().catch(() => []),
  ]);

  const countMap = new Map(byDay.map((d) => [d.day, Number(d.count)]));
  const points = Array.from({ length: DAYS }, (_, i) => {
    const date = new Date(since.getTime() + i * 86_400_000);
    const day = date.toISOString().slice(0, 10);
    return { day, label: dayLabel.format(date), count: countMap.get(day) ?? 0 };
  });

  const activity: (Activity & { at: number })[] = [
    ...submissions.slice(0, 5).map((s) => ({
      id: s.id,
      icon: s.type === "volunteer" ? "person_add" : s.type === "partnership" ? "handshake" : "mail",
      text: (
        <>
          <Link href={`/admin/submissions?id=${s.id}`} className="font-semibold hover:text-primary">
            {s.organization ?? s.name}
          </Link>{" "}
          sent a {TYPE_LABEL[s.type].toLowerCase()}.
        </>
      ),
      at: s.createdAt.getTime(),
      time: "",
    })),
    ...posts.slice(0, 3).map((p) => ({
      id: p._id,
      icon: "check_circle",
      text: (
        <>
          Blog post <span className="font-semibold">&ldquo;{p.title}&rdquo;</span>{" "}
          {p.isDraft ? "updated" : "published"}.
        </>
      ),
      at: new Date(p.publishedAt ?? p._updatedAt).getTime(),
      time: "",
    })),
  ]
    .sort((a, b) => b.at - a.at)
    .slice(0, 6)
    .map((a) => ({ ...a, time: formatDistanceToNow(a.at, { addSuffix: true }) }));

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard icon="edit_note" tag="Content" label="Total Blogs" value={counts.posts} />
        <KpiCard icon="event" tag="Content" label="Events" value={counts.events} />
        <KpiCard icon="group" tag="Staff" label="Team Members" value={counts.team} />
        <KpiCard icon="inbox" tag="Inbox" label="New Submissions" value={newCount} />
      </div>
      <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-3">
        <SubmissionTrendChart points={points} />
        <ActivityFeed items={activity} />
      </div>
    </>
  );
}

export default function AdminDashboardPage() {
  return (
    <>
      <AdminPageHeader
        title="Platform Overview"
        description="Monitor core operational metrics and recent activity."
      />
      <div className="flex flex-1 flex-col gap-6 px-margin-mobile pb-12 lg:px-margin-desktop">
        <Suspense
          fallback={
            <>
              <Skeleton className="h-40" />
              <Skeleton className="h-80" />
            </>
          }
        >
          <Dashboard />
        </Suspense>
      </div>
    </>
  );
}
