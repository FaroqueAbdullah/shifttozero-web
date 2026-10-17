import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

/** True once the Auth.js env vars are set. Until then /admin is open in development and blocked in production. */
export const authConfigured = Boolean(
  process.env.AUTH_SECRET && process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET,
);

/** Local-only escape hatch while auth isn't set up yet. Never true in production builds. */
export const authDevBypass = !authConfigured && process.env.NODE_ENV !== "production";

function adminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null) {
  return Boolean(email && adminEmails().includes(email.toLowerCase()));
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  pages: { signIn: "/admin/login" },
  callbacks: {
    // Only allowlisted Google accounts can sign in.
    signIn: ({ user }) => isAdminEmail(user.email),
    // Used by proxy.ts to gate /admin routes.
    authorized: ({ auth, request }) => {
      if (request.nextUrl.pathname === "/admin/login") return true;
      return isAdminEmail(auth?.user?.email);
    },
  },
});
