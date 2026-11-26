import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";
import { Reveal } from "@/components/molecules/Reveal";
import { APP_NAME, tracks } from "@/content/site";

const track = tracks[0];

/**
 * Tools page, between the STZ Collect intro and the directory: Track 1. Makes clear that the
 * software is third-party; STZ helps factories adopt it and did not build it.
 */
export function IntegrationSupport() {
  return (
    <section id="integration" aria-labelledby="integration-title" className="scroll-mt-24 py-16 md:py-24">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="mb-3 font-label-md text-label-md tracking-wider text-primary uppercase">
            {track.label} · {track.title}
          </p>
          <h2
            id="integration-title"
            className="mb-6 font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:font-headline-xl md:text-headline-xl"
          >
            Help adopting existing emissions software
          </h2>
          <p className="mb-6 font-body-lg text-body-lg text-on-surface-variant">{track.text}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="#calculators"
              className="flex min-h-14 items-center justify-center gap-2 rounded-lg border-2 border-secondary px-6 py-3 font-label-md text-label-md text-secondary transition-colors hover:bg-secondary/5"
            >
              See third-party tools <Icon name="arrow_downward" />
            </Link>
            <Link
              href="/contact?topic=Partnership"
              className="flex min-h-14 items-center justify-center gap-2 rounded-lg px-4 py-3 font-label-md text-label-md text-primary hover:underline"
            >
              Ask about integration support <Icon name="arrow_forward" className="text-[18px]" />
            </Link>
          </div>
        </Reveal>
        <Reveal from="right" delay={0.1} className="lg:col-span-5">
          <ul className="flex flex-col gap-4 rounded-feature border border-outline-variant bg-surface-container-lowest p-6 font-body-md text-body-md text-on-surface-variant md:p-8">
            <li className="flex gap-3">
              <Icon name="info" className="mt-0.5 text-primary" />
              <span>
                <b className="text-on-surface">Third-party software.</b> The tools are made by other
                organizations. We did not build them.
              </span>
            </li>
            <li className="flex gap-3">
              <Icon name="groups" className="mt-0.5 text-primary" />
              <span>
                <b className="text-on-surface">For data-confident teams.</b> This track suits factories whose
                staff can manage complex data.
              </span>
            </li>
            <li className="flex gap-3">
              <Icon name="record_voice_over" className="mt-0.5 text-primary" />
              <span>
                <b className="text-on-surface">Where workers cannot read,</b> forms fail. That is the problem{" "}
                <Link href="/tools/app" className="text-primary underline">
                  {APP_NAME}
                </Link>{" "}
                is designed for.
              </span>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
