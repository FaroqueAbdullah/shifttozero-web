import type { Metadata } from "next";
import Image from "next/image";
import { authConfigured, signIn } from "@/auth";
import { Icon } from "@/components/atoms/Icon";
import { ThemeToggle } from "@/components/molecules/ThemeToggle";

export const metadata: Metadata = { title: "Admin sign in", robots: { index: false, follow: false } };

export default function AdminLoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-tech-pattern px-margin-mobile">
      <ThemeToggle className="absolute top-6 right-6" />
      <div className="w-full max-w-sm rounded-card border border-keyline bg-surface-container-lowest p-8 text-center shadow-ambient">
        <Image src="/logo.png" alt="Shift to Zero logo" width={72} height={70} className="mx-auto mb-4" />
        <h1 className="font-headline-md text-headline-md text-heading">Admin Console</h1>
        <p className="mt-2 mb-6 font-body-md text-body-md text-on-surface-variant">
          Sign in with an authorized Google account.
        </p>
        {!authConfigured ? (
          <p className="rounded-lg bg-surface-container p-4 font-body-md text-body-md text-on-surface-variant">
            Sign-in isn&apos;t configured yet. Set AUTH_SECRET, AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET.
          </p>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/admin" });
            }}
          >
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-label-md text-label-md text-on-primary hover:bg-primary-container hover:text-on-primary-container">
              <Icon name="login" /> Continue with Google
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
