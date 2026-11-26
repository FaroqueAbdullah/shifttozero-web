import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { AppIntro } from "@/components/organisms/tools/AppIntro";
import { IntegrationSupport } from "@/components/organisms/tools/IntegrationSupport";
import { ToolDirectory } from "@/components/organisms/tools/ToolDirectory";
import { appIntro } from "@/content/site";
import { getTools } from "@/sanity/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/tools",
  title: "Carbon Tools",
  description:
    "STZ Collect, our data-collection app for factory workers (in development, v0.1), our integration support for third-party emissions software, and a directory of popular carbon calculators.",
});

export default async function ToolsPage() {
  const tools = await getTools();
  return (
    <MotionProvider>
      <AppIntro appIntro={appIntro} />
      <IntegrationSupport />
      <ToolDirectory tools={tools} />
    </MotionProvider>
  );
}
