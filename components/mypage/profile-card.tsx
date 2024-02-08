"use client";
import Image from "next/image";
import Link from "next/link";
import { auth, db } from "@/lib/firebase/client";
import { use, useEffect, useState } from "react";
import { doc, getDoc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { Artist } from "@/lib/utils/types";

import { useUser } from "@/lib/context/authProvider";
import { useArtist } from "@/lib/context/artistProvider";
export default function ProfileCard() {
  const { artist } = useArtist();

  return (
    <div className="m-auto px-4 flex w-[min(28rem,100%)] h-[4.5rem] ">
      <Link href="mypage/profile">
        {artist?.photoURL ? (
          <Image
            src={artist.photoURL}
            width={80}
            height={80}
            className="rounded-full aspect-square"
            alt="userProfile"
            priority
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-20 h-20"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </Link>
      <div className="ml-4 flex flex-col justify-between ">
        <h1 className="text-lg font-medium">{artist?.displayName}</h1>
        <Link href="mypage/profile">
          <div className="Center w-20 h-8 text-xs text-normal rounded-[1.25rem] border border-magenta text-magenta hover:bg-purple-500 hover:text-white hover:border-white transition-colors duration-300">
            프로필 수정
          </div>
        </Link>
      </div>
    </div>
  );
}
