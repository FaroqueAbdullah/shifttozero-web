import type { MetadataRoute } from "next";
import { features } from "@/lib/features";
import { absoluteUrl } from "@/lib/seo";
import { getEvents, getPosts } from "@/sanity/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, events] = await Promise.all([
    features.blog ? getPosts().catch(() => []) : [],
    getEvents().catch(() => []),
  ]);
  const pages = [
    "/",
    "/tools",
    "/tools/app",
    "/events",
    ...(features.blog ? ["/blog"] : []),
    ...(features.team ? ["/team"] : []),
    "/get-involved",
    "/contact",
    "/privacy",
    "/terms",
  ];
  return [
    ...pages.map((p) => ({ url: absoluteUrl(p) })),
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p._updatedAt ?? p.publishedAt,
    })),
    ...events.map((e) => ({ url: absoluteUrl(`/events/${e.slug}`), lastModified: e._updatedAt })),
  ];
}
