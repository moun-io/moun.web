"use client";

import { useState } from "react";
import GoogleLogo from "@/public/image/google-logo.png";
import KakaoLogo from "@/public/image/kakao-logo.png";
import Image, { StaticImageData } from "next/image";
import { loginWithGoogle, loginWithEmail } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginModal() {
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onGoogleLogin = async () => {
    try {
      const credential = await loginWithGoogle();
      if (credential) {
        router.replace("/");
      } else {
        setErrorMsg("로그인에 실패하였습니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const onEmailLogin = async (email, password) => {
  //   try {
  //     const credential = await loginWithEmail(email, password);
  //     if (credential) {
  //       router.replace("/");
  //     } else {
  //       setErrorMsg("아이디와 비밀번호를 다시 확인해주세요.");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const loginList = [
    {
      title: "구글로 로그인하기",

      logo: GoogleLogo,
      onLogin: onGoogleLogin,
    },

    // {
    //   title: "카카오로 로그인하기",

    //   logo: KakaoLogo,
    // },
  ];

  return (
    <div className="w-[min(25rem,85%)] Center flex-col">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onEmailLogin(email, password);
        }}
        className="w-full Center flex-col"
      >
        <input
          type="email"
          name="email"
          value={email}
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
          className="my-1 px-4 font-medium w-full h-12 rounded-lg border border-gray leading-[3rem] hover:shadow-md hover:border-neutral-300 "
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          placeholder="Password"
          className="my-1 px-4 font-medium w-full h-12 rounded-lg border border-gray leading-[3rem] hover:shadow-md hover:border-neutral-300 "
        />
        <button className="my-1 px-4 bg-gray-200/55 w-full h-12 rounded-lg border border-gray leading-[3rem] hover:shadow-md hover:bg-purple-500  hover:text-white transition hover:border-neutral-300">
          Login
        </button>
      </form>
      <div className="text-sm text-neutral-400 my-2 ">
        <strong className="font-medium">Moun</strong>이 처음이신가요?{" "}
        <Link
          href="/signup"
          className="text-purple-400 underline hover:animate-pulse"
        >
          Sign up →
        </Link>
      </div>

      <div className="text-sm text-neutral-400 ">
        비밀번호를 잊어버리셨나요?{" "}
        <Link
          href="/"
          className="text-purple-400 hover:animate-pulse underline"
        >
          {" "}
          Reset Password →
        </Link>
      </div>
      {errorMsg && (
        <div className="text-red-600 text-md my-2 animate-pulse ">
          {errorMsg}
        </div>
      )}
      <div className="w-full border-t-2 border-solid border-black-200 my-4"></div>
      {loginList.map((element, idx) => (
        <div
          key={idx}
          className="cursor-pointer my-1 flex justify-center text-center font-medium text-base w-full h-12 rounded-lg border border-gray leading-[3rem] hover:shadow-md hover:border-neutral-300"
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
    </div>
  );
}
