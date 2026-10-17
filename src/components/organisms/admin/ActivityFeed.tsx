import { ActivityItem } from "@/components/molecules/ActivityItem";

export type Activity = { id: string; icon: string; text: React.ReactNode; time: string };

export function ActivityFeed({ items }: { items: Activity[] }) {
  return (
    <section className="flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest">
      <div className="border-b border-outline-variant p-6">
        <h2 className="font-headline-md text-headline-md text-on-surface">Recent Activity</h2>
      </div>
      {items.length ? (
        <ul className="flex flex-col gap-6 p-6">
          {items.map((a) => (
            <ActivityItem key={a.id} icon={a.icon} text={a.text} time={a.time} />
          ))}
        </ul>
      ) : (
        <p className="p-6 font-body-md text-body-md text-on-surface-variant">Nothing yet.</p>
      )}
    </section>
  );
}
