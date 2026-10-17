import { Icon } from "@/components/atoms/Icon";
import { BrowserFrame } from "@/components/molecules/BrowserFrame";
import { DocsHeading } from "@/components/molecules/DocsHeading";
import { Reveal } from "@/components/molecules/Reveal";
import { chain, configChain, industries, legend } from "@/content/appDocs";
import { cn } from "@/lib/utils";

export function DocsCalculation() {
  return (
    <section id="calc" className="scroll-mt-32 py-20 md:py-[88px]">
      <div className="container-page">
        <DocsHeading
          eyebrow="The calculation"
          title="One formula for every industry"
          lede="The engine never changes per industry. Only the activity types, units and factors change, and those are configuration."
        />
        <Reveal>
          <div className="flex flex-col gap-7 rounded-[32px] border border-outline-variant bg-surface-container-lowest p-6 md:p-8">
            <p
              className="flex flex-wrap items-center gap-x-3.5 gap-y-2.5 font-mono text-[clamp(18px,2.6vw,28px)] font-bold text-primary"
              aria-label="Emissions equal the sum over activities and gases of activity data times emission factor times global warming potential"
            >
              <span>
                E<sub>CO₂e</sub>
              </span>
              <span className="font-medium text-on-surface-variant">=</span>
              <span>Σ ( A</span>
              <span className="font-medium text-on-surface-variant">×</span>
              <span>
                EF<sub>gas</sub>
              </span>
              <span className="font-medium text-on-surface-variant">×</span>
              <span>
                GWP<sub>gas</sub> )
              </span>
            </p>
            <div className="grid grid-cols-1 gap-4 text-[15px] text-on-surface-variant md:grid-cols-3">
              {legend.map((l) => (
                <p key={l.term}>
                  <b className="font-mono text-on-surface">{l.term}</b> {l.text}
                </p>
              ))}
            </div>
            <div>
              <p className="mb-3 font-label-md text-label-md tracking-wider text-on-surface-variant uppercase">
                Worked path for one entry
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                {chain.map((c, i) => (
                  <Reveal key={c.label} from="left" delay={i * 0.15} className="flex items-center gap-2.5">
                    {i > 0 && <Icon name="arrow_forward" className="text-on-surface-variant" />}
                    <div
                      className={cn(
                        "flex flex-col gap-0.5 rounded-2xl border px-4 py-3",
                        c.end
                          ? "border-transparent bg-primary-container/20"
                          : "border-outline-variant bg-surface-container-low",
                      )}
                    >
                      <small className="font-caption text-[12px] font-semibold tracking-[0.08em] text-on-surface-variant uppercase">
                        {c.label}
                      </small>
                      <b
                        className={cn(
                          "text-[16px] text-on-surface",
                          c.bn && "font-bengali",
                          c.mono && "font-mono",
                        )}
                      >
                        {c.value}
                      </b>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <p className="text-[15px] text-on-surface-variant">
              Factors are stored with a version and source. When a factor is updated, past results stay
              reproducible and can be recalculated on purpose, never silently.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function DocsIndustries() {
  return (
    <section id="industries" className="scroll-mt-32 bg-surface-container-low py-20 md:py-[88px]">
      <div className="container-page">
        <DocsHeading
          eyebrow="Industries and companies"
          title="New industries are configuration, not code"
          lede="An industry is a template of activity types. Each company copies the template and adjusts it: its own sack weight, its own grid factor, extra types it needs. Garments can be added later the same way."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.title} delay={i * 0.08}>
              <article
                className={cn(
                  "flex h-full flex-col gap-3.5 rounded-3xl border bg-surface-container-lowest p-7",
                  ind.later ? "border-dashed border-outline" : "border-outline-variant",
                )}
              >
                <h3 className="flex items-center gap-2.5 font-headline-md text-headline-md text-on-surface">
                  <Icon name={ind.icon} className="text-primary" /> {ind.title}
                </h3>
                <p className="text-[15px] text-on-surface-variant">{ind.text}</p>
                <ul className="flex flex-wrap gap-2">
                  {ind.types.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-outline-variant bg-surface-container-low px-3 py-1.5 text-[14px] text-on-surface"
                    >
                      {t}
                    </li>
                  ))}
                  <li className="rounded-full border border-dashed border-primary px-3 py-1.5 text-[14px] font-semibold text-primary">
                    {ind.later ? "Template to be defined" : "+ add type"}
                  </li>
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 flex flex-wrap items-center gap-2.5 text-[15px]">
          {configChain.map((c, i) => (
            <span key={c} className="flex items-center gap-2.5">
              {i > 0 && <span className="text-on-surface-variant">→</span>}
              <span className="rounded-full bg-primary px-4 py-2 font-semibold text-on-primary">{c}</span>
            </span>
          ))}
        </Reveal>
        <BrowserFrame
          src="/app-demo/admintypes.webp"
          width={1600}
          height={1222}
          address="admin · activity types"
          alt="Admin page listing brick kiln activity types with their units, conversions, emission factors, GHG Protocol classification and input methods, next to a form for adding a new type called rice husk"
          caption="Admin screen: each activity type carries its local units, conversion, emission factor, GHG classification and allowed input methods. The AI banner suggests a type workers keep mentioning."
        />
      </div>
    </section>
  );
}
