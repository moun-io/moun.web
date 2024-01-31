import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "@/lib/firebase/server";
export async function POST(req: NextRequest) {
  const { token } = await req.json();
  console.log(token);

  if (token) {
    try {
      const decodedToken = await auth.verifyIdToken(token);
      const { uid, displayName, exp } = decodedToken;
      console.log(cookies().getAll());
      console.log("auth success");

      cookies().set("__token", token, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
      });

      return new Response("auth success");
    } catch (e) {
      console.log(e);
      return new Response("auth failed");
    }
  } else {
    cookies().delete("__token");
    return new Response("auth not found");
  }
}
