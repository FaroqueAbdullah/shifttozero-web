import { Avatar } from "@/components/atoms/Avatar";
import { SanityImage } from "@/components/atoms/SanityImage";
import { formatDate } from "@/lib/format";
import { urlFor } from "@/sanity/lib/image";
import type { Post } from "@/sanity/lib/types";

export function ArticleHeader({ post }: { post: Post }) {
  const authorPhoto = post.author?.photo?.asset ? urlFor(post.author.photo).width(96).height(96).url() : null;
  return (
    <>
      {/* Phones: full-bleed image with the title over it (Stitch mobile article). */}
      <header className="relative -mx-margin-mobile mb-6 h-80 overflow-hidden bg-inverse-surface md:hidden">
        <SanityImage image={post.coverImage} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-margin-mobile pb-5">
          <p className="mb-2 font-label-md text-label-md tracking-wider text-primary-fixed-dim uppercase">
            {post.category}
          </p>
          <h1 className="mb-2 font-headline-lg-mobile text-headline-lg-mobile text-white">{post.title}</h1>
          <p className="font-caption text-caption text-white/85">
            {post.author ? `By ${post.author.name} • ` : ""}
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </p>
        </div>
      </header>

      <header className="mb-10 hidden text-left md:block">
        <div className="mb-6 flex items-center justify-start gap-2 font-label-md text-label-md tracking-wider text-primary uppercase">
          <span>{post.category}</span>
          <span className="text-on-surface-variant">•</span>
          <span className="text-on-surface-variant">Read Time: {Math.max(1, post.readTime ?? 1)} min</span>
        </div>
        <h1 className="mb-6 font-headline-lg-mobile text-headline-lg-mobile leading-tight text-on-surface md:font-headline-xl md:text-headline-xl">
          {post.title}
        </h1>
        <div className="mt-8 flex items-center justify-start gap-4">
          {post.author && (
            <Avatar
              name={post.author.name}
              src={authorPhoto}
              size={48}
              className="border-2 border-surface-container-high"
            />
          )}
          <div className="text-left">
            {post.author && <p className="font-label-md text-label-md text-on-surface">{post.author.name}</p>}
            <time dateTime={post.publishedAt} className="font-caption text-caption text-on-surface-variant">
              {formatDate(post.publishedAt, "long")}
            </time>
          </div>
        </div>
      </header>
      {post.coverImage?.asset && (
        <div className="relative mb-12 hidden h-[500px] w-full overflow-hidden rounded-xl border border-outline-variant md:block">
          <SanityImage
            image={post.coverImage}
            alt={post.coverImage.alt ?? ""}
            fill
            priority
            sizes="(min-width: 896px) 896px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}
    </>
  );
}
