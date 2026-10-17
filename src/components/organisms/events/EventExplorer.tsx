"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { IconButton } from "@/components/atoms/IconButton";
import { ChipGroup } from "@/components/molecules/ChipGroup";
import { EventCard } from "@/components/molecules/EventCard";
import { SearchInput } from "@/components/molecules/SearchInput";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { formatMonthYear, monthKey } from "@/lib/format";
import { cn } from "@/lib/utils";
import { EVENT_TYPES, type EventType } from "@/sanity/constants";
import type { EventCard as EventData } from "@/sanity/lib/types";
import { EmptyState } from "../EmptyState";

/**
 * Upcoming events with type chips and a month selector. Desktop: sticky filter bar (Stitch events).
 * Phones: search + filter button, compact cards (Stitch mobile events).
 */
export function EventExplorer({ events }: { events: EventData[] }) {
  const [type, setType] = useState<EventType | "all">("all");
  const [month, setMonth] = useState("all");
  const [query, setQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const deferredQuery = useDeferredValue(query);

  const months = useMemo(() => {
    const seen = new Map<string, string>();
    for (const e of events) seen.set(monthKey(e.startsAt), formatMonthYear(e.startsAt));
    return [...seen.entries()];
  }, [events]);

  const q = deferredQuery.trim().toLowerCase();
  const visible = events.filter(
    (e) =>
      (type === "all" || e.eventType === type) &&
      (month === "all" || monthKey(e.startsAt) === month) &&
      (!q || `${e.title} ${e.location ?? ""} ${e.eventType}`.toLowerCase().includes(q)),
  );

  return (
    <>
      {/* Phones: search + filter toggle */}
      <div className="mb-6 flex gap-2 px-margin-mobile md:hidden">
        <SearchInput
          label="Search events"
          placeholder="Search events..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton
          icon="tune"
          label={filtersOpen ? "Hide filters" : "Show filters"}
          aria-expanded={filtersOpen}
          bordered
          onClick={() => setFiltersOpen((o) => !o)}
          className="h-12 w-12 rounded-lg"
        />
      </div>

      <div className={cn("z-10 container-page mb-8 md:sticky md:top-20 md:block", !filtersOpen && "hidden")}>
        <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-4 shadow-sm md:flex-row">
          <ChipGroup
            label="Filter by event type"
            options={EVENT_TYPES.filter((t) => events.some((e) => e.eventType === t))}
            shape="rounded"
            value={type}
            onChange={setType}
            allLabel="All Events"
            className="w-full md:w-auto"
          />
          <div className="relative w-full md:w-64">
            <label htmlFor="event-month" className="sr-only">
              Filter by month
            </label>
            <select
              id="event-month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-lg border border-outline-variant bg-surface py-2 pr-10 pl-4 font-body-md text-body-md text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="all">All Upcoming</option>
              {months.map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <section className="container-page mb-12 flex flex-col gap-4 md:mb-24 md:gap-6" aria-live="polite">
        <SectionHeader variant="bar" title="Upcoming Events" className="md:hidden" />
        {visible.length ? (
          visible.map((event) => (
            <div key={event._id}>
              <EventCard event={event} variant="compact" className="md:hidden" />
              <EventCard event={event} className="hidden md:flex" />
            </div>
          ))
        ) : (
          <EmptyState
            icon="event_busy"
            title={events.length ? "No events match these filters" : "No upcoming events"}
            text={
              events.length ? "Try another type or month." : "Check back soon or browse past events below."
            }
          />
        )}
      </section>
    </>
  );
}
