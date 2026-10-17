import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { AppIntro } from "@/components/organisms/tools/AppIntro";
import { ToolDirectory } from "@/components/organisms/tools/ToolDirectory";
import { getSiteSettings, getTools } from "@/sanity/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/tools",
  title: "Carbon Tools",
  description:
    "Our carbon accounting app built for factory workers in Bangladesh, and a directory of popular carbon calculators.",
});

export default async function ToolsPage() {
  const [settings, tools] = await Promise.all([getSiteSettings(), getTools()]);
  return (
    <MotionProvider>
      <AppIntro appIntro={settings.appIntro} />
      <ToolDirectory tools={tools} />
    </MotionProvider>
  );
}
