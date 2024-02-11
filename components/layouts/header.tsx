"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import MOUN from "@/public/image/moun.png";
import LOGO from "@/public/image/symbol.png";
import Image from "next/image";

import { useUser } from "@/lib/context/authProvider";
import Profile from "../svg/profile";
export default function Header({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const path = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpened(!isOpened);

  // * 화면 크기에 따른  상태 변경 Event Listener
  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // * 화면 크기에 따른 NAV open 여부 변경
  useEffect(() => {
    isMobile ? setIsOpened(false) : setIsOpened(true);
  }, [isMobile, path]);

  useEffect(() => {
    if (navRef.current !== null) {
      isOpened && isMobile
        ? navRef.current.classList.remove("hidden")
        : navRef.current.classList.add("hidden");
    }
  }, [isOpened]);
  //! 화면 크기전환시 NAV가 깜빡이면서 나타나는 문제 해결 , 먼저 invisible 클래스를 추가해놓고 (useEffect가 실행되기 이전에 등록된 css가 visible상태이면 깜빡거렸다가 effect 이후에 invisible 됐어서 훅 적용 기간 딜레이동안 element 가 보였었음), isOpened가 true일때 invisible 클래스를 제거한다.
  //! 이렇게 하면 화면 크기 전환시 깜빡거리지 않고 자연스럽게 나타난다.
  //! isOpened 를 넣은 이유는 isMobile 이 먼저 바뀌고 isOpened 가 바뀌기 때문에 딜레이를 줄수있다.
  //! 더 나은 방법으로 추후에 충분히 개선가능

  return (
    <>
      <header className="fixed top-0 z-30 flex w-full bg-neutral-900 h-[4.5rem]">
        <div className="Box px-4 flex  justify-between items-center">
          <div className=" flex gap-3">
            {/*Hamburger*/}
            <div className="lg:hidden">
              <button
                className="flex relative z-40 h-full w-5 "
                onClick={toggle}
              >
                {isOpened ? (
                  <div className="transition-all self-center bg-white w-5 h-0.5 rotate-45 before:block before:bg-white before:w-5 before:h-0.5 before:rotate-90"></div>
                ) : (
                  <div className="transition-all w-5 h-0.5 bg-white self-center before:block before:bg-white before:relative before:top-2 before:content-['.'] before:indent-[-9999px] before:w-5 before:h-0.5 after:block after:w-5 after:h-0.5 after:indent-[-9999px] after:bg-white after:content-['.'] after:bottom-2.5 after:relative"></div>
                )}
              </button>
            </div>
            <Home />
          </div>
          <Login />
        </div>
        {/* NAV*/}
        <nav
          ref={navRef}
          className="absolute transition hidden pointer-events-none w-screen h-screen lg:flex text-white  bg-neutral-900/60 lg:bg-transparent lg:h-[4.5rem] text-base z-30"
        >
          <ol className="gap-16 Center w-full lg:flex-row flex-col bg-neutral-900 lg:bg-transparent py-10 lg:p-0">
            <li
              className={twMerge(
                "lg:hidden",
                "transition hover:text-purple-400 hover:animate-pulse pointer-events-auto",
                path === "/" && "text-purple-400"
              )}
            >
              <Link href="/">Home</Link>
            </li>
            <li
              className={twMerge(
                "transition hover:text-purple-400 hover:animate-pulse pointer-events-auto",
                path.includes("/songs") && "text-purple-400"
              )}
            >
              <Link href="/songs">Songs</Link>
            </li>
            <li
              className={twMerge(
                "transition hover:text-purple-400 hover:animate-pulse pointer-events-auto",
                path.includes("/artists") && "text-purple-400"
              )}
            >
              <Link href="/artists">Artists</Link>
            </li>
            <li
              className={twMerge(
                "transition hover:text-purple-400 hover:animate-pulse pointer-events-auto",
                path.includes("/released") && "text-purple-400"
              )}
            >
              <Link href="/released">Released</Link>
            </li>
          </ol>
        </nav>
      </header>
      {children}
    </>
  );
}

function Home() {
  return (
    <Link className="Center h-full cursor-pointer flex gap-3" href="/">
      <Image alt="Logo" priority src={LOGO} />
      <Image alt="MOUN" priority className="lg:block hidden" src={MOUN} />
    </Link>
  );
}

function Login() {
  const { user, authLoading, artist, artistLoading } = useUser();

  return (
    <>
      {artistLoading || authLoading ? (
        // * 로딩 상태일때
        <div className="bg-neutral-800 rounded-full size-9 animate-pulse"></div>
      ) : // * 로그인 상태일때
      user ? (
        <div className="text-white flex gap-4">
          <Link href="/mypage">
            {artist?.photoURL ? (
              <Image
                className="rounded-full aspect-square size-9"
                src={artist.photoURL}
                width={33}
                height={33}
                alt="my-page"
                priority
              ></Image>
            ) : (
              <Profile className="size-9" />
            )}
          </Link>
        </div>
      ) : (
        // * 로그인 상태가 아닐때
        <Link
          href="/login"
          className="text-sm ⚪️ bg-transparent text-white px-4 pointer-events-auto"
        >
          시작하기
        </Link>
      )}
    </>
  );
}
