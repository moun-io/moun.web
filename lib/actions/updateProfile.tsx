"use server";
import { cookies } from "next/headers";
import { db, storage } from "../firebase/server";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/firebase/verifyToken";
import { ref, uploadBytes } from "firebase/storage";
import { log } from "firebase-functions/logger";
import { getDownloadURL } from "firebase-admin/storage";

export interface Artist {
  displayName: string;
  position: string[];
  sns: string;
  description: string;

  photoURL?: string | null;
}
export async function onUpdateProfile(formData: FormData) {
  // await new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     console.log("waiting");

  //     resolve("resolved");
  //   }, 2000);
  // });

  const token = cookies().get("__token");
  if (!token) return redirect("/login");
  const decodedToken = await verifyToken(token.value);
  if (!decodedToken) return redirect("/login");

  //? 유저가 작성한 프로필인지 확인
  if (formData.get("userId") === decodedToken.uid) {
    const file = formData.get("photo") as File;
    let photoURL: string = "";
    console.log("formData", formData.get("photo"));

    const buffer = await file.arrayBuffer();
    console.log(buffer);

    if (file && file.size < 10000000 && file.type.includes("image")) {
      try {
        const fileRef = await storage
          .bucket("moun-df9ff.appspot.com")
          .file(`avatars/${decodedToken.uid}`);
        console.log("fileRef", fileRef);
        await fileRef.save(Buffer.from(buffer), {
          contentType: file.type,
          metadata: {
            cacheControl: "public, max-age=31536000",
          },
        });
        photoURL = await getDownloadURL(fileRef);
      } catch (error) {
        console.log(error);
      }
    }

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
      ...(photoURL && { photoURL: photoURL }),
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
        .update({ ...data })
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
