import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION } from "@/lib/seo";

/** Default social share image (1200×630) for pages without an image of their own. */
export async function GET() {
  const logo = await readFile(join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#fbfbfb" /* matches logo.png */,
      }}
    >
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 64, padding: "0 80px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
        <img src={logoSrc} width={400} height={390} alt="" />
        <div style={{ flex: 1, fontSize: 40, lineHeight: 1.35, color: "#1a1c1a" }}>{SITE_DESCRIPTION}</div>
      </div>
      <div style={{ height: 24, background: "#006a3b" }} />
    </div>,
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800" },
    },
  );
}
