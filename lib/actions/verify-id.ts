"use server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/firebase/verifyToken";
import { redirect } from "next/navigation";
export async function verifyId(uid: string) {
  const token = cookies().get("__token");
  if (token && uid) {
    const decodedToken = await verifyToken(token.value);
    if (decodedToken?.uid === uid) return decodedToken.uid;
    else {
      return null;
    }
  } else {
    return null;
  }
}
