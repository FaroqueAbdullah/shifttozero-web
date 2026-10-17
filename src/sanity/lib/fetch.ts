import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type { QueryParams } from "next-sanity";
import type { ContentType } from "../contentTypes";
import { client } from "./client";

/**
 * Cached Sanity query. The Sanity webhook (/api/revalidate) refreshes the tags
 * immediately on publish; the hourly lifetime is a safety net if a webhook is missed.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags: ContentType[];
}): Promise<T> {
  "use cache";
  cacheLife("hours");
  cacheTag(...tags);
  return client.fetch<T>(query, params);
}
