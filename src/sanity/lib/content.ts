import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { sanityFetch } from "./fetch";
import {
  ADMIN_EVENTS_QUERY,
  ADMIN_POSTS_QUERY,
  ADMIN_TEAM_QUERY,
  CONTENT_COUNTS_QUERY,
  EVENT_QUERY,
  EVENT_SLUGS_QUERY,
  EVENTS_QUERY,
  LATEST_POSTS_QUERY,
  POST_QUERY,
  POST_SLUGS_QUERY,
  POSTS_QUERY,
  SITE_SETTINGS_QUERY,
  TEAM_QUERY,
  TOOLS_QUERY,
} from "./queries";
import type {
  AdminEventRow,
  AdminPostRow,
  AdminTeamRow,
  CarbonTool,
  ContentCounts,
  EventCard,
  EventDetail,
  Post,
  PostCard,
  SiteSettings,
  TeamMember,
} from "./types";

/*
 * Content API used by pages. Each function declares the cache tags it depends
 * on, so the Sanity webhook revalidates exactly the pages that changed.
 */

export const getSiteSettings = () =>
  sanityFetch<SiteSettings | null>({ query: SITE_SETTINGS_QUERY, tags: ["siteSettings"] }).then(
    (s) => s ?? {},
  );

export const getPosts = () => sanityFetch<PostCard[]>({ query: POSTS_QUERY, tags: ["post", "teamMember"] });

export const getLatestPosts = (limit: number) =>
  sanityFetch<PostCard[]>({ query: LATEST_POSTS_QUERY, params: { limit }, tags: ["post", "teamMember"] });

export const getPost = (slug: string) =>
  sanityFetch<Post | null>({ query: POST_QUERY, params: { slug }, tags: ["post", "teamMember"] });

export const getPostSlugs = () => sanityFetch<string[]>({ query: POST_SLUGS_QUERY, tags: ["post"] });

export const getEvents = () => sanityFetch<EventCard[]>({ query: EVENTS_QUERY, tags: ["event"] });

export const getEvent = (slug: string) =>
  sanityFetch<EventDetail | null>({ query: EVENT_QUERY, params: { slug }, tags: ["event", "teamMember"] });

export const getEventSlugs = () => sanityFetch<string[]>({ query: EVENT_SLUGS_QUERY, tags: ["event"] });

export const getTeam = () => sanityFetch<TeamMember[]>({ query: TEAM_QUERY, tags: ["teamMember"] });

export const getTools = () => sanityFetch<CarbonTool[]>({ query: TOOLS_QUERY, tags: ["carbonTool"] });

export const getContentCounts = () =>
  sanityFetch<ContentCounts>({ query: CONTENT_COUNTS_QUERY, tags: ["post", "event", "teamMember"] });

export const getAdminPosts = () =>
  sanityFetch<AdminPostRow[]>({ query: ADMIN_POSTS_QUERY, tags: ["post", "teamMember"] });

export const getAdminEvents = () =>
  sanityFetch<AdminEventRow[]>({ query: ADMIN_EVENTS_QUERY, tags: ["event"] });

export const getAdminTeam = () =>
  sanityFetch<AdminTeamRow[]>({ query: ADMIN_TEAM_QUERY, tags: ["teamMember"] });

/** Split events around "now". Upcoming: soonest first. Past: most recent first. */
export function splitEvents(events: EventCard[], now = Date.now()) {
  const ends = (e: EventCard) => new Date(e.endsAt ?? e.startsAt).getTime();
  return {
    upcoming: events.filter((e) => ends(e) >= now),
    past: events.filter((e) => ends(e) < now).reverse(),
  };
}

/**
 * Events grouped into upcoming/past. Cached for an hour so events move to
 * "Past" on their own, and revalidated immediately when an event is edited.
 */
export async function getEventsByTime() {
  "use cache";
  cacheLife("hours");
  cacheTag("event");
  return splitEvents(await getEvents());
}

/**
 * Cache Components requires generateStaticParams to return at least one entry.
 * With no content yet, a placeholder slug is returned and the page 404s for it.
 */
export const PLACEHOLDER_SLUG = "__placeholder__";
export const toStaticParams = (slugs: string[]) =>
  (slugs.length ? slugs : [PLACEHOLDER_SLUG]).map((slug) => ({ slug }));
