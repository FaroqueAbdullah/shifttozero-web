import Image from "next/image";
import { Icon } from "@/components/atoms/Icon";
import { DocsHeading } from "@/components/molecules/DocsHeading";
import { Reveal } from "@/components/molecules/Reveal";
import { aiFeatures, aiShots, principles } from "@/content/appDocs";

export function DocsAi() {
  return (
    <section id="ai" className="scroll-mt-32 py-20 md:py-[88px]">
      <div className="container-page">
        <DocsHeading
          eyebrow="AI features"
          title="Voice and photo do the typing"
          lede="AI removes the need to read and write. It is used for understanding input and spotting problems, never for inventing data."
        />
        <div className="mb-12 grid max-w-[860px] grid-cols-2 gap-7 sm:grid-cols-3">
          {aiShots.map((s, i) => (
            <Reveal key={s.image} delay={i * 0.1} className={i % 2 === 1 ? "sm:mt-12" : undefined}>
              <figure className="flex flex-col gap-3.5">
                <div className="rounded-[34px] bg-[#0a0a0a] p-2 shadow-[0_24px_60px_rgba(0,20,50,0.28)]">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    width={585}
                    height={1266}
                    sizes="(min-width: 860px) 270px, 45vw"
                    className="block h-auto w-full rounded-[27px]"
                  />
                </div>
                <figcaption className="text-[14px] leading-[1.45] text-on-surface-variant">
                  <b className="block text-[15px] text-on-surface">{s.title}</b>
                  {s.text}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {aiFeatures.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <article className="flex h-full flex-col gap-2.5 rounded-3xl border border-outline-variant bg-surface-container-lowest p-7">
                <span className="grid h-[52px] w-[52px] place-items-center rounded-2xl bg-secondary-container text-on-secondary-container">
                  <Icon name={f.icon} />
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface">{f.title}</h3>
                <p className="text-[15px] text-on-surface-variant">{f.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <div className="flex items-start gap-4 rounded-3xl bg-primary-container/15 px-7 py-6">
            <Icon name="shield" className="mt-0.5 text-primary" />
            <p className="text-on-surface">
              <b>The rule:</b> AI suggests, a person confirms. Every AI result is shown back and confirmed by
              the worker, every entry records how it was made (tap, voice, photo) and its confidence, and the
              report shows how much of the total is backed by evidence.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function DocsLowLiteracy() {
  return (
    <section id="design" className="scroll-mt-32 bg-surface-container-low py-20 md:py-[88px]">
      <div className="container-page">
        <DocsHeading
          eyebrow="Designing for low literacy"
          title="If it needs reading, it needs another way too"
        />
        <ul className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={(i % 2) * 0.08}
              className="flex gap-4 border-t border-outline-variant py-5"
            >
              <Icon name="check" className="mt-0.5 text-primary" />
              <div>
                <b className="mb-0.5 block text-on-surface">{p.title}</b>
                <span className="text-[15px] text-on-surface-variant">{p.text}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
