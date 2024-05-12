"use server";
import { redirect } from "next/navigation";
import { verifyId } from "@/lib/actions/verify-id";
import { Artist } from "@/lib/class/artist";
export async function onUpdateProfile(
  prevState: { message: string },
  formData: FormData
) {
  const artist = new Artist(formData);
  const uid = await verifyId(artist.uid as string);
  if (!uid) {
    return {
      message: "로그인이 필요합니다.",
    };
  }
  const errorMsg = await artist.update();
  if (errorMsg) {
    return { message: errorMsg };
  }
  redirect("/mypage");
}
