import type { MetadataRoute } from "next";
import { fieldNotes } from "@/content/fieldNotes";
import { features } from "@/lib/features";
import { absoluteUrl } from "@/lib/seo";
import { getPosts } from "@/sanity/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = features.blog ? await getPosts().catch(() => []) : [];
  const pages = [
    "/",
    "/about",
    "/tools",
    "/tools/app",
    "/field-notes",
    ...fieldNotes.map((n) => `/field-notes/${n.slug}`),
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
  ];
}
