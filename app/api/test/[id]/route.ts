import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  cookies().set("theme", "dark", {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    secure: false,
  });
  return new Response("cookie set");
}
