import "server-only";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { auth, authConfigured, authDevBypass, isAdminEmail } from "@/auth";

/**
 * Data access layer check for admin pages and Server Actions. proxy.ts already
 * redirects unauthenticated visitors; this re-checks close to the data.
 */
export async function requireAdmin() {
  // Admin pages are always rendered per request, never prerendered.
  await connection();
  if (authDevBypass) return { name: "Local admin", email: "dev@localhost" };
  if (!authConfigured) redirect("/");

  const session = await auth();
  if (!isAdminEmail(session?.user?.email)) redirect("/admin/login");
  return { name: session!.user!.name ?? session!.user!.email!, email: session!.user!.email! };
}

/** Current time for a request-time render (admin pages). Keeps impure calls out of components. */
export async function requestTime() {
  await connection();
  return Date.now();
}
