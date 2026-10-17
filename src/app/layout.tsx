import type { Metadata } from "next";
import { Inter, Montserrat, Noto_Sans_Bengali } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { pageMetadata, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600"],
});

/** Bangla text in the app demo and docs. */
const bengali = Noto_Sans_Bengali({
  variable: "--font-bengali-face",
  subsets: ["bengali"],
  weight: ["400", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  ...pageMetadata({ path: "/" }),
  // Pages set their own canonical; don't let every route inherit the home URL.
  alternates: undefined,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the theme script sets data-theme before React hydrates.
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${inter.variable} ${montserrat.variable} ${bengali.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
