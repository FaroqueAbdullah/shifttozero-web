import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { AppDemo } from "@/components/organisms/home/AppDemo";
import { BlogCarousel } from "@/components/organisms/home/BlogCarousel";
import { FundingCall } from "@/components/organisms/home/FundingCall";
import { ImpactNumbers } from "@/components/organisms/home/ImpactNumbers";
import { VolunteerCall } from "@/components/organisms/home/VolunteerCall";
import { WhatWeDo } from "@/components/organisms/home/WhatWeDo";
import { features } from "@/lib/features";
import { pageMetadata, SITE_NAME } from "@/lib/seo";
import { getLatestPosts, getSiteSettings } from "@/sanity/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { defaultSeo } = await getSiteSettings();
  return pageMetadata({ path: "/", title: SITE_NAME, seo: defaultSeo, absoluteTitle: true });
}

/** Animated Home: what we do → impact numbers → app demo → volunteer → funding → blog. */
export default async function HomePage() {
  const [settings, posts] = await Promise.all([getSiteSettings(), features.blog ? getLatestPosts(8) : []]);

  return (
    <MotionProvider>
      <WhatWeDo
        whatWeDo={settings.whatWeDo}
        emissionsBreakdown={settings.emissionsBreakdown}
        emissionsFootnote={settings.emissionsFootnote}
      />
      <ImpactNumbers impact={settings.impact} />
      <AppDemo title={settings.app?.title} text={settings.app?.text} />
      <VolunteerCall volunteer={settings.volunteer} />
      <FundingCall funding={settings.funding} brochureUrl={settings.brochureUrl} />
      {features.blog && <BlogCarousel posts={posts} />}
    </MotionProvider>
  );
}
