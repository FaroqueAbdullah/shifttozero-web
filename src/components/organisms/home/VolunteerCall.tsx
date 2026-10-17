import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";
import { Marquee } from "@/components/molecules/Marquee";
import { Reveal } from "@/components/molecules/Reveal";
import type { SiteSettings } from "@/sanity/lib/types";

/** Section 3: volunteer recruitment. */
export function VolunteerCall({ volunteer }: Pick<SiteSettings, "volunteer">) {
  if (!volunteer?.title) return null;
  return (
    <section id="volunteer" className="scroll-mt-20 overflow-hidden py-20 md:py-28">
      <div className="container-page">
        <div className="mb-12 grid grid-cols-1 items-end gap-6 md:grid-cols-2">
          <Reveal from="left">
            <p className="mb-3 font-label-md text-label-md tracking-wider text-primary uppercase">
              We&apos;re looking for volunteers
            </p>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:font-headline-xl md:text-headline-xl">
              {volunteer.title}
            </h2>
          </Reveal>
          {volunteer.text && (
            <Reveal from="right" delay={0.1}>
              <p className="font-body-lg text-body-lg text-on-surface-variant">{volunteer.text}</p>
            </Reveal>
          )}
        </div>

        {volunteer.roles?.length ? (
          <ul className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
            {volunteer.roles.map((role, i) => (
              <Reveal as="li" key={role._key} delay={i * 0.1}>
                <div className="group relative h-full overflow-hidden rounded-card border border-outline-variant bg-surface-container-lowest p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-ambient">
                  <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />
                  <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary-container text-on-secondary-container transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
                    <Icon name={role.icon || "volunteer_activism"} filled className="text-[28px]" />
                  </div>
                  <h3 className="relative mb-2 font-headline-md text-headline-md text-on-surface">
                    {role.title}
                  </h3>
                  {role.text && (
                    <p className="relative font-body-md text-body-md text-on-surface-variant">{role.text}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </ul>
        ) : null}
      </div>

      {volunteer.skills?.length ? <Marquee items={volunteer.skills} className="mt-12" /> : null}

      <Reveal className="container-page mt-12 flex justify-center">
        <Link
          href="/get-involved#individuals"
          className="group relative flex items-center gap-2 rounded-lg bg-primary px-8 py-4 font-label-md text-label-md text-on-primary shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
        >
          Sign up to volunteer
          <Icon name="arrow_forward" className="transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  );
}
