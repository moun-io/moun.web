"use server";
import { Song, Genre, Vibe } from "@/lib/utils/types";
import { Genres, Vibes } from "@/lib/utils/const";
import { verifyId } from "@/lib/actions/verify-id";
import { redirect } from "next/navigation";
import ArrayFilter from "@/lib/utils/array-filter";
import { storage } from "../firebase/server";
import { getDownloadURL } from "firebase-admin/storage";
export default async function onUploadSong(
  prevState: { message: string },
  formData: FormData
) {
  const uid = await verifyId(formData.get("userId") as string);
  if (!uid) {
    return {
      message: "로그인이 필요합니다.",
    };
  }
  const photoFile = formData.get("photo") as File;
  let photoURL: string = "";
  // console.log("formData", formData.get("photo"));
  const buffer = await photoFile.arrayBuffer();
  // console.log(buffer);
  //* 이미지 업로드
  if (photoFile.size > 0) {
    //*파일이 있을 때만 업로드
    if (
      photoFile.size < 10000000 && //10MB
      ["image/png", "image/jpg", "image/jpeg"].includes(photoFile.type)
    ) {
      try {
        const fileRef = await storage
          .bucket("moun-df9ff.appspot.com")
          .file(`songs/${uid}/album`);
        console.log("fileRef", fileRef);
        await fileRef.save(Buffer.from(buffer), {
          contentType: photoFile.type,
          metadata: {
            cacheControl: "public, max-age=31536000",
          },
        });
        photoURL = await getDownloadURL(fileRef);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(photoFile.type);
      return {
        message: "10MB이하의 PNG/JPG 파일을 올려주세요. ",
      };
    }
  }

  const selectedGenres = ArrayFilter(Genres, formData) as Genre[];
  const selectedVibes = ArrayFilter(Vibes, formData) as Vibe[];
  const song = new Song(
    audioURL,
    photoURL,
    formData.get("title") as string,
    formData.get("artist") as string,
    selectedGenres,
    selectedVibes,
    formData.get("length") as string,
    formData.get("audio") as File,
    parseInt(formData.get("currentPrice") as string),
    parseInt(formData.get("buyPrice") as string),
    formData.get("expireDate") as string
  );
  console.log(song);
  if (false) {
    redirect("/mypage");
  }
}
