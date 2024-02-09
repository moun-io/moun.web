"use client";
import { useEffect, useState, useRef, use } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import MOUN from "@/public/image/moun.png";
import LOGO from "@/public/image/symbol.png";
import Image from "next/image";
import { useArtist } from "@/lib/context/artistProvider";
import { useUser } from "@/lib/context/authProvider";
export default function Header({ children }: { children: React.ReactNode }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { artist } = useArtist();
  const { user } = useUser();
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
          {
            // * 로그인 상태일때
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="size-9"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
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
            )
          }
        </div>
        {/* NAV*/}
        <nav
          ref={navRef}
          className="absolute transition hidden pointer-events-none w-screen h-screen lg:flex text-white  bg-neutral-900/60 lg:bg-transparent lg:h-[4.5rem] text-base"
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
                path === "/songs" && "text-purple-400"
              )}
            >
              <Link href="/songs">Songs</Link>
            </li>
            <li
              className={twMerge(
                "transition hover:text-purple-400 hover:animate-pulse pointer-events-auto",
                path === "/artists" && "text-purple-400"
              )}
            >
              <Link href="/artists">Artists</Link>
            </li>
            <li
              className={twMerge(
                "transition hover:text-purple-400 hover:animate-pulse pointer-events-auto",
                path === "/released" && "text-purple-400"
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
