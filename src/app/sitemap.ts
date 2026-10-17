import type { MetadataRoute } from "next";
import { features } from "@/lib/features";
import { getEvents, getPosts } from "@/sanity/lib/content";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, events] = await Promise.all([features.blog ? getPosts().catch(() => []) : [], getEvents().catch(() => [])]);
  const pages = ["", "/tools", "/events", /* "/blog", "/team", */ "/get-involved", "/privacy", "/terms"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}` })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.publishedAt })),
    ...events.map((e) => ({ url: `${base}/events/${e.slug}` })),
  ];
}
