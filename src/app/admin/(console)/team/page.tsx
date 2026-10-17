import type { Metadata } from "next";
import { Suspense } from "react";
import { Icon } from "@/components/atoms/Icon";
import { Skeleton } from "@/components/atoms/Skeleton";
import { AdminPageHeader } from "@/components/organisms/admin/AdminPageHeader";
import { TeamManagementGrid } from "@/components/organisms/admin/TeamManagementGrid";
import { requireAdmin } from "@/lib/dal";
import { studioCreateUrl } from "@/lib/studio";
import { getAdminTeam } from "@/sanity/lib/content";

export const metadata: Metadata = { title: "Team Management" };

async function List() {
  await requireAdmin();
  const rows = await getAdminTeam();
  return <TeamManagementGrid members={rows} />;
}

export default function ManageTeamPage() {
  return (
    <>
      <AdminPageHeader
        title="Team Management"
        description="Manage organizational members and their roles within the carbon reduction initiatives."
        actions={
          <a
            href={studioCreateUrl("teamMember")}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-label-md text-label-md text-on-primary hover:bg-primary-container hover:text-on-primary-container"
          >
            <Icon name="add" /> Add Team Member
          </a>
        }
      />
      <div className="flex flex-1 flex-col px-margin-mobile pb-12 lg:px-margin-desktop">
        <Suspense fallback={<Skeleton className="h-96" />}>
          <List />
        </Suspense>
      </div>
    </>
  );
}
