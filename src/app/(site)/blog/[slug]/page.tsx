import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/atoms/JsonLd";
import { ShareButtons } from "@/components/molecules/ShareButtons";
import { TagList } from "@/components/molecules/TagList";
import { ArticleHeader } from "@/components/organisms/blog/ArticleHeader";
import { RelatedPosts } from "@/components/organisms/blog/RelatedPosts";
import { RichText } from "@/components/organisms/blog/RichText";
import { features } from "@/lib/features";
import { absoluteUrl, ORGANIZATION_ID, pageMetadata, shareImageUrl } from "@/lib/seo";
import { getPost, getPostSlugs, toStaticParams } from "@/sanity/lib/content";

export async function generateStaticParams() {
  return toStaticParams(features.blog ? await getPostSlugs() : []);
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  if (!features.blog) return {};
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return pageMetadata({
    path: `/blog/${slug}`,
    title: post.title,
    description: post.excerpt,
    image: post.coverImage,
    seo: post.seo,
    type: "article",
    publishedTime: post.publishedAt,
  });
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  if (!features.blog) notFound();
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const image = shareImageUrl(post.coverImage);

  return (
    <div className="container-page pb-12 md:py-20">
      <JsonLd
        data={{
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          url: absoluteUrl(`/blog/${slug}`),
          mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
          ...(image && { image }),
          ...(post.publishedAt && { datePublished: post.publishedAt }),
          ...(post._updatedAt && { dateModified: post._updatedAt }),
          ...(post.author?.name && { author: { "@type": "Person", name: post.author.name } }),
          publisher: { "@id": ORGANIZATION_ID },
          ...(post.tags?.length && { keywords: post.tags.join(", ") }),
        }}
      />
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
