import { SiteTemplate } from "@/components/templates/SiteTemplate";
import { getSiteSettings } from "@/sanity/lib/content";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings().catch(() => ({}));
  return <SiteTemplate settings={settings}>{children}</SiteTemplate>;
}
