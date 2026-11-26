import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/organisms/site/PageHero";
import { CoreValues } from "@/components/organisms/team/CoreValues";
import { TeamGrid } from "@/components/organisms/team/TeamGrid";
import { features } from "@/lib/features";
import { getSiteSettings, getTeam } from "@/sanity/lib/content";
import { pageMetadata } from "@/lib/seo";

// Hidden (features.team is false). The confirmed team is on /about.
const description = "The people behind Shift to Zero Carbon.";

export const metadata: Metadata = pageMetadata({ path: "/team", title: "Our Team", description });

export default async function TeamPage() {
  if (!features.team) notFound();
  const [members, settings] = await Promise.all([getTeam(), getSiteSettings()]);
  return (
    <>
      <PageHero
        title="Our Leadership & Experts"
        description={description}
        mobile={{
          title: "Our Team",
          description: "The people behind Shift to Zero Carbon.",
          align: "center",
          tone: "default",
        }}
      />
      <div className="container-page flex flex-col gap-24 pb-12 md:pb-24">
        <TeamGrid members={members} />
        <CoreValues values={settings.coreValues} />
      </div>
    </>
  );
}
