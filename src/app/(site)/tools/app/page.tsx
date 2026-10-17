import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { DocsAi, DocsLowLiteracy } from "@/components/organisms/docs/DocsAi";
import { DocsCalculation, DocsIndustries } from "@/components/organisms/docs/DocsEngine";
import { DocsHero, DocsPeople } from "@/components/organisms/docs/DocsIntro";
import { DocsNav } from "@/components/organisms/docs/DocsNav";
import { DocsArchitecture, DocsRollout, DocsStandards } from "@/components/organisms/docs/DocsStandards";
import { HowItWorks } from "@/components/organisms/docs/HowItWorks";
import { AppDemo } from "@/components/organisms/home/AppDemo";

export const metadata: Metadata = {
  title: "App documentation",
  description:
    "How our field data app turns what kiln and ship-breaking workers already know into a GHG Protocol and ISO 14064-1 inventory.",
};

/** Public documentation for the field data app (from the Carbon App Blueprint v0.1). */
export default function AppDocsPage() {
  return (
    <MotionProvider>
      <DocsHero />
      <DocsNav />
      <DocsPeople />
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
      <DocsStandards />
      <DocsArchitecture />
      <DocsRollout />
    </MotionProvider>
  );
}
