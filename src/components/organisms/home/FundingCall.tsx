import Link from "next/link";
import { AnimatedNumber } from "@/components/atoms/AnimatedNumber";
import { Icon } from "@/components/atoms/Icon";
import { Reveal } from "@/components/molecules/Reveal";
import type { SiteSettings } from "@/sanity/lib/types";
import { GrowBar } from "./GrowBar";

/**
 * Section 4: ask for funding. "Where funding goes" is one series (share of budget),
 * so it's labelled bars in a single hue rather than a multi-colour chart.
 */
export function FundingCall({ funding, brochureUrl }: Pick<SiteSettings, "funding" | "brochureUrl">) {
  if (!funding?.title) return null;
  return (
    <section
      id="support"
      className="relative scroll-mt-20 overflow-hidden bg-primary py-20 text-on-primary md:py-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-fixed blur-3xl motion-safe:animate-drift" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-tertiary-fixed blur-3xl motion-safe:animate-drift-slow" />
      </div>
      <div className="relative container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <Reveal from="left">
          <p className="mb-3 flex items-center gap-2 font-label-md text-label-md tracking-wider uppercase opacity-80">
            <Icon name="volunteer_activism" filled className="text-[18px]" /> Support our research
          </p>
          <h2 className="mb-6 font-headline-lg-mobile text-headline-lg-mobile md:font-headline-xl md:text-headline-xl">
            {funding.title}
          </h2>
          {funding.text && <p className="mb-10 font-body-lg text-body-lg opacity-90">{funding.text}</p>}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact?topic=Funding"
              className="group flex items-center justify-center gap-2 rounded-lg bg-surface-container-lowest px-8 py-4 font-label-md text-label-md text-primary shadow-lg transition-all hover:-translate-y-0.5"
            >
              Talk to us about funding
              <Icon name="arrow_forward" className="transition-transform group-hover:translate-x-1" />
            </Link>
            {brochureUrl && (
              <a
                href={`${brochureUrl}?dl=`}
                className="flex items-center justify-center gap-2 rounded-lg border-2 border-on-primary px-8 py-4 font-label-md text-label-md transition-colors hover:bg-on-primary/10"
              >
                <Icon name="download" /> Download brochure
              </a>
            )}
          </div>
        </Reveal>

        {funding.allocation?.length ? (
          <Reveal from="right" delay={0.15}>
            <div className="rounded-feature bg-surface-container-lowest p-6 text-on-surface shadow-2xl md:p-8">
              <p className="mb-6 font-headline-md text-headline-md">Where your support goes</p>
              <ul className="flex flex-col gap-5">
                {funding.allocation.map((a, i) => (
                  <li key={a._key}>
                    <div className="mb-2 flex items-baseline justify-between gap-4">
                      <span className="font-body-md text-body-md">{a.label}</span>
                      <AnimatedNumber
                        value={a.percent}
                        suffix="%"
                        className="font-headline-md text-headline-md text-primary"
                      />
                    </div>
                    <GrowBar percent={a.percent} delay={0.12 * i} className="bg-primary" />
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex items-center gap-2 font-caption text-caption text-on-surface-variant">
                <Icon name="verified" className="text-[16px] text-primary" /> We publish how every
                contribution is used.
              </p>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
