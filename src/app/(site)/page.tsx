import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { AppDemo } from "@/components/organisms/home/AppDemo";
import { BlogCarousel } from "@/components/organisms/home/BlogCarousel";
import { FundingCall } from "@/components/organisms/home/FundingCall";
import { VolunteerCall } from "@/components/organisms/home/VolunteerCall";
import { WhatWeDo } from "@/components/organisms/home/WhatWeDo";
import { WhereWeAre } from "@/components/organisms/home/WhereWeAre";
import { appDemo, emissions, whatWeDo } from "@/content/site";
import { features } from "@/lib/features";
import { pageMetadata, SITE_NAME } from "@/lib/seo";
import { getLatestPosts, getSiteSettings } from "@/sanity/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { defaultSeo } = await getSiteSettings();
  return pageMetadata({ path: "/", title: SITE_NAME, seo: defaultSeo, absoluteTitle: true });
}

/**
 * Animated Home: what we do → where we are → app demo → volunteer → funding → blog.
 * "What we do" and "Where we are" come from src/content/site.ts (reviewed in code), not Sanity.
 */
export default async function HomePage() {
  const [settings, posts] = await Promise.all([getSiteSettings(), features.blog ? getLatestPosts(8) : []]);

  return (
    <MotionProvider>
      <WhatWeDo whatWeDo={whatWeDo} emissions={emissions} />
      <WhereWeAre />
      <AppDemo title={appDemo.title} text={appDemo.text} />
      <VolunteerCall volunteer={settings.volunteer} />
      <FundingCall funding={settings.funding} brochureUrl={settings.brochureUrl} />
      {features.blog && <BlogCarousel posts={posts} />}
    </MotionProvider>
  );
}
