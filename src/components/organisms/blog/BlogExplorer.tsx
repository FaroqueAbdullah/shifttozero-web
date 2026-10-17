"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import { IconButton } from "@/components/atoms/IconButton";
import { ChipGroup } from "@/components/molecules/ChipGroup";
import { PostCard } from "@/components/molecules/PostCard";
import { SearchInput } from "@/components/molecules/SearchInput";
import { cn } from "@/lib/utils";
import { POST_CATEGORIES, type PostCategory } from "@/sanity/constants";
import type { PostCard as PostData } from "@/sanity/lib/types";
import { EmptyState } from "../EmptyState";

const PAGE_SIZE = 6;

/**
 * Search + category chips + featured post + grid with "Load More" (client-side over a cached list).
 * Phones follow the Stitch mobile screen: chips behind a filter button, no featured hero, compact cards.
 */
export function BlogExplorer({ posts }: { posts: PostData[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PostCategory | "all">("all");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const deferredQuery = useDeferredValue(query);

  const filtering = category !== "all" || deferredQuery.trim() !== "";
  const featured = filtering ? undefined : (posts.find((p) => p.featured) ?? posts[0]);

  const results = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (!q || `${p.title} ${p.excerpt ?? ""} ${p.tags?.join(" ") ?? ""}`.toLowerCase().includes(q)),
    );
  }, [posts, category, deferredQuery]);

  // Desktop shows the featured post separately; phones list everything.
  const desktopResults = results.filter((p) => p._id !== featured?._id);
  const reset = () => setLimit(PAGE_SIZE);

  return (
    <>
      <div className="container-page mb-6 md:mb-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6 md:rounded-xl md:border md:border-surface-variant md:bg-surface-container-lowest md:p-6 md:shadow-sm">
          <div className="flex gap-2">
            <SearchInput
              label="Search articles"
              placeholder="Search articles..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                reset();
              }}
              className="md:w-96"
            />
            <IconButton
              icon="tune"
              label={filtersOpen ? "Hide filters" : "Show filters"}
              aria-expanded={filtersOpen}
              bordered
              onClick={() => setFiltersOpen((o) => !o)}
              className="h-12 w-12 rounded-lg md:hidden"
            />
          </div>
          <ChipGroup
            label="Filter by category"
            options={POST_CATEGORIES}
            value={category}
            onChange={(c) => {
              setCategory(c);
              reset();
            }}
            className={cn("w-full flex-wrap md:flex md:w-auto md:justify-end", !filtersOpen && "hidden")}
          />
        </div>
      </div>

      {featured && (
        <div className="container-page mb-20 hidden md:block">
          <PostCard post={featured} variant="featured" />
        </div>
      )}

      <section className="container-page mb-8 md:mb-20">
        <h2 className="mb-8 hidden border-b border-surface-variant pb-4 font-headline-md text-headline-md text-on-background md:block">
          {filtering ? "Search Results" : "Latest Insights"}
        </h2>
        <p className="sr-only" aria-live="polite">
          {results.length} articles found
        </p>
        {results.length ? (
          <>
            <div className="flex flex-col gap-4 md:hidden">
              {results.slice(0, limit).map((post) => (
                <PostCard key={post._id} post={post} variant="mobile" />
              ))}
            </div>
            <div className="hidden grid-cols-2 gap-gutter md:grid lg:grid-cols-3">
              {desktopResults.slice(0, limit).map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </>
        ) : (
          <EmptyState title="No articles found" text="Try a different keyword or category." />
        )}
      </section>

      {results.length > limit && (
        <div className="container-page mb-12 flex justify-center md:mb-24">
          <button
            type="button"
            onClick={() => setLimit((l) => l + PAGE_SIZE)}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-outline-variant py-3 font-label-md text-label-md text-primary transition-colors hover:bg-surface-container md:w-auto md:rounded md:border-surface-variant md:bg-surface-container md:px-8 md:text-on-surface md:hover:text-primary"
          >
            <span className="md:hidden">Load More Posts</span>
            <span className="hidden md:inline">Load More Articles</span>
            <Icon name="refresh" className="hidden text-[18px] md:inline" />
          </button>
        </div>
      )}
    </>
  );
}
