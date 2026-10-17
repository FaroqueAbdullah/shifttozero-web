import { PostCard } from "@/components/molecules/PostCard";
import type { PostCard as PostData } from "@/sanity/lib/types";

export function RelatedPosts({ posts }: { posts: PostData[] }) {
  if (!posts.length) return null;
  return (
    <section className="mx-auto mt-12 max-w-container-max border-t border-outline-variant pt-10 md:mt-24 md:pt-16">
      <h2 className="mb-8 font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:font-headline-lg md:text-headline-lg">
        Related Insights
      </h2>
      <div className="flex flex-col gap-4 md:hidden">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} variant="mobile" />
        ))}
      </div>
      <div className="hidden grid-cols-3 gap-gutter md:grid">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}
