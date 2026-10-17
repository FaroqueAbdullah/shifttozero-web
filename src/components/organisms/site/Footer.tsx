import Link from "next/link";
import { CurrentYear } from "@/components/atoms/CurrentYear";
import { Icon } from "@/components/atoms/Icon";
import { footerNav } from "@/lib/navigation";
import type { SiteSettings } from "@/sanity/lib/types";

const socialIcon: Record<string, string> = {
  LinkedIn: "work",
  X: "tag",
  Facebook: "thumb_up",
  YouTube: "smart_display",
  Instagram: "photo_camera",
};

const linkClass =
  "font-body-md text-body-md text-on-surface-variant opacity-80 transition-colors hover:text-primary hover:underline hover:opacity-100";
const roundLink =
  "flex h-10 w-10 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-colors hover:bg-primary hover:text-on-primary";

export function Footer({ settings }: { settings: Pick<SiteSettings, "contactEmail" | "socialLinks"> }) {
  const socials = settings.socialLinks?.filter((s) => s.url) ?? [];

  return (
    <footer className="w-full border-t border-outline-variant bg-surface-container-highest">
      {/* Mobile: compact centered footer (Stitch mobile screens). */}
      <div className="flex flex-col items-center gap-4 px-margin-mobile py-8 text-center md:hidden">
        <span className="font-headline-md text-headline-md font-bold text-primary">Shift to Zero Carbon</span>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          {[
            { href: "/privacy", label: "Privacy Policy" },
            { href: "/terms", label: "Terms of Service" },
            { href: "/#methodology", label: "Carbon Methodology" },
            { href: "/contact", label: "Contact Us" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-body-md text-body-md text-on-surface-variant opacity-80 hover:text-primary"
            >
              {label}
            </Link>
          ))}
        </nav>
        <p className="font-caption text-caption text-on-surface-variant">
          © <CurrentYear /> Shift to Zero Carbon. All rights reserved.
        </p>
      </div>

      <div className="mx-auto hidden max-w-container-max grid-cols-5 gap-gutter px-margin-desktop py-12 md:grid">
        <div className="col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Icon name="eco" filled className="text-[24px] text-primary" />
            <span className="font-headline-md text-headline-md font-bold text-on-surface">
              Shift to Zero Carbon
            </span>
          </div>
          <p className="max-w-sm font-body-md text-body-md text-on-surface-variant">
            Driving the transition to sustainable heavy industry through technology, policy, and action.
          </p>
          {(settings.contactEmail || socials.length > 0) && (
            <div className="flex gap-3">
              {settings.contactEmail && (
                <a href={`mailto:${settings.contactEmail}`} className={roundLink} aria-label="Email us">
                  <Icon name="mail" />
                </a>
              )}
              {socials.map((s) => (
                <a
                  key={s._key}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className={roundLink}
                  aria-label={s.platform}
                >
                  <Icon name={socialIcon[s.platform ?? ""] ?? "share"} />
                </a>
              ))}
            </div>
          )}
        </div>
        {footerNav.map((group) => (
          <div key={group.title}>
            <h2 className="mb-4 font-label-md text-label-md font-bold tracking-wider text-on-surface uppercase">
              {group.title}
            </h2>
            <ul className="space-y-3">
              {group.links.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="hidden border-t border-outline-variant/30 py-6 md:block">
        <p className="container-page font-caption text-caption text-on-surface-variant">
          © <CurrentYear /> Shift to Zero Carbon. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
