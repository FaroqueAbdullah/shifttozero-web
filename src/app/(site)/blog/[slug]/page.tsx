import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShareButtons } from "@/components/molecules/ShareButtons";
import { TagList } from "@/components/molecules/TagList";
import { ArticleHeader } from "@/components/organisms/blog/ArticleHeader";
import { RelatedPosts } from "@/components/organisms/blog/RelatedPosts";
import { RichText } from "@/components/organisms/blog/RichText";
import { features } from "@/lib/features";
import { getPost, getPostSlugs, toStaticParams } from "@/sanity/lib/content";
import { urlFor } from "@/sanity/lib/image";

export async function generateStaticParams() {
  return toStaticParams(features.blog ? await getPostSlugs() : []);
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  if (!features.blog) return {};
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const image = post.coverImage?.asset ? urlFor(post.coverImage).width(1200).height(630).url() : undefined;
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  if (!features.blog) notFound();
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="container-page pb-12 md:py-20">
      <article className="mx-auto max-w-4xl">
        <ArticleHeader post={post} />
        {/* First paragraph is the lead, as in the Stitch article. */}
        <RichText
          value={post.body}
          className="font-body-md text-body-md text-on-surface-variant md:font-body-lg md:text-body-lg [&>p:first-child]:font-body-lg [&>p:first-child]:text-body-lg [&>p:first-child]:text-on-surface md:[&>p:first-child]:text-[20px] md:[&>p:first-child]:leading-8 md:[&>p:first-child]:font-semibold"
        />
        <div className="mt-12 flex flex-col gap-8 border-t border-surface-container-highest pt-8">
          <TagList tags={post.tags} />
          <ShareButtons title={post.title} />
        </div>
      </article>
      <RelatedPosts posts={post.related} />
    </div>
  );
}
