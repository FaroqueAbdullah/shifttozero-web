import type { ReactNode } from "react";
import { PageHero } from "./PageHero";

type LegalPageProps = { title: string; updated: string; children: ReactNode };

/** Long-form text page (Privacy, Terms) with readable measure and token-based prose colors. */
export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <>
      <PageHero title={title} description={`Last updated: ${updated}`} />
      <div className="container-page pb-24">
        <div className="max-w-3xl font-body-md text-body-md text-on-surface-variant [&_a]:text-primary [&_a]:underline [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-headline-md [&_h2]:text-headline-md [&_h2]:text-on-surface [&_li]:mb-2 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6">
          {children}
        </div>
      </div>
    </>
  );
}
