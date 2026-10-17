import { Icon } from "@/components/atoms/Icon";
import { DocsHeading } from "@/components/molecules/DocsHeading";
import { FlowCards } from "@/components/molecules/FlowCards";
import { Reveal } from "@/components/molecules/Reveal";
import { docsHero, people } from "@/content/appDocs";

export function DocsHero() {
  return (
    <header className="overflow-hidden bg-primary pt-16 pb-20 text-on-primary md:pt-[72px] md:pb-24">
      <div className="container-page grid grid-cols-1 items-center gap-12 min-[860px]:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-6">
          <p className="font-label-md text-label-md tracking-wider uppercase opacity-80 motion-safe:animate-rise">
            {docsHero.eyebrow}
          </p>
          <h1
            className="text-[clamp(36px,5.4vw,60px)] leading-[1.05] font-bold tracking-[-0.02em] motion-safe:animate-rise"
            style={{ animationDelay: "0.1s" }}
          >
            {docsHero.title}
          </h1>
          <p
            className="max-w-[66ch] font-body-lg text-body-lg opacity-90 motion-safe:animate-rise"
            style={{ animationDelay: "0.2s" }}
          >
            {docsHero.lede}
          </p>
          <ul className="flex flex-wrap gap-3 motion-safe:animate-rise" style={{ animationDelay: "0.3s" }}>
            {docsHero.facts.map((f) => (
              <li key={f} className="rounded-full border border-white/25 px-4 py-2 text-[14px] font-medium">
                {f}
              </li>
            ))}
          </ul>
        </div>
        <FlowCards />
      </div>
    </header>
  );
}

export function DocsPeople() {
  return (
    <section id="people" className="scroll-mt-32 py-20 md:py-[88px]">
      <div className="container-page">
        <DocsHeading
          eyebrow="Who uses it"
          title="Three kinds of people, three surfaces"
          lede="Each person sees only what they need. The person entering data never has to understand carbon; the person reading the report gets full scientific detail."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {people.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article className="flex h-full flex-col gap-3.5 rounded-3xl border border-outline-variant bg-surface-container-lowest p-7">
                <span className="grid h-[52px] w-[52px] place-items-center rounded-2xl bg-secondary-container text-on-secondary-container">
                  <Icon name={p.icon} />
                </span>
                <span className="self-start rounded-full bg-secondary-container px-2.5 py-1 font-caption text-[12px] font-semibold tracking-[0.08em] text-on-secondary-container uppercase">
                  {p.tag}
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface">{p.title}</h3>
                <p className="text-[15px] text-on-surface-variant">{p.text}</p>
                <ul className="flex list-disc flex-col gap-1.5 pl-[18px] text-[15px] text-on-surface-variant marker:text-primary">
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
