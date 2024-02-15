import Link from "next/link";
import Image from "next/image";
import LoginImg from "@/public/image/login-page.png";
import LoginForm from "@/components/login/login-form";
import { twMerge } from "tailwind-merge";
import LoginProvidersForm from "@/components/login/login-providers-form";

export default function Login() {
  return (
    <>
      <h1 className="H2 w-80 hidden my-10 lg:block">
        Get To Know Each Other Through Songs
      </h1>
      {/*  login */}
      <div className="w-[min(25rem,85%)] Center flex-col">
        <LoginForm>
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
              href="/reset-password"
              className="text-purple-400 hover:animate-pulse underline"
            >
              {" "}
              Reset Password →
            </Link>
          </div>
          <div className=" text-neutral-400 w-full border-t-2 border-solid border-black-200 my-4"></div>
        </LoginForm>
      </div>
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
