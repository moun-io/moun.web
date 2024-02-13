"use client";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/lib/context/authProvider";
import Profile from "@/components/svg/profile";
import Verified from "../svg/verified";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfileCard() {
  const { artist, artistLoading, user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!artist?.positions) {
      router.replace("/mypage/profile");
    }
  }, [artist?.positions?.length]);
  return (
    artist?.positions && (
      <div className="m-auto px-4 flex w-[min(28rem,100%)] h-[4.5rem] ">
        <Link href="mypage/profile">
          {artistLoading ? (
            <div className="bg-neutral-500 animate-pulse size-20 rounded-full"></div> // * 로딩중일때
          ) : artist?.photoURL ? (
            <Image
              src={artist.photoURL}
              width={80}
              height={80}
              className="rounded-full aspect-square"
              alt="userProfile"
              priority
            />
          ) : (
            <Profile className="w-20 h-20" />
          )}
        </Link>
        <div className="ml-4 flex flex-col justify-between ">
          <h1 className="text-lg font-medium">
            <div>
              {artist?.displayName || "프로필을 업데이트해주세요"}
              <strong>
                {artist?.verified && <Verified className="size-6 inline" />}
              </strong>
            </div>
            {/* <div className="text-xs text-neutral-400">{artist?.positions}</div> */}
          </h1>

          <Link href="mypage/profile">
            <div className="Center w-20 h-8 text-xs text-normal rounded-[1.25rem] border border-magenta text-magenta hover:bg-purple-500 hover:text-white hover:border-white transition-colors duration-300">
              프로필 수정
            </div>
          </Link>
          {
            user?.emailVerified === false && (
              <div className="text-xs text-red-600">
                이메일 인증이 필요합니다.
              </div>
            ) // * 이메일 인증이 안됐을때
          }
        </div>
      </div>
    )
  );
}
