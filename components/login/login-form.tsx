"use client";

import { useState } from "react";

import { loginWithEmail } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

import LoginInput from "./login-input";
import LoginProvidersForm from "./login-providers-form";
export default function LoginForm({ children }: { children: React.ReactNode }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onEmailLogin = async (email: string, password: string) => {
    try {
      const credential = await loginWithEmail(email, password);
      if (credential) {
        router.replace("/");
      } else {
        setErrorMsg("아이디와 비밀번호를 다시 확인해주세요.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onEmailLogin(email, password);
        }}
        className="w-full Center flex-col"
      >
        <LoginInput
          type="email"
          value={email}
          setter={setEmail}
          placeholder="Email"
        />
        <LoginInput
          type="password"
          value={password}
          setter={setPassword}
          placeholder="Password"
        />
        <button className="my-1 px-4 bg-gray-200/55 w-full h-12 rounded-lg border border-gray leading-[3rem] hover:shadow-md hover:bg-purple-500  hover:text-white transition hover:border-neutral-300">
          Login
        </button>
      </form>
      {children}
      <LoginProvidersForm setErrorMsg={setErrorMsg} router={router} />
      {errorMsg && (
        <div className="text-red-600 text-md my-2 animate-pulse ">
          {errorMsg}
        </div>
      )}
    </>
  );
}
