"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import { ChipGroup } from "@/components/molecules/ChipGroup";
import { Reveal } from "@/components/molecules/Reveal";
import { SearchInput } from "@/components/molecules/SearchInput";
import { ToolCard } from "@/components/molecules/ToolCard";
import { TOOL_CATEGORIES, type ToolCategory } from "@/sanity/constants";
import type { CarbonTool } from "@/sanity/lib/types";
import { EmptyState } from "../EmptyState";

/** Tools page, section 2: well-known existing carbon calculators with search and category filters. */
export function ToolDirectory({ tools }: { tools: CarbonTool[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ToolCategory | "all">("all");
  const deferredQuery = useDeferredValue(query);

  const categories = TOOL_CATEGORIES.filter((c) => tools.some((t) => t.category === c));

  const visible = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return tools.filter(
      (t) =>
        (category === "all" || t.category === category) &&
        (!q ||
          `${t.name} ${t.organization ?? ""} ${t.description} ${t.category} ${t.audience ?? ""}`
            .toLowerCase()
            .includes(q)),
    );
  }, [tools, category, deferredQuery]);

  return (
    <section id="calculators" className="scroll-mt-20 bg-surface-container-low py-16 md:py-24">
      <div className="container-page">
        <Reveal className="mb-10 max-w-3xl">
          <p className="mb-3 font-label-md text-label-md tracking-wider text-primary uppercase">
            Popular carbon calculators
          </p>
          <h2 className="mb-4 font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:font-headline-xl md:text-headline-xl">
            Tools the industry uses today
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Well-known calculators and platforms for measuring emissions, from free standards to enterprise
            software. Each links to its official site.
          </p>
        </Reveal>

        <div className="mb-8 flex flex-col gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-4 md:p-6">
          <SearchInput
            label="Search tools"
            placeholder="Search by name, organization or who it's for..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <ChipGroup
            label="Filter by category"
            options={categories}
            value={category}
            onChange={setCategory}
            allLabel="All"
            className="w-full"
          />
        </div>

        <p className="sr-only" aria-live="polite">
          {visible.length} tools shown
        </p>
        {visible.length ? (
          <>
            <div className="flex flex-col gap-4 md:hidden">
              {visible.map((tool) => (
                <ToolCard key={tool._id} tool={tool} variant="row" />
              ))}
            </div>
            <div className="hidden grid-cols-2 gap-gutter md:grid lg:grid-cols-3">
              {visible.map((tool, i) => (
                <Reveal key={tool._id} delay={Math.min(i, 5) * 0.06}>
                  <ToolCard tool={tool} />
                </Reveal>
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            title={tools.length ? "No tools match your search" : "Tool list coming soon"}
            text={tools.length ? "Try a different keyword or category." : undefined}
          />
        )}

        <Reveal className="mt-12">
          <div className="flex flex-col items-start justify-between gap-4 rounded-card bg-primary p-6 text-on-primary md:flex-row md:items-center md:p-8">
            <p className="max-w-2xl font-body-lg text-body-lg">
              These tools work well for analysts. Our app brings the same standards to the people who generate
              the data.
            </p>
            <Link
              href="#our-app"
              className="flex shrink-0 items-center gap-2 rounded-lg bg-surface-container-lowest px-6 py-3 font-label-md text-label-md text-primary"
            >
              About our app <Icon name="arrow_upward" className="text-[18px]" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
