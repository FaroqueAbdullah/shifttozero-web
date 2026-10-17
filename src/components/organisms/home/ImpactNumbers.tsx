import { AnimatedNumber } from "@/components/atoms/AnimatedNumber";
import { Icon } from "@/components/atoms/Icon";
import { FactoryGrid } from "@/components/molecules/FactoryGrid";
import { Reveal } from "@/components/molecules/Reveal";
import type { SiteSettings } from "@/sanity/lib/types";

const bigNumber =
  "block font-headline text-[clamp(56px,9vw,112px)] leading-none font-bold tracking-[-0.03em] tabular-nums";

/** Decorative CO₂ bubbles that rise and fade (the "reduction" metaphor). */
function Bubbles() {
  const bubbles = [
    { left: "6%", size: 56, delay: "0s" },
    { left: "22%", size: 36, delay: "1.6s" },
    { left: "40%", size: 48, delay: "3.1s" },
    { left: "58%", size: 32, delay: "0.8s" },
    { left: "72%", size: 52, delay: "2.4s" },
    { left: "88%", size: 40, delay: "4s" },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-full overflow-hidden">
      {bubbles.map((b) => (
        <span
          key={b.left}
          className="absolute bottom-[-40px] flex items-center justify-center rounded-full border border-white/50 bg-white/15 font-label-md text-[11px] text-white opacity-0 backdrop-blur-[1px] motion-safe:animate-bubble"
          style={{ left: b.left, width: b.size, height: b.size, animationDelay: b.delay }}
        >
          CO₂
        </span>
      ))}
    </div>
  );
}

/** Section between "What we do" and the app demo: factories onboarded and carbon reduced. */
export function ImpactNumbers({ impact }: Pick<SiteSettings, "impact">) {
  const factories = impact?.factories;
  const carbon = impact?.carbon;
  if (factories?.value == null && carbon?.value == null) return null;

  return (
    <section
      id="impact"
      className="relative scroll-mt-20 overflow-hidden bg-surface-container-low py-20 md:py-28"
    >
      <div aria-hidden className="absolute inset-0 bg-tech-pattern opacity-50" />
      <div className="relative container-page">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          {impact?.eyebrow && (
            <p className="mb-3 font-label-md text-label-md tracking-wider text-primary uppercase">
              {impact.eyebrow}
            </p>
          )}
          {impact?.title && (
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:font-headline-xl md:text-headline-xl">
              {impact.title}
            </h2>
          )}
        </Reveal>

        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-2">
          {factories?.value != null && (
            <Reveal from="left">
              <div className="flex h-full flex-col gap-6 rounded-feature border border-outline-variant bg-surface-container-lowest p-8 shadow-ambient md:p-10">
                <div className="flex items-center gap-3 text-primary">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container/20">
                    <Icon name="factory" filled />
                  </span>
                  <span className="font-label-md text-label-md tracking-wider uppercase">
                    {factories.label}
                  </span>
                </div>
                <AnimatedNumber
                  value={factories.value}
                  suffix={factories.suffix}
                  duration={2}
                  className={`${bigNumber} text-primary`}
                />
                <FactoryGrid total={factories.value} />
                {factories.note && (
                  <p className="font-body-md text-body-md text-on-surface-variant">{factories.note}</p>
                )}
              </div>
            </Reveal>
          )}

          {carbon?.value != null && (
            <Reveal from="right" delay={0.1}>
              <div className="relative flex h-full flex-col gap-6 overflow-hidden rounded-feature bg-gradient-to-br from-primary to-primary-container p-8 text-on-primary shadow-ambient md:p-10">
                <Bubbles />
                <div className="relative flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                    <Icon name="eco" filled />
                  </span>
                  <span className="font-label-md text-label-md tracking-wider uppercase opacity-90">
                    {carbon.label}
                  </span>
                </div>
                <AnimatedNumber
                  value={carbon.value}
                  decimals={carbon.decimals ?? 0}
                  suffix={carbon.suffix}
                  duration={2.2}
                  className={`relative ${bigNumber}`}
                />
                <p className="relative flex items-center gap-2 font-headline-md text-headline-md opacity-95">
                  <Icon name="trending_down" className="text-[28px]" /> tCO₂e
                </p>
                {carbon.note && (
                  <p className="relative mt-auto font-body-md text-body-md opacity-90">{carbon.note}</p>
                )}
              </div>
            </Reveal>
          )}
        </div>

        {impact?.asOf && (
          <p className="mt-6 text-center font-caption text-caption text-on-surface-variant">{impact.asOf}</p>
        )}
      </div>
    </section>
  );
}
