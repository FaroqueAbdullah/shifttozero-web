"use client";

import { useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { EVENT_TYPES } from "@/sanity/constants";
import type { AdminEventRow } from "@/sanity/lib/types";
import { DataTable } from "./DataTable";
import { RowActions } from "./RowActions";

const typeIcon: Record<string, string> = {
  Summit: "factory",
  Workshop: "construction",
  Webinar: "videocam",
  Conference: "groups",
};
const start = (r: AdminEventRow) => new Date(r.startsAt ?? 0).getTime();

/** Upcoming / Past toggle on top of the shared table. `now` comes from the server render. */
export function EventsTable({ events, now }: { events: AdminEventRow[]; now: number }) {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const rows = events.filter((e) => (tab === "upcoming" ? start(e) >= now : start(e) < now));

  return (
    <div className="flex flex-col gap-6">
      <div
        role="tablist"
        aria-label="Event timeframe"
        className="inline-flex self-start rounded-lg border border-outline-variant bg-surface p-1"
      >
        {(["upcoming", "past"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-md px-4 py-1.5 font-label-md text-label-md capitalize transition-colors",
              tab === t
                ? "bg-primary-container text-on-primary-container"
                : "text-on-surface-variant hover:text-primary",
            )}
          >
            {t === "past" ? "Past Events" : "Upcoming"}
          </button>
        ))}
      </div>
      <DataTable
        key={tab}
        rows={rows}
        rowKey={(r) => r._id}
        itemLabel="events"
        searchLabel="Search events"
        searchText={(r) => `${r.title} ${r.location ?? ""} ${r.eventType ?? ""}`}
        filter={{ label: "Type", options: EVENT_TYPES, value: (r) => r.eventType }}
        sorts={[
          tab === "upcoming"
            ? { label: "Date (Soonest)", compare: (a, b) => start(a) - start(b) }
            : { label: "Date (Most Recent)", compare: (a, b) => start(b) - start(a) },
          { label: "Name (A-Z)", compare: (a, b) => a.title.localeCompare(b.title) },
        ]}
        columns={[
          {
            header: "Event Name",
            className: "w-1/3",
            cell: (r) => (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary-container text-on-secondary-container">
                  <Icon name={typeIcon[r.eventType ?? ""] ?? "event"} />
                </div>
                <div>
                  <div className="font-semibold text-on-surface">{r.title}</div>
                  <div className="mt-0.5 flex items-center gap-1 font-caption text-caption text-on-surface-variant">
                    <Icon name="sell" className="text-[14px]" /> {r.eventType ?? "Event"}
                  </div>
                </div>
              </div>
            ),
          },
          { header: "Date", cell: (r) => <span className="text-on-surface">{formatDate(r.startsAt)}</span> },
          {
            header: "Location",
            cell: (r) => <span className="text-on-surface-variant">{r.location ?? r.mode ?? "—"}</span>,
          },
          {
            header: "Capacity",
            cell: (r) => (
              <span className="text-on-surface">{r.capacity ? r.capacity.toLocaleString("en-US") : "—"}</span>
            ),
          },
          {
            header: "Actions",
            align: "right",
            cell: (r) => <RowActions id={r._id} type="event" title={r.title} />,
          },
        ]}
      />
    </div>
  );
}
