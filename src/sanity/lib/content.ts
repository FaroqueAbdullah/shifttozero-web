import "server-only";
import { sanityFetch } from "./fetch";
import {
  ADMIN_EVENTS_QUERY,
  ADMIN_POSTS_QUERY,
  ADMIN_TEAM_QUERY,
  CONTENT_COUNTS_QUERY,
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

/**
 * Cache Components requires generateStaticParams to return at least one entry.
 * With no content yet, a placeholder slug is returned and the page 404s for it.
 */
export const PLACEHOLDER_SLUG = "__placeholder__";
export const toStaticParams = (slugs: string[]) =>
  (slugs.length ? slugs : [PLACEHOLDER_SLUG]).map((slug) => ({ slug }));
