import Link from "next/link";
import { GradientBackdrop } from "@/components/atoms/GradientBackdrop";
import { Icon } from "@/components/atoms/Icon";
import { ComparisonTable } from "@/components/molecules/ComparisonTable";
import { FlowCards } from "@/components/molecules/FlowCards";
import { Reveal } from "@/components/molecules/Reveal";
import type { SiteSettings } from "@/sanity/lib/types";

/** Tools page, section 1: why our app exists, with links to its docs and demo. */
export function AppIntro({ appIntro }: Pick<SiteSettings, "appIntro">) {
  if (!appIntro?.title) return null;
  return (
    <section id="our-app" className="relative isolate overflow-hidden">
      <GradientBackdrop className="-z-10" />
      <div className="container-page grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <div className="flex flex-col gap-6 lg:col-span-7">
          {appIntro.eyebrow && (
            <p className="flex items-center gap-2 font-label-md text-label-md tracking-wider text-primary uppercase motion-safe:animate-rise">
              <span className="h-2 w-2 rounded-full bg-primary motion-safe:animate-pulse" />
              {appIntro.eyebrow}
            </p>
          )}
          <h1
            className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface motion-safe:animate-rise md:font-headline-xl md:text-headline-xl"
            style={{ animationDelay: "0.1s" }}
          >
            {appIntro.title}
          </h1>
          {appIntro.text && (
            <p
              className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant motion-safe:animate-rise"
              style={{ animationDelay: "0.25s" }}
            >
              {appIntro.text}
            </p>
          )}
          <div
            className="flex flex-col gap-3 pt-2 motion-safe:animate-rise sm:flex-row sm:flex-wrap"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              href="/tools/app"
              className="group flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3 font-label-md text-label-md text-on-primary shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary-container hover:text-on-primary-container"
            >
              <Icon name="menu_book" /> Read the app docs
              <Icon name="arrow_forward" className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#app"
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-secondary px-7 py-3 font-label-md text-label-md text-secondary transition-colors hover:bg-secondary/5"
            >
              <Icon name="play_circle" /> See the demo
            </Link>
            <Link
              href="/contact?topic=Partnership"
              className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-label-md text-label-md text-primary hover:underline"
            >
              Join the pilot <Icon name="arrow_forward" className="text-[18px]" />
            </Link>
          </div>
        </div>
        <div className="lg:col-span-5">
          <FlowCards />
        </div>
      </div>

      {appIntro.comparison?.length ? (
        <div className="container-page pb-20">
          <Reveal>
            <h2 className="mb-6 font-headline-md text-headline-md text-on-surface">
              Built for the people who hold the data
            </h2>
          </Reveal>
          <ComparisonTable rows={appIntro.comparison} />
        </div>
      ) : null}
    </section>
  );
}
