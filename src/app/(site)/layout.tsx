import type { Metadata } from "next";
import { JsonLd } from "@/components/atoms/JsonLd";
import { SiteTemplate } from "@/components/templates/SiteTemplate";
import { ORGANIZATION_ID, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/lib/content";
import type { SiteSettings } from "@/sanity/lib/types";

/** Editors can override the site-wide description in Site Settings → SEO (the title is set on the home page). */
export async function generateMetadata(): Promise<Metadata> {
  const { defaultSeo }: SiteSettings = await getSiteSettings().catch(() => ({}));
  return { description: defaultSeo?.description || SITE_DESCRIPTION };
}

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const settings: SiteSettings = await getSiteSettings().catch(() => ({}));
  const sameAs = settings.socialLinks?.map((l) => l.url).filter(Boolean);
  return (
    <>
      <JsonLd
        data={{
          "@graph": [
            {
              "@type": "Organization",
              "@id": ORGANIZATION_ID,
              name: SITE_NAME,
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              description: SITE_DESCRIPTION,
              ...(settings.contactEmail && { email: settings.contactEmail }),
              ...(sameAs?.length && { sameAs }),
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              name: SITE_NAME,
              url: SITE_URL,
              publisher: { "@id": ORGANIZATION_ID },
            },
          ],
        }}
      />
      <SiteTemplate settings={settings}>{children}</SiteTemplate>
    </>
  );
}
