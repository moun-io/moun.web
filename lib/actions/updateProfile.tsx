"use server";
import { cookies } from "next/headers";
import { db, storage } from "../firebase/server";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/firebase/verifyToken";
import { getDownloadURL } from "firebase-admin/storage";
import { isValidUrl } from "@/lib/utils/isValidUrl";
import { ArtistForm } from "@/lib/utils/types";

export async function onUpdateProfile(
  prevState: { message: string },
  formData: FormData
) {
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
    console.log("file", file);

    let photoURL: string = "";
    // console.log("formData", formData.get("photo"));
    const buffer = await file.arrayBuffer();
    // console.log(buffer);
    //* 이미지 업로드
    if (file.size > 0) {
      //*파일이 있을 때만 업로드
      if (
        file.size < 10000000 && //10MB
        ["image/png", "image/jpg", "image/jpeg"].includes(file.type)
      ) {
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
      } else {
        console.log(file.type);

        return {
          message: "10MB이하의 PNG/JPG 파일을 올려주세요. ",
        };
      }
    }

    const data: ArtistForm = {
      displayName: formData.get("name") as string,
      positions: [
        formData.get("Rapper") ? "Rapper" : null,
        formData.get("Vocal") ? "Vocal" : null,
        formData.get("Producer") ? "Producer" : null,
        formData.get("Engineer") ? "Engineer" : null,
        formData.get("AnR") ? "AnR" : null,
      ].filter((position) => position !== null) as string[],
      sns: formData.get("sns") as string,
      description: formData.get("description") as string,
      ...(photoURL && isValidUrl(photoURL) && { photoURL: photoURL }),
    };
    if (data.displayName.length < 2)
      return { message: "2자 이상의 활동명을 입력해주세요" };

    if (data.positions.length === 0)
      return { message: "포지션을 선택해주세요" };

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
    return { message: "잘못된 접근입니다." };
  }
}
