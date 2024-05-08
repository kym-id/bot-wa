import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/; // Files

export async function middleware(req: NextRequest) {
  // Clone the URL
  const url = req.nextUrl.clone();

  // Skip public files
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes("_next")) return;

  const host = req.headers.get("host");
  if (host === "pj.kym.my.id") {
    if (url.pathname.startsWith("/v1")) {
      return Response.json(
        { success: false, message: "unauthorized" },
        { status: 401 }
      );
    }
    url.pathname = `/pj${url.pathname}`;
  }

  return NextResponse.rewrite(url);
}
