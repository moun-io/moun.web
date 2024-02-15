"use client";
import React, { useState } from "react";
import LoginInput from "./login-input";
import SubmitButton from "./submit-button";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const onResetPassword: React.FormEventHandler = (e) => {
    e.preventDefault();
    const ok = confirm("비밀번호를 재설정하시겠습니까?");
    if (!ok) return;

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("이메일을 확인해주세요.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <form onSubmit={onResetPassword}>
      <LoginInput
        value={email}
        setter={setEmail}
        type="email"
        placeholder="Email"
      ></LoginInput>

      <SubmitButton text="비밀번호 재설정" errorMsg={errorMsg}></SubmitButton>
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
    </form>
  );
}
