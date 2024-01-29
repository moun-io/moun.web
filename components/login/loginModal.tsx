"use client";

import { useState } from "react";
import GoogleLogo from "@/public/image/google-logo.png";
import KakaoLogo from "@/public/image/kakao-logo.png";
import Image, { StaticImageData } from "next/image";
import { loginWithGoogle } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginModal() {
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const onGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const loginList = [
    {
      title: "구글로 로그인하기",
      url: "/",
      logo: GoogleLogo,
      onLogin: onGoogleLogin,
    },
    {
      title: "카카오로 로그인하기",
      url: "/",
      logo: KakaoLogo,
    },
  ];

  return (
    <>
      {loginList.map((element, idx) => (
        <div
          key={idx}
          className="my-1 flex justify-center text-center font-medium text-base w-[min(25rem,85%)] h-12 rounded-lg border border-gray leading-[3rem] hover:shadow-md hover:border-black2"
          onClick={element.onLogin}
        >
          <Image
            priority
            className="px-2 object-contain"
            alt="logo"
            width={36}
            src={element.logo}
          />
          <span>{element.title}</span>
        </div>
      ))}
    </>
  );
}
