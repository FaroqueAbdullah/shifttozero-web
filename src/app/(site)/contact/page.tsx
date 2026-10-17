import type { Metadata } from "next";
import { Suspense } from "react";
import { Icon } from "@/components/atoms/Icon";
import { ContactFromQuery } from "@/components/organisms/forms/ContactFromQuery";
import { ContactForm } from "@/components/organisms/forms/GetInvolvedForms";
import { PageHero } from "@/components/organisms/site/PageHero";
import { getSiteSettings } from "@/sanity/lib/content";

const description = "Talk to us about funding, partnerships, our research or the media.";

export const metadata: Metadata = { title: "Contact Us", description };

export default async function ContactPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <PageHero title="Contact Us" description={description} align="center" tinted />
      <div className="container-page grid grid-cols-1 gap-gutter py-12 md:py-20 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Suspense fallback={<ContactForm />}>
            <ContactFromQuery />
          </Suspense>
        </div>
        <aside className="flex flex-col gap-6 rounded-xl border border-outline-variant bg-surface-container-low p-8">
          <div>
            <h2 className="mb-2 font-headline-md text-headline-md text-on-surface">Support our research</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              We are a non-profit. Choose &ldquo;Funding&rdquo; as the topic and we&apos;ll share our funding
              plan and how contributions are used.
            </p>
          </div>
          {settings.contactEmail && (
            <a
              href={`mailto:${settings.contactEmail}`}
              className="flex items-center gap-3 font-body-md text-body-md text-primary hover:underline"
            >
              <Icon name="mail" /> {settings.contactEmail}
            </a>
          )}
        </aside>
      </div>
    </>
  );
}
