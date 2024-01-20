"use client";
import { useState } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import MOUN from "@/public/image/moun.png";
import Logo from "@/public/image/favicon.svg";
import Image from "next/image";
export default function Header() {
  const LinkClass =
    "text-white hover:text-purple-400 transition pointer-events-auto";
  const path = usePathname();
  return (
    <header className="fixed top-0 z-10 flex w-full bg-neutral-900 h-[4.5rem] ">
      <div className="Box flex justify-between items-center">
        <div className="text-white">
          <Link className="Center h-full cursor-pointer flex gap-2" href="/">
            <Image alt="Logo" priority src={Logo} />
            <Image alt="MOUN" priority src={MOUN} />
          </Link>
        </div>

        <Link href="/login" className="text-sm ⚪️ bg-transparent text-white">
          시작하기
        </Link>
      </div>
      <div className="fixed pointer-events-none w-full text-white h-[4.5rem] lg:flex hidden text-base">
        <div className="gap-16 Center w-full ">
          <Link
            className={twMerge(
              LinkClass,
              path === "/songs" && "text-purple-400"
            )}
            href="/songs"
          >
            Songs
          </Link>
          <Link
            className={twMerge(
              LinkClass,
              path === "/artists" && "text-purple-400"
            )}
            href="/artists"
          >
            Artists
          </Link>
          <Link
            className={twMerge(
              LinkClass,
              path === "/released" && "text-purple-400"
            )}
            href="released"
          >
            Released
          </Link>
        </div>
      </div>
    </header>
  );
}
