import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";
import { SanityImage } from "@/components/atoms/SanityImage";
import { formatDate, readTimeLabel } from "@/lib/format";
import type { PostCard as PostCardData } from "@/sanity/lib/types";
import { cn } from "@/lib/utils";

type PostCardProps = {
  post: PostCardData;
  /**
   * "compact": image + category + title (Home carousel).
   * "grid": image, category/date, title, excerpt, "Read More" (Blog grid, related posts).
   * "featured": full-bleed image with overlay text (Blog featured post).
   * "list": text-only card with category pill (Home on phones).
   * "mobile": compact image card with the category pill on the image (Blog on phones).
   */
  variant?: "compact" | "grid" | "featured" | "list" | "mobile";
  className?: string;
};

/** Category pill colors (Stitch mobile blog). */
const pillTone: Record<string, string> = {
  Policy: "bg-primary text-on-primary",
  Technology: "bg-tertiary-container text-on-tertiary-container",
  "Case Study": "bg-secondary-container text-on-secondary-container",
  Community: "bg-surface-container-highest text-on-surface",
};

export function PostCard({ post, variant = "grid", className }: PostCardProps) {
  const href = `/blog/${post.slug}`;

  if (variant === "featured") {
    return (
      <Link
        href={href}
        className={cn(
          "group relative block h-[400px] overflow-hidden rounded-2xl border border-surface-variant shadow-sm transition-all duration-300 hover:shadow-ambient md:h-[500px]",
          className,
        )}
      >
        <SanityImage
          image={post.coverImage}
          alt=""
          fill
          priority
          sizes="(min-width: 1280px) 1184px, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Fixed dark overlay in both themes so the white text stays readable on any photo. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded bg-primary/90 px-3 py-1 font-label-md text-label-md text-on-primary uppercase backdrop-blur-sm">
              {post.category}
            </span>
            <span className="flex items-center gap-1 font-caption text-caption text-white/80">
              <Icon name="schedule" className="text-[16px]" /> {readTimeLabel(post.readTime)}
            </span>
          </div>
          <h2 className="mb-4 max-w-3xl font-headline-lg-mobile text-headline-lg-mobile text-white transition-colors group-hover:text-primary-fixed md:font-headline-lg md:text-headline-lg">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="hidden max-w-2xl font-body-md text-body-md text-white/80 md:block">
              {post.excerpt}
            </p>
          )}
          <div className="mt-6 flex items-center font-label-md text-label-md text-primary-fixed group-hover:underline">
            Read Featured Article
            <Icon
              name="arrow_forward"
              className="ml-1 text-[16px] transition-transform group-hover:translate-x-1"
            />
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "mobile") {
    return (
      <Link
        href={href}
        className={cn(
          "flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest",
          className,
        )}
      >
        <div className="relative h-36 w-full bg-surface-container">
          <SanityImage image={post.coverImage} alt="" fill sizes="100vw" className="object-cover" />
          <span
            className={cn(
              "absolute top-3 left-3 rounded-full px-2.5 py-1 font-label-md text-[11px] tracking-wider uppercase",
              pillTone[post.category],
            )}
          >
            {post.category}
          </span>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <h3 className="font-headline-md text-[17px] leading-6 font-bold text-on-surface">{post.title}</h3>
          {post.excerpt && (
            <p className="line-clamp-2 font-caption text-caption text-on-surface-variant">{post.excerpt}</p>
          )}
          <div className="mt-1 flex items-center justify-between font-caption text-caption text-on-surface-variant">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span className="flex items-center gap-1">
              <Icon name="timer" className="text-[14px]" /> {readTimeLabel(post.readTime)}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "list") {
    return (
      <article
        className={cn(
          "flex flex-col gap-2 rounded-xl border border-surface-container-high bg-surface-container-lowest p-4",
          className,
        )}
      >
        <span
          className={cn(
            "w-fit rounded-full px-2 py-0.5 font-label-md text-[10px] tracking-wider uppercase",
            post.category === "Technology"
              ? "bg-tertiary-container text-on-tertiary-container"
              : "bg-primary text-on-primary",
          )}
        >
          {post.category}
        </span>
        <h3 className="font-label-md leading-tight text-on-background">
          <Link href={href}>{post.title}</Link>
        </h3>
        <div className="mt-1 flex items-center justify-between">
          <time dateTime={post.publishedAt} className="font-caption text-caption text-on-surface-variant">
            {formatDate(post.publishedAt)}
          </time>
          <Link
            href={href}
            className="font-label-md text-label-md text-primary hover:underline"
            aria-label={`Read ${post.title}`}
          >
            Read More
          </Link>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className={cn(
          "group flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest transition-shadow hover:shadow-md",
          className,
        )}
      >
        <div className="relative h-40 w-full border-b border-outline-variant bg-surface-container">
          <SanityImage image={post.coverImage} alt="" fill sizes="320px" className="object-cover" />
        </div>
        <div className="p-6">
          <div className="mb-2 font-label-md text-label-md text-primary">{post.category}</div>
          <h3 className="mb-2 line-clamp-2 font-headline-md text-headline-md text-on-surface group-hover:text-primary">
            {post.title}
          </h3>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-surface-variant bg-surface-container-lowest transition-all duration-300 hover:shadow-ambient",
        className,
      )}
    >
      <div className="relative h-48 overflow-hidden bg-surface-container">
        <SanityImage
          image={post.coverImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <article className="flex flex-grow flex-col p-6">
        <div className="mb-3 flex items-start justify-between gap-2">
          <span className="font-label-md text-label-md text-primary">{post.category}</span>
          <time dateTime={post.publishedAt} className="font-caption text-caption text-on-surface-variant">
            {formatDate(post.publishedAt)}
          </time>
        </div>
        <h3 className="mb-3 font-headline-md text-headline-md leading-tight text-on-background transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mb-6 line-clamp-3 flex-grow font-body-md text-body-md text-on-surface-variant">
            {post.excerpt}
          </p>
        )}
        <span className="mt-auto inline-flex items-center font-label-md text-label-md text-primary group-hover:underline">
          Read More <Icon name="chevron_right" className="ml-1 text-[16px]" />
        </span>
      </article>
    </Link>
  );
}
