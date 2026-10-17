import { type NextFetchEvent, type NextRequest, NextResponse } from "next/server";
import { auth, authConfigured, authDevBypass } from "@/auth";

// The `authorized` callback in auth.ts decides access; this handler only runs when it allows the request.
const authProxy = auth(() => NextResponse.next()) as unknown as (
  req: NextRequest,
  ev: NextFetchEvent,
) => Promise<Response>;

export default function proxy(req: NextRequest, ev: NextFetchEvent) {
  if (authDevBypass) return NextResponse.next();
  if (!authConfigured) return new NextResponse("Admin is not configured", { status: 503 });
  return authProxy(req, ev);
}

export const config = {
  matcher: ["/admin/:path*"],
};
