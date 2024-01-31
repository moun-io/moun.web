import React from "react";
import Link from "next/link";
import Image from "next/image";
import LoginImg from "@/public/image/login-page.png";
import LoginModal from "@/components/login/loginModal";
import { twMerge } from "tailwind-merge";
import { auth } from "@/lib/firebase/client";
import { redirect } from "next/navigation";
import { User } from "firebase/auth";
export default function Login() {
  return (
    <div className={twMerge("Box flex flex-col-reverse lg:flex-row h-full")}>
      <section className="w-full lg:w-1/2 lg:block mt-10">
        <div className="flex flex-col items-center">
          <h1 className="H2 w-80 my-10 hidden lg:block">
            Get To Know Each Other Through Songs
          </h1>
          {/* //* login */}
          <LoginModal />
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
