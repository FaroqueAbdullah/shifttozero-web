import type { Metadata } from "next";
import { Reveal } from "@/components/molecules/Reveal";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { GetInvolvedTabs } from "@/components/organisms/forms/GetInvolvedTabs";
import { PageHero } from "@/components/organisms/site/PageHero";
import { pageMetadata } from "@/lib/seo";

const description =
  "Whether you're an individual passionate about driving change or a company ready to transition to sustainable practices, your involvement is critical to achieving a zero-carbon future.";

export const metadata: Metadata = pageMetadata({ path: "/get-involved", title: "Get Involved", description });

export default function GetInvolvedPage() {
  return (
    <MotionProvider>
      <PageHero title="Join the Movement" description={description} align="center" tinted />
      <div className="container-page py-16 md:py-24">
        <Reveal delay={0.1}>
          <GetInvolvedTabs />
        </Reveal>
      </div>
    </MotionProvider>
  );
}
