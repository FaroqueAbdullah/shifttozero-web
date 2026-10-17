import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/organisms/admin/AdminSidebar";
import { AdminTopBar } from "@/components/organisms/admin/AdminTopBar";

/** Admin frame: fixed sidebar (desktop), top bar, scrolling content. */
export function AdminTemplate({
  sidebarFooter,
  userName,
  children,
}: {
  sidebarFooter?: ReactNode;
  userName?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar footer={sidebarFooter} />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col lg:ml-64">
        <AdminTopBar userName={userName} />
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}
