import type { Metadata } from "next";
import { authConfigured, signOut } from "@/auth";
import { Icon } from "@/components/atoms/Icon";
import { AdminTemplate } from "@/components/templates/AdminTemplate";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminTemplate
      sidebarFooter={
        authConfigured && (
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-on-surface-variant transition-all hover:bg-surface-container-high"
            >
              <Icon name="logout" className="text-[20px]" />
              <span className="font-body-md text-body-md">Sign out</span>
            </button>
          </form>
        )
      }
    >
      {children}
    </AdminTemplate>
  );
}
