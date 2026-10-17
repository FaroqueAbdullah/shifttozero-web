import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";
import { BrowserFrame } from "@/components/molecules/BrowserFrame";
import { DocsHeading } from "@/components/molecules/DocsHeading";
import { Reveal } from "@/components/molecules/Reveal";
import { phases, recordFields, scopes, tiers } from "@/content/appDocs";
import { cn } from "@/lib/utils";

export function DocsStandards() {
  return (
    <section id="standards" className="scroll-mt-32 py-20 md:py-[88px]">
      <div className="container-page">
        <DocsHeading
          eyebrow="Standards and classification"
          title="Built on the GHG Protocol and ISO 14064-1"
          lede="Every emission record carries its scope, source category, gas and factor version, so the same data produces either framework's report."
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {scopes.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <article className="flex h-full flex-col gap-3 rounded-3xl border border-outline-variant bg-surface-container-lowest p-7">
                <span className={cn("block h-1.5 w-10 rounded-full", s.tone)} />
                <h3 className="font-headline-md text-headline-md text-on-surface">{s.title}</h3>
                <p className="text-[15px] text-on-surface-variant">{s.text}</p>
                <ul className="flex list-disc flex-col gap-1 pl-[18px] text-[15px] text-on-surface-variant">
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 overflow-x-auto rounded-3xl border border-outline-variant bg-surface-container-lowest">
          <table className="w-full min-w-[620px] border-collapse text-left text-[15px]">
            <thead>
              <tr>
                {["Every record stores", "Values", "Why"].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="border-b border-keyline bg-surface-container-low px-[18px] py-3.5 text-[12px] font-semibold tracking-[0.08em] text-on-surface-variant uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recordFields.map((r) => (
                <tr key={r.field} className="border-b border-keyline last:border-0">
                  <td className="px-[18px] py-3.5 align-top font-semibold text-on-surface">{r.field}</td>
                  <td className="px-[18px] py-3.5 align-top text-on-surface-variant">{r.values}</td>
                  <td className="px-[18px] py-3.5 align-top text-on-surface-variant">{r.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <BrowserFrame
          src="/app-demo/report.webp"
          width={1600}
          height={1556}
          address="reports · GHG inventory"
          alt="Management report with total emissions, change versus last year, intensity per 1,000 bricks, monthly emissions stacked by Scope 1, 2 and 3, emissions by source category, and intensity against a target pathway"
          caption="Management report (demo data): scopes by month, source categories, intensity against a target pathway, and further down gases, ISO 14064-1 categories and evidence coverage."
        />
      </div>
    </section>
  );
}

export function DocsArchitecture() {
  return (
    <section id="architecture" className="scroll-mt-32 bg-surface-container-low py-20 md:py-[88px]">
      <div className="container-page">
        <DocsHeading
          eyebrow="Architecture"
          title="Offline phone app, one multi-company backend"
          lede="Each company's data is isolated. The calculation engine and factor library are shared and versioned."
        />
        <div className="flex flex-col gap-3.5">
          {tiers.map((tier, i) => (
            <div key={tier.label}>
              {i > 0 && (
                <div className="grid md:grid-cols-[140px_1fr] md:gap-5" aria-hidden>
                  <span />
                  <div className="flex justify-center text-on-surface-variant">
                    <Icon name="arrow_downward" />
                  </div>
                </div>
              )}
              <Reveal delay={i * 0.08} className="grid grid-cols-1 gap-2 md:grid-cols-[140px_1fr] md:gap-5">
                <p className="text-[12px] font-semibold tracking-[0.08em] text-on-surface-variant uppercase md:pt-4">
                  {tier.label}
                </p>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3">
                  {tier.boxes.map((b) => (
                    <div
                      key={b.title}
                      className={cn(
                        "flex flex-col gap-0.5 rounded-2xl border px-4 py-3.5",
                        b.hl
                          ? "border-primary bg-primary-container/15"
                          : "border-outline-variant bg-surface-container-lowest",
                      )}
                    >
                      <b className="text-[15px] text-on-surface">{b.title}</b>
                      <span className="text-[13px] text-on-surface-variant">{b.text}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DocsRollout() {
  return (
    <section id="rollout" className="scroll-mt-32 py-20 md:py-[88px]">
      <div className="container-page">
        <DocsHeading eyebrow="Suggested rollout" title="Start small, prove it in the field" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {phases.map((p, i) => (
            <Reveal key={p.phase} delay={i * 0.08}>
              <div
                className={cn(
                  "flex flex-col gap-2.5 border-t-4 pt-5",
                  p.now ? "border-primary" : "border-outline-variant",
                )}
              >
                <span className="font-label-md text-label-md tracking-wider text-on-surface-variant uppercase">
                  {p.phase}
                  {p.now && (
                    <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-[11px] text-on-primary">
                      Now
                    </span>
                  )}
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface">{p.title}</h3>
                <ul className="flex list-disc flex-col gap-1 pl-[18px] text-[15px] text-on-surface-variant">
                  {p.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <div className="flex flex-col items-start justify-between gap-6 rounded-feature bg-primary p-8 text-on-primary md:flex-row md:items-center md:p-10">
            <div>
              <h2 className="mb-2 font-headline-md text-headline-md">Want to pilot the app at your site?</h2>
              <p className="opacity-90">
                We&apos;re looking for brick kilns and ship-breaking yards for Phase 1.
              </p>
            </div>
            <Link
              href="/contact?topic=Partnership"
              className="flex shrink-0 items-center gap-2 rounded-lg bg-surface-container-lowest px-6 py-3 font-label-md text-label-md text-primary"
            >
              Talk to us <Icon name="arrow_forward" className="text-[18px]" />
            </Link>
          </div>
          <p className="mt-6 text-center font-caption text-caption text-on-surface-variant">
            High-level design v0.1. Factor libraries, GWP set and targets to be confirmed before production.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
