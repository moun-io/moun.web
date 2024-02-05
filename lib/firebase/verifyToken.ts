import "server-only";
import { auth } from "@/lib/firebase/server";
export async function verifyToken(token: string) {
  try {
    const decodedToken = await auth.verifyIdToken(token);
    // console.log(decodedToken);
    return decodedToken;
  } catch {
    return null;
  }
}
