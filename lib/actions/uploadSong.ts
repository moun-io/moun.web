"use server";
import { Song } from "@/lib/class/song";
import { Genre, Vibe, YYYYMMDD, HHMM, Length } from "@/lib/utils/types";
import { Genres, Vibes } from "@/lib/utils/const";
import { verifyId } from "@/lib/actions/verify-id";
import ArrayFilter from "@/lib/utils/array-filter";
import { db, storage } from "../firebase/server";
import { getDownloadURL } from "firebase-admin/storage";
import { redirect } from "next/navigation";
import { isValidDate, isValidTime } from "../utils/isValid";

export default async function onUploadSong(
  prevState: { message: string },
  formData: FormData
) {
  if (!(await verifyId(formData.get("userId") as string)))
    return { message: "잘못된 접근입니다." };
  const song = new Song(formData);
  const errorMsg = await song.upload();
  if (errorMsg) return errorMsg;
  // else redirect("/mypage");
  else {
    redirect("/mypage");
    return { message: "업로드 성공" };
  }

  // const song = new Song(formData);
  // const errorMsg = song.isValidForm();
  // if (errorMsg) return errorMsg;
  // const docRef = await song.uploadDoc();
  // if (!docRef)
  //   return { message: "데이터 업로드에 실패했습니다. 다시 시도해주세요." };
  // const songErrorMsg = await song.uploadSong(docRef);
  // if (songErrorMsg) return songErrorMsg;
  // const photoErrorMsg = await song.uploadPhoto(docRef);
  // if (photoErrorMsg) return photoErrorMsg;
}
