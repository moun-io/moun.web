"use server";
import { Song, Genre, Vibe, YYYYMMDD, HHMM, Length } from "@/lib/utils/types";
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
  const uid = await verifyId(formData.get("userId") as string);
  if (!uid) {
    return {
      message: "로그인이 필요합니다.",
    };
  }
  // console.log(formData.get("expireDate"), formData.get("expireTime"));

  if (
    !isValidDate(formData.get("expireDate") as string) ||
    !isValidTime(formData.get("expireTime") as string)
  )
    return { message: "날짜를 올바르게 입력해주세요." };

  if (
    formData.get("currentPrice") === null ||
    formData.get("buyPrice") === null
  )
    return { message: "가격을 입력해주세요." };
  if (formData.get("currentPrice") === formData.get("buyPrice"))
    return { message: "판매가와 즉시 구매가는 같을 수 없습니다." };
  if (parseInt(formData.get("currentPrice") as string) < 0)
    return { message: "가격은 0원 이상이어야 합니다." };
  if (formData.get("title") === null)
    return { message: "제목을 입력해주세요." };
  if (formData.get("photo") === null)
    return { message: "이미지를 업로드해주세요." };

  if (formData.get("audio") === null)
    return { message: "음악 파일을 업로드해주세요." };

  const selectedGenres = ArrayFilter(Genres, formData) as Genre[];
  const selectedVibes = ArrayFilter(Vibes, formData) as Vibe[];

  if (selectedGenres.length === 0 || selectedVibes.length === 0)
    return { message: "1가지 이상의 장르와 분위기를 선택해주세요." };
  let docRef;
  const photoFile = formData.get("photo") as File;
  const audioFile = formData.get("audio") as File;
  const audioBuffer = await audioFile.arrayBuffer();
  const photoBuffer = await photoFile.arrayBuffer();

  const length = parseInt(formData.get("length") as string);
  if (!length) return { message: "음악 길이를 입력해주세요." };
  const lengthMin = Math.floor(length / 60)
    .toString()
    .padStart(2, "0");
  const lengthSec = length % 60;
  const lengthString: Length = `${lengthMin}:${lengthSec}`;

  const song = new Song(
    "",
    "",
    formData.get("title") as string,
    formData.get("description") as string,
    formData.get("userId") as string,
    lengthString,
    selectedGenres,
    selectedVibes,
    parseInt(formData.get("currentPrice") as string),
    parseInt(formData.get("buyPrice") as string),
    formData.get("expireDate") as YYYYMMDD,
    formData.get("expireTime") as HHMM
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
        // console.log("Document written with ID: ", docRef.id);
        return docRef;
      });
    const audioFileRef = await storage
      .bucket("moun-df9ff.appspot.com")
      .file(`songs/${docRef.id}/song`);
    // console.log("fileRef", audioFileRef);
    await audioFileRef.save(Buffer.from(audioBuffer), {
      contentType: audioFile.type,
      metadata: {
        cacheControl: "public, max-age=31536000",
      },
    });
    const audioURL = await getDownloadURL(audioFileRef);
    await docRef.update({ audioURL });
  } catch (error) {
    if (docRef) await docRef.delete();
    return {
      message: "노래 업로드에 실패했습니다. 다시 시도해주세요.",
    };
  }

  try {
    const fileRef = await storage
      .bucket("moun-df9ff.appspot.com")
      .file(`songs/${docRef.id}/album`);
    // console.log("fileRef", fileRef);
    await fileRef.save(Buffer.from(photoBuffer), {
      contentType: photoFile.type,
      metadata: {
        cacheControl: "public, max-age=31536000",
      },
    });
    const photoURL = await getDownloadURL(fileRef);
    await docRef.update({ photoURL });
  } catch (error) {
    await docRef.delete();
    return {
      message: "이미지 업로드에 실패했습니다. 다시 시도해주세요.",
    };
  }
  redirect("/mypage");
}
