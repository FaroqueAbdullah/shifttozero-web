import type { ReactNode } from "react";
import { Footer } from "@/components/organisms/site/Footer";
import { Header } from "@/components/organisms/site/Header";
import { MobileBottomNav } from "@/components/organisms/site/MobileBottomNav";
import type { SiteSettings } from "@/sanity/lib/types";

/** Public page frame: header, content, footer, and the mobile bottom tab bar. */
export function SiteTemplate({ settings, children }: { settings: SiteSettings; children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-button focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      {/* Bottom padding keeps the footer clear of the fixed mobile tab bar. */}
      <div className="pb-16 md:pb-0">
        <Footer settings={settings} />
      </div>
      <MobileBottomNav />
    </>
  );
}
