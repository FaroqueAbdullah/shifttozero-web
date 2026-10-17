import Link from "next/link";
import { AnimatedNumber } from "@/components/atoms/AnimatedNumber";
import { GradientBackdrop } from "@/components/atoms/GradientBackdrop";
import { Icon } from "@/components/atoms/Icon";
import { AnimatedHeadline } from "@/components/molecules/AnimatedHeadline";
import { Reveal } from "@/components/molecules/Reveal";
import type { SiteSettings } from "@/sanity/lib/types";
import { GrowBar } from "./GrowBar";

type WhatWeDoProps = Pick<SiteSettings, "whatWeDo" | "emissionsBreakdown" | "emissionsFootnote">;

const barTone = ["bg-primary", "bg-tertiary", "bg-primary-container", "bg-outline"];

/** Section 1: who we are and why it matters (opening section of Home). */
export function WhatWeDo({ whatWeDo, emissionsBreakdown, emissionsFootnote }: WhatWeDoProps) {
  const content = whatWeDo ?? {};
  return (
    <section id="what-we-do" className="relative isolate overflow-hidden">
      <GradientBackdrop className="-z-10" />
      <div className="container-page grid min-h-[calc(100svh-5rem)] grid-cols-1 items-center gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <div className="flex flex-col gap-6 lg:col-span-7">
          {content.eyebrow && (
            <p className="flex items-center gap-2 font-label-md text-label-md tracking-wider text-primary uppercase motion-safe:animate-word-rise">
              <span className="h-2 w-2 rounded-full bg-primary motion-safe:animate-pulse" />
              {content.eyebrow}
            </p>
          )}
          <AnimatedHeadline
            text={content.title ?? "Cutting industrial carbon in Bangladesh, one factory at a time."}
          />
          {content.text && (
            <p
              className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant motion-safe:animate-word-rise"
              style={{ animationDelay: "500ms" }}
            >
              {content.text}
            </p>
          )}
          <div
            className="flex flex-col gap-4 pt-2 motion-safe:animate-word-rise sm:flex-row"
            style={{ animationDelay: "700ms" }}
          >
            <Link
              href="#app"
              className="group flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 font-label-md text-label-md text-on-primary shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary-container hover:text-on-primary-container"
            >
              See our app
              <Icon name="arrow_downward" className="transition-transform group-hover:translate-y-0.5" />
            </Link>
            <Link
              href="/get-involved"
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-secondary px-8 py-3 font-label-md text-label-md text-secondary transition-colors hover:bg-secondary/5"
            >
              Get involved <Icon name="group" filled />
            </Link>
          </div>
        </div>

        {emissionsBreakdown?.length ? (
          <Reveal from="right" delay={0.3} className="lg:col-span-5">
            <div className="rounded-feature border border-outline-variant bg-surface-container-lowest/80 p-6 shadow-ambient backdrop-blur md:p-8">
              <p className="mb-6 font-label-md text-label-md tracking-wider text-primary uppercase">
                Bangladesh industrial emissions
              </p>
              <ul className="flex flex-col gap-5">
                {emissionsBreakdown.map((item, i) => (
                  <li key={item._key}>
                    <div className="mb-2 flex items-baseline justify-between">
                      <span className="font-body-md text-body-md text-on-surface">{item.label}</span>
                      <AnimatedNumber
                        value={item.percent}
                        suffix="%"
                        className="font-headline-md text-headline-md text-on-surface"
                      />
                    </div>
                    <GrowBar percent={item.percent} delay={0.1 * i} className={barTone[i % barTone.length]} />
                  </li>
                ))}
              </ul>
              {emissionsFootnote && (
                <p className="mt-6 font-caption text-caption text-outline italic">{emissionsFootnote}</p>
              )}
            </div>
          </Reveal>
        ) : null}
      </div>

      {content.pillars?.length ? (
        <div className="container-page grid grid-cols-1 gap-gutter pb-20 md:grid-cols-3">
          {content.pillars.map((p, i) => (
            <Reveal key={p._key} delay={i * 0.12}>
              <div className="group h-full rounded-card border border-outline-variant bg-surface-container-lowest p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-ambient">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-container/20 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Icon name={p.icon || "eco"} filled />
                </div>
                <h3 className="mb-2 font-headline-md text-headline-md text-on-surface">{p.title}</h3>
                {p.text && <p className="font-body-md text-body-md text-on-surface-variant">{p.text}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      ) : null}
    </section>
  );
}
