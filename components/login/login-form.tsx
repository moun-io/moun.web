"use client";

import { use, useEffect, useState } from "react";
import { loginWithEmail } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import LoginInput from "./login-input";
import LoginProvidersForm from "./login-providers-form";
import SubmitButton from "./submit-button";
export default function LoginForm({ children }: { children: React.ReactNode }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false); // [1
  const router = useRouter();

  const onEmailLogin: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setPending(true);
    localStorage.setItem("email", email); //이메일 저장
    const credential = await loginWithEmail(email, password);
    if (credential) {
      router.replace("/");
      setPending(false);
    } else {
      setErrorMsg("아이디와 비밀번호를 다시 확인해주세요.");
      setPending(false);
    }
    setPending(false);
  };

  useEffect(() => {
    const email = localStorage.getItem("email"); //바로전에 로그인한 이메일 불러오기
    if (email) {
      setEmail(email);
    }
  }, []);
  return (
    <>
      <form onSubmit={onEmailLogin} className="w-full Center flex-col">
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
        <SubmitButton
          text="Login"
          errorMsg={errorMsg}
          pending={pending}
        ></SubmitButton>
      </form>
      {children}
      <LoginProvidersForm setErrorMsg={setErrorMsg} router={router} />
    </>
  );
}
