"use server";
import { Song, Genre, Vibe } from "@/lib/utils/types";
import { Genres, Vibes } from "@/lib/utils/const";
import { verifyId } from "@/lib/actions/verify-id";
import ArrayFilter from "@/lib/utils/array-filter";
import { db, storage } from "../firebase/server";
import { getDownloadURL } from "firebase-admin/storage";
import { redirect } from "next/navigation";
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

  const selectedGenres = ArrayFilter(Genres, formData) as Genre[];
  const selectedVibes = ArrayFilter(Vibes, formData) as Vibe[];
  let docRef;
  let photoURL: string = "";
  const photoFile = formData.get("photo") as File;
  const audioFile = formData.get("audio") as File;
  let audioURL = "";
  const audioBuffer = await photoFile.arrayBuffer();
  const photoBuffer = await photoFile.arrayBuffer();
  const song = new Song(
    "",
    "",
    formData.get("title") as string,
    formData.get("userId") as string,
    formData.get("length") as string,
    selectedGenres,
    selectedVibes,
    parseInt(formData.get("currentPrice") as string),
    parseInt(formData.get("buyPrice") as string),
    formData.get("expireDate") as string
  );
  if (
    !(
      audioFile.size < 10000000 &&
      audioFile.size > 0 && //10MB
      ["audio/mp3", "audio/mpeg"].includes(audioFile.type)
    )
  )
    return {
      message: " 10MB 이하의 MP3/MPEG파일을 올려주세요.",
    };

  if (
    !(
      photoFile.size > 0 &&
      photoFile.size < 10000000 && //10MB
      ["image/png", "image/jpg", "image/jpeg"].includes(photoFile.type)
    )
  )
    return {
      message: "10MB 이하의 PNG/JPG 파일을 올려주세요.",
    };

  try {
    docRef = await db
      .collection("songs")
      .add({ ...song })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        return docRef;
      });
  } catch (error) {
    return {
      message: "업로드에 실패했습니다. 다시 시도해주세요.",
    };
  }

  try {
    const fileRef = await storage
      .bucket("moun-df9ff.appspot.com")
      .file(`songs/${docRef.id}/song`);
    console.log("fileRef", fileRef);
    await fileRef.save(Buffer.from(audioBuffer), {
      contentType: audioFile.type,
      metadata: {
        cacheControl: "public, max-age=31536000",
      },
    });
    audioURL = await getDownloadURL(fileRef);
    await docRef.update({ audioURL });
  } catch (error) {
    await docRef.delete();
    return {
      message: "업로드에 실패했습니다. 다시 시도해주세요.",
    };
  }

  try {
    const fileRef = await storage
      .bucket("moun-df9ff.appspot.com")
      .file(`songs/${docRef.id}/album`);
    console.log("fileRef", fileRef);
    await fileRef.save(Buffer.from(photoBuffer), {
      contentType: photoFile.type,
      metadata: {
        cacheControl: "public, max-age=31536000",
      },
    });
    photoURL = await getDownloadURL(fileRef);
    await docRef.update({ photoURL });
  } catch (error) {
    await docRef.delete();
    return {
      message: "이미지 업로드에 실패했습니다. 다시 시도해주세요.",
    };
  }
  redirect("/mypage");
}
