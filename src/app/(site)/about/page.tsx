import type { Metadata } from "next";
import Link from "next/link";
import { Avatar } from "@/components/atoms/Avatar";
import { Icon } from "@/components/atoms/Icon";
import { Reveal } from "@/components/molecules/Reveal";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { PageHero } from "@/components/organisms/site/PageHero";
import { about, industriesSentence, pillars, team, tracks } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "About",
  description: about.lede,
});

const eyebrow = "mb-3 font-label-md text-label-md tracking-wider text-primary uppercase";
const h2 =
  "mb-6 font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:font-headline-lg md:text-headline-lg";

/** Who we are, how we work (Research → Share → Act), the two tracks and the team. */
export default function AboutPage() {
  return (
    <MotionProvider>
      <PageHero title={about.title} description={about.lede} />

      <div className="container-page flex flex-col gap-20 pb-20 md:gap-28 md:pb-28">
        <section aria-labelledby="who" className="max-w-3xl">
          <p className={eyebrow}>Who we are</p>
          <h2 id="who" className={h2}>
            A Bangladeshi climate movement
          </h2>
          <div className="flex flex-col gap-4 font-body-lg text-body-lg text-on-surface-variant">
            {about.who.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>The industries we look at are {industriesSentence}.</p>
          </div>
        </section>

        <section id="approach" aria-labelledby="approach-title" className="scroll-mt-24">
          <p className={eyebrow}>How we work</p>
          <h2 id="approach-title" className={h2}>
            Research, share, act
          </h2>
          <ol className="grid grid-cols-1 gap-gutter md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p._key} delay={i * 0.1}>
                <div className="h-full rounded-card border border-outline-variant bg-surface-container-lowest p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container/20 text-primary">
                      <Icon name={p.icon} filled />
                    </span>
                    <span className="font-label-md text-label-md text-on-surface-variant">Step {i + 1}</span>
                  </div>
                  <h3 className="mb-2 font-headline-md text-headline-md text-on-surface">{p.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <p className="mt-6 max-w-3xl font-body-md text-body-md text-on-surface-variant">
            Our first published finding is a{" "}
            <Link href="/field-notes" className="text-primary underline">
              field note from a brick kiln
            </Link>
            .
          </p>
        </section>

        <section id="tracks" aria-labelledby="tracks-title" className="scroll-mt-24">
          <p className={eyebrow}>What we do</p>
          <h2 id="tracks-title" className={h2}>
            Two tracks
          </h2>
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-2">
            {tracks.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.1}>
                <article className="flex h-full flex-col gap-4 rounded-feature border border-outline-variant bg-surface-container-lowest p-6 md:p-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
                      <Icon name={t.icon} />
                    </span>
                    <span className="font-label-md text-label-md tracking-wider text-on-surface-variant uppercase">
                      {t.label}
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">{t.title}</h3>
                  <p className="flex-1 font-body-md text-body-md text-on-surface-variant">{t.text}</p>
                  <Link
                    href={t.href}
                    className="flex min-h-14 items-center gap-1 self-start font-label-md text-label-md text-primary hover:underline"
                  >
                    {t.cta} <Icon name="arrow_forward" className="text-[18px]" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="team" aria-labelledby="team-title" className="scroll-mt-24">
          <p className={eyebrow}>Team</p>
          <h2 id="team-title" className={h2}>
            Who is behind it
          </h2>
          <p className="mb-8 max-w-3xl font-body-lg text-body-lg text-on-surface-variant">
            STZ was founded by a group of Bangladeshi software and electrical engineers.
          </p>
          {/* TODO(Faroque): add the other co-founders to `team` in src/content/site.ts. */}
          <ul className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <li
                key={m.name}
                className="flex items-center gap-4 rounded-card border border-outline-variant bg-surface-container-lowest p-6"
              >
                <Avatar name={m.name} size={56} />
                <div>
                  <p className="font-headline-md text-headline-md text-on-surface">{m.name}</p>
                  <p className="font-body-md text-body-md text-on-surface-variant">{m.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col items-start justify-between gap-4 rounded-card bg-primary p-6 text-on-primary md:flex-row md:items-center md:p-8">
          <p className="max-w-2xl font-body-lg text-body-lg">
            Want to work with us, fund the work or ask a question?
          </p>
          <Link
            href="/contact"
            className="flex min-h-14 shrink-0 items-center gap-2 rounded-lg bg-surface-container-lowest px-6 py-3 font-label-md text-label-md text-primary"
          >
            Contact us <Icon name="arrow_forward" className="text-[18px]" />
          </Link>
        </section>
      </div>
    </MotionProvider>
  );
}
