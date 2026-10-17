import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { CONTENT_TYPES, type ContentType } from "@/sanity/contentTypes";

type WebhookPayload = { _type: string; slug?: string };

/** Called by the Sanity webhook on publish/unpublish/delete. */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "SANITY_REVALIDATE_SECRET is not set" }, { status: 500 });
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, secret, true);
    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }
    if (!body?._type || !CONTENT_TYPES.includes(body._type as ContentType)) {
      return NextResponse.json({ message: "Ignored", body }, { status: 400 });
    }

    revalidateTag(body._type, "max");
    return NextResponse.json({ revalidated: body._type, now: Date.now() });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
