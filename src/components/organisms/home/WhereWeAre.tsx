import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";
import { Reveal } from "@/components/molecules/Reveal";
import { whereWeAre } from "@/content/site";

/** Home, after "What we do": a plain status report in place of impact numbers. */
export function WhereWeAre() {
  return (
    <section
      id="where-we-are"
      className="relative scroll-mt-20 overflow-hidden bg-surface-container-low py-20 md:py-28"
    >
      <div aria-hidden className="absolute inset-0 bg-tech-pattern opacity-50" />
      <div className="relative container-page">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <p className="mb-3 font-label-md text-label-md tracking-wider text-primary uppercase">
            {whereWeAre.eyebrow}
          </p>
          <h2 className="mb-4 font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:font-headline-xl md:text-headline-xl">
            {whereWeAre.title}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">{whereWeAre.text}</p>
        </Reveal>

        <ul className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
          {whereWeAre.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-4 rounded-card border border-outline-variant bg-surface-container-lowest p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container/20 text-primary">
                  <Icon name={item.icon} filled />
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface">{item.title}</h3>
                <p className="flex-1 font-body-md text-body-md text-on-surface-variant">{item.text}</p>
                <Link
                  href={item.href}
                  className="flex min-h-12 items-center gap-1 self-start font-label-md text-label-md text-primary hover:underline"
                >
                  {item.cta} <Icon name="arrow_forward" className="text-[18px]" />
                </Link>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
