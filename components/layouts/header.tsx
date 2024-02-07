"use client";
import { useEffect, useState, useRef, use } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import MOUN from "@/public/image/moun.png";
import LOGO from "@/public/image/symbol.png";
import Image from "next/image";
import { useArtist } from "@/lib/context/artistProvider";
export default function Header({ children }: { children: React.ReactNode }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { artist } = useArtist();
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

  //! 화면 크기전환시 NAV가 깜빡이면서 나타나는 문제 해결 , 먼저 invisible 클래스를 추가해놓고 (useEffect가 실행되기 이전에 등록된 css가 visible상태이면 깜빡거렸다가 effect 이후에 invisible 됐어서 훅 적용 기간 딜레이동안 element 가 보였었음), isOpened가 true일때 invisible 클래스를 제거한다.
  //! 이렇게 하면 화면 크기 전환시 깜빡거리지 않고 자연스럽게 나타난다.
  //! isOpened 를 넣은 이유는 isMobile 이 먼저 바뀌고 isOpened 가 바뀌기 때문에 딜레이를 줄수있다.
  //! 더 나은 방법으로 추후에 충분히 개선가능
  useEffect(() => {
    if (navRef.current !== null) {
      isOpened && isMobile
        ? navRef.current.classList.remove("hidden")
        : navRef.current.classList.add("hidden");
    }
  }, [isOpened]);

  return (
    <>
      <header className="fixed top-0 z-50 flex w-full bg-neutral-900 h-[4.5rem]">
        <div className="Box px-4 flex  justify-between items-center">
          <div className=" flex gap-3">
            <div className="lg:hidden">
              <button
                className="flex relative z-50 h-full w-5 "
                onClick={toggle}
              >
                {!isOpened ? (
                  <div className="transition-all w-5 h-0.5 bg-white self-center before:block before:bg-white before:relative before:top-2 before:content-['.'] before:indent-[-9999px] before:w-5 before:h-0.5 after:block after:w-5 after:h-0.5 after:indent-[-9999px] after:bg-white after:content-['.'] after:bottom-2.5 after:relative"></div>
                ) : (
                  <div className="transition-all self-center bg-white w-5 h-0.5 rotate-45 before:block before:bg-white before:w-5 before:h-0.5 before:rotate-90"></div>
                )}
              </button>
            </div>
            <Link className="Center h-full cursor-pointer flex gap-3" href="/">
              <Image alt="Logo" priority src={LOGO} />
              <Image
                alt="MOUN"
                priority
                className="lg:block hidden"
                src={MOUN}
              />
            </Link>
          </div>

          {artist ? (
            <div className="text-white flex gap-4 ">
              <Link href="/mypage">
                {artist.photoURL ? (
                  <Image
                    className="rounded-full"
                    src={artist.photoURL}
                    width={33}
                    height={33}
                    alt="my-page"
                    priority
                  ></Image>
                ) : (
                  ""
                )}
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm ⚪️ bg-transparent text-white px-4 pointer-events-auto"
            >
              시작하기
            </Link>
          )}
        </div>
        {/* NAV*/}
        <div
          ref={navRef}
          className="absolute transition hidden pointer-events-none w-screen h-screen lg:flex text-white  bg-neutral-900/60 lg:bg-transparent lg:h-[4.5rem] text-base"
        >
          <div className="gap-16 Center w-full lg:flex-row flex-col bg-neutral-900 lg:bg-transparent py-10 lg:p-0">
            <Link
              className={twMerge(
                "lg:hidden",
                "transition hover:text-purple-600 pointer-events-auto",
                path === "/" && "text-purple-400"
              )}
              href="/"
            >
              Home
            </Link>
            <Link
              className={twMerge(
                "transition hover:text-purple-600 pointer-events-auto",
                path === "/songs" && "text-purple-400"
              )}
              href="/songs"
            >
              Songs
            </Link>
            <Link
              className={twMerge(
                "transition hover:text-purple-600 pointer-events-auto",
                path === "/artists" && "text-purple-400"
              )}
              href="/artists"
            >
              Artists
            </Link>
            <Link
              className={twMerge(
                "transition hover:text-purple-600 pointer-events-auto",
                path === "/released" && "text-purple-400"
              )}
              href="/released"
            >
              Released
            </Link>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
