"use server";
import { db, storage } from "../firebase/server";
import { redirect } from "next/navigation";
import { getDownloadURL } from "firebase-admin/storage";
import { Position } from "@/lib/utils/types";
import { isValidUrl } from "@/lib/utils/isValid";
import { ArtistForm } from "@/lib/utils/types";
import { Positions } from "@/lib/utils/const";
import ArrayFilter from "@/lib/utils/array-filter";
import { verifyId } from "@/lib/actions/verify-id";
export async function onUpdateProfile(
  prevState: { message: string },
  formData: FormData
) {
  const uid = await verifyId(formData.get("userId") as string);
  if (!uid) {
    return {
      message: "로그인이 필요합니다.",
    };
  }
  //? 유저가 작성한 프로필인지 확인
  const file = formData.get("photo") as File;
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
          .file(`avatars/${uid}`);
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

  const selectedPositions = ArrayFilter(Positions, formData) as Position[];
  const data: ArtistForm = {
    displayName: formData.get("name") as string,
    positions: selectedPositions,
    sns: formData.get("sns") as string,
    description: formData.get("description") as string,
    ...(photoURL && isValidUrl(photoURL) && { photoURL: photoURL }),
  };
  if (data.displayName.length < 2)
    return { message: "2자 이상의 활동명을 입력해주세요" };
  if (data.positions.length === 0) return { message: "포지션을 선택해주세요" };
  try {
    await db
      .collection("artists")
      .doc(uid)
      .update({ ...data })
      .then(() => {
        console.log("Document successfully written! ", data);
      });
  } catch (error) {
    console.log(error);
  }

  redirect("/mypage");
}
