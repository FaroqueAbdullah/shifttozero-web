"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import { IconButton } from "@/components/atoms/IconButton";
import { PostCard } from "@/components/molecules/PostCard";
import { Reveal } from "@/components/molecules/Reveal";
import type { PostCard as PostData } from "@/sanity/lib/types";

/** Section 5: horizontal, swipeable list of the latest posts with arrow controls. */
export function BlogCarousel({ posts }: { posts: PostData[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    update();
    const el = track.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.clientWidth + 24), behavior: "smooth" });
  };

  if (!posts.length) return null;

  return (
    <section id="blog" className="scroll-mt-20 overflow-hidden py-20 md:py-28">
      <div className="container-page mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal from="left">
          <p className="mb-3 font-label-md text-label-md tracking-wider text-primary uppercase">
            From our blog
          </p>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:font-headline-xl md:text-headline-xl">
            Research, stories &amp; updates
          </h2>
        </Reveal>
        <div className="flex items-center gap-3">
          <IconButton
            icon="arrow_back"
            label="Previous articles"
            bordered
            disabled={atStart}
            onClick={() => scrollByCard(-1)}
            className="disabled:opacity-30"
          />
          <IconButton
            icon="arrow_forward"
            label="Next articles"
            bordered
            disabled={atEnd}
            onClick={() => scrollByCard(1)}
            className="disabled:opacity-30"
          />
          <Link
            href="/blog"
            className="ml-2 flex items-center gap-1 font-label-md text-label-md text-primary hover:underline"
          >
            Read all <Icon name="arrow_forward" className="text-[18px]" />
          </Link>
        </div>
      </div>

      <ul
        ref={track}
        aria-label="Latest articles"
        className="flex snap-x snap-mandatory scroll-px-margin-mobile [scrollbar-width:none] gap-6 overflow-x-auto scroll-smooth px-margin-mobile pb-6 md:scroll-px-margin-desktop md:px-margin-desktop xl:scroll-px-[calc((100vw_-_1280px)/2_+_48px)] xl:px-[calc((100vw_-_1280px)/2_+_48px)] [&::-webkit-scrollbar]:hidden"
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !track.current) return;
          drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d || !track.current) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 4) d.moved = true;
          track.current.scrollLeft = d.left - dx;
        }}
        onPointerUp={() => {
          setTimeout(() => (drag.current = null), 0);
        }}
        onPointerLeave={() => (drag.current = null)}
        onClickCapture={(e) => {
          if (drag.current?.moved) e.preventDefault();
        }}
      >
        {posts.map((post, i) => (
          <Reveal
            as="li"
            key={post._id}
            delay={Math.min(i, 4) * 0.08}
            from="right"
            className="w-[280px] shrink-0 snap-start sm:w-[340px]"
          >
            <PostCard post={post} className="h-full" />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
