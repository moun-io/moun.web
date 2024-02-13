import Link from "next/link";
import Image from "next/image";
import LoginImg from "@/public/image/login-page.png";
import LoginForm from "@/components/login/login-form";
import { twMerge } from "tailwind-merge";

export default function Login() {
  return (
    <>
      <h1 className="H2 w-80 hidden my-10 lg:block">
        Get To Know Each Other Through Songs
      </h1>
      {/*  login */}
      <LoginForm />
      <p className="my-4 text-center text-neutral-400 text-sm font-normal">
        회원가입시{" "}
        <Link className="underline" href="/">
          약관
        </Link>
        에 동의하신 것으로 간주됩니다.
      </p>
    </>
  );
}
