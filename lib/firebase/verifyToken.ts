import "server-only";
import { auth } from "@/lib/firebase/server";
export async function verifyToken(token: string) {
  try {
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (e) {
    console.log(e);

    return null;
  }
}
