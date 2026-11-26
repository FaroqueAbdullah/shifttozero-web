import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion/MotionProvider";
import {
  DocsAi,
  DocsLowLiteracy,
  DocsOpenQuestion,
  DocsPrinciples,
} from "@/components/organisms/docs/DocsAi";
import { DocsCalculation, DocsIndustries } from "@/components/organisms/docs/DocsEngine";
import { DocsHero, DocsPeople } from "@/components/organisms/docs/DocsIntro";
import { DocsNav } from "@/components/organisms/docs/DocsNav";
import { DocsArchitecture, DocsRollout, DocsStandards } from "@/components/organisms/docs/DocsStandards";
import { HowItWorks } from "@/components/organisms/docs/HowItWorks";
import { AppDemo } from "@/components/organisms/home/AppDemo";
import { APP_NAME } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/tools/app",
  title: APP_NAME,
  description: `Design documentation for ${APP_NAME} (in development, v0.1): a voice-first app designed to turn what kiln and ship-breaking workers already know into a GHG Protocol and ISO 14064-1 inventory.`,
});

/** Public design documentation for STZ Collect (from the Carbon App Blueprint v0.1). */
export default function AppDocsPage() {
  return (
    <MotionProvider>
      <DocsHero />
      <DocsNav />
      <DocsPeople />
      <DocsPrinciples />
      <HowItWorks />
      {/* Clears the site header (80px) and the sticky "on this page" nav (~49px). */}
      <AppDemo
        id="demo"
        stickyTop={148}
        title="One daily entry, screen by screen"
        text="A morning at a brick kiln, from opening the app to the monthly result."
      />
      <DocsCalculation />
      <DocsIndustries />
      <DocsAi />
      <DocsLowLiteracy />
      <DocsOpenQuestion />
      <DocsStandards />
      <DocsArchitecture />
      <DocsRollout />
    </MotionProvider>
  );
}
