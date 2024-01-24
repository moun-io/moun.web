import { auth } from "@/lib/firebase/firebase";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    await auth.signOut();
  } catch (e) {
    console.log(e);
    NextResponse.error();
  }
  return NextResponse.redirect("/");
}
