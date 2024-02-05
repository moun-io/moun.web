"use server";
import { cookies } from "next/headers";
import { db, storage, auth } from "../firebase/server";
import { permanentRedirect, redirect } from "next/navigation";
import { verifyToken } from "@/lib/firebase/verifyToken";
import { DecodedIdToken } from "firebase-admin/auth";
import { revalidatePath } from "next/cache";
export interface Artist {
  displayName: string;
  position: string[];
  sns: string;
  description: string;
  //   file: string;
  photoURL?: string;

  verified: boolean;
}
export async function onUpdateProfile(formData: FormData) {
  const token = cookies().get("__token");
  if (!token) return redirect("/login");

  const decodedToken = await verifyToken(token.value);
  if (!decodedToken) return redirect("/login");

  //? 유저가 작성한 프로필인지 확인
  if (formData.get("userId") === decodedToken.uid) {
    const data: Artist = {
      displayName: formData.get("name") as string,
      position: [
        formData.get("Rapper") ? "Rapper" : null,
        formData.get("Vocal") ? "Vocal" : null,
        formData.get("Producer") ? "Producer" : null,
        formData.get("Engineer") ? "Engineer" : null,
        formData.get("AnR") ? "AnR" : null,
      ].filter((position) => position !== null) as string[],

      sns: formData.get("sns") as string,
      description: formData.get("description") as string,
      // file: formData.get("file"),

      verified: false,
    };
    if (
      data.displayName === null ||
      data.position.length === 0 ||
      data.sns === null ||
      data.description === null
    )
      return redirect("/mypage/edit/profile");
    try {
      await db
        .collection("artists")
        .doc(decodedToken.uid)
        .set(data)
        .then(() => {
          console.log("Document successfully written! ", data);
        });
    } catch (error) {
      console.log(error);
    }

    redirect("/mypage");
  } else {
    redirect("/login");
  }
}
