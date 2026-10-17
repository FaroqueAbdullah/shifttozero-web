import type { Metadata } from "next";
import { Suspense } from "react";
import { Icon } from "@/components/atoms/Icon";
import { Skeleton } from "@/components/atoms/Skeleton";
import { AdminPageHeader } from "@/components/organisms/admin/AdminPageHeader";
import { BlogsTable } from "@/components/organisms/admin/BlogsTable";
import { requireAdmin } from "@/lib/dal";
import { studioCreateUrl } from "@/lib/studio";
import { getAdminPosts } from "@/sanity/lib/content";

export const metadata: Metadata = { title: "Blog Management" };

async function List() {
  await requireAdmin();
  const rows = await getAdminPosts();
  return <BlogsTable posts={rows} />;
}

export default function ManageBlogsPage() {
  return (
    <>
      <AdminPageHeader
        title="Blog Management"
        description="Manage and publish your industry insights."
        actions={
          <a
            href={studioCreateUrl("post")}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-label-md text-label-md text-on-primary hover:bg-primary-container hover:text-on-primary-container"
          >
            <Icon name="add" /> Create New Post
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
