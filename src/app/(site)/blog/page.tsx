import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogExplorer } from "@/components/organisms/blog/BlogExplorer";
import { PageHero } from "@/components/organisms/site/PageHero";
import { features } from "@/lib/features";
import { getPosts } from "@/sanity/lib/content";
import { pageMetadata } from "@/lib/seo";

const description =
  "Explore the latest advancements in decarbonization technology, policy shifts, and community initiatives driving the transition to a sustainable future.";

export const metadata: Metadata = pageMetadata({ path: "/blog", title: "Blog", description });

export default async function BlogPage() {
  if (!features.blog) notFound();
  const posts = await getPosts();
  return (
    <>
      <PageHero
        title="Industry Insights & News"
        description={description}
        align="center"
        mobile={{
          title: "Blog Archive",
          description: "Insights and analysis on heavy industry decarbonization.",
        }}
      />
      <BlogExplorer posts={posts} />
    </>
  );
}
