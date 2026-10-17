import type { Metadata } from "next";
import { Reveal } from "@/components/molecules/Reveal";
import { GetInvolvedTabs } from "@/components/organisms/forms/GetInvolvedTabs";
import { PageHero } from "@/components/organisms/site/PageHero";

const description =
  "Whether you're an individual passionate about driving change or a company ready to transition to sustainable practices, your involvement is critical to achieving a zero-carbon future.";

export const metadata: Metadata = { title: "Get Involved", description };

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero title="Join the Movement" description={description} align="center" tinted />
      <div className="container-page py-16 md:py-24">
        <Reveal delay={0.1}>
          <GetInvolvedTabs />
        </Reveal>
      </div>
    </>
  );
}
