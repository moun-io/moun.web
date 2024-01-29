import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/mypage") {
    if (cookies().has("__token")) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (request.nextUrl.pathname === "/login") {
    if (cookies().has("__token")) {
      return NextResponse.redirect(new URL("/mypage", request.url));
    } else {
      return NextResponse.next();
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login/:path*", "/mypage/:path*"],
};
