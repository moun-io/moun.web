import React from "react";
import Link from "next/link";
import Image from "next/image";
import LoginImg from "@/public/image/login-page.png";
import GoogleLogo from "@/public/image/google-logo.png";
import KakaoLogo from "@/public/image/kakao-logo.png";
import { twMerge } from "tailwind-merge";
export default function Login() {
  const loginList = [
    {
      title: "구글로 로그인하기",
      url: "/",
      logo: GoogleLogo,
    },
    {
      title: "카카오로 로그인하기",
      url: "/",
      logo: KakaoLogo,
    },
  ];

  return (
    <div className={twMerge("Box flex flex-col-reverse lg:flex-row h-full")}>
      <section className="w-full lg:w-1/2 lg:block mt-10">
        <div className="flex flex-col items-center">
          <h1 className="H2 w-80 my-10 hidden lg:block">
            Get To Know Each Other Through Songs
          </h1>
          {/* //* login */}
          {loginList.map((element, idx) => {
            return (
              <Link
                key={idx}
                className="my-1 flex justify-center text-center font-medium text-base w-[min(25rem,85%)] h-12 rounded-lg border border-gray leading-[3rem] hover:shadow-md hover:border-black2"
                href={element.url}
              >
                {/*//* logo */}
                <Image
                  className="px-2 object-contain"
                  alt="logo"
                  width={36}
                  src={element.logo}
                />
                <span>{element.title}</span>
              </Link>
            );
          })}
          <p className="my-10 text-center text-gray text-sm font-normal">
            회원가입시{" "}
            <Link className="underline" href="/">
              약관
            </Link>
            에 동의하신 것으로 간주됩니다.
          </p>
        </div>
      </section>
      <Image
        className="lg:w-1/2 h-[calc(16rem+10vw)] lg:h-auto w-full object-cover"
        src={LoginImg}
        priority
        alt=""
      />
    </div>
  );
}
