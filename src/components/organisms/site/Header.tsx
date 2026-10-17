import Link from "next/link";
import { Logo } from "@/components/atoms/Logo";
import { ThemeToggle } from "@/components/molecules/ThemeToggle";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";

/** Desktop: logo + name, nav, CTA, theme. Mobile (Stitch TopAppBar): menu, name, theme. */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85">
      <div className="relative mx-auto flex h-16 w-full max-w-container-max items-center justify-between gap-2 px-margin-mobile md:h-20 md:px-margin-desktop">
        <div className="flex min-w-0 items-center gap-2 md:gap-4">
          <MobileNav />
          <Link href="/" className="flex min-w-0 items-center gap-4">
            <Logo priority className="hidden md:block" />
            <span className="truncate font-headline-md text-[20px] leading-7 font-bold text-primary md:text-headline-md">
              Shift to Zero Carbon
            </span>
          </Link>
        </div>

        <NavLinks />

        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/get-involved"
            className="hidden rounded-lg bg-primary px-6 py-2 font-label-md text-label-md text-on-primary transition-colors hover:bg-primary-container hover:text-on-primary-container md:flex"
          >
            Get Involved
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
