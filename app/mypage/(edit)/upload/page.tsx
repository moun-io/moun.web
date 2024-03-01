"use client";
import React, { useEffect, useState } from "react";

import { useRouter, usePathname } from "next/navigation";
import onUploadSong from "@/lib/actions/uploadSong";

import SongUploadForm from "@/components/mypage/song-upload-form";
import { useFormState } from "react-dom";
export default function Upload() {
  const [step, setStep] = useState(1);
  const [price, setPrice] = useState([200, 2000]);
  const router = useRouter();
  const [state, uploadAction] = useFormState(onUploadSong, {
    message: "",
  });
  const nextStep: React.MouseEventHandler = (e) => {
    e.preventDefault();
    setStep((step) => (step < 3 ? step + 1 : 3));
  };
  const prevStep: React.MouseEventHandler = (e) => {
    e.preventDefault();
    setStep((step) => (step > 1 ? step - 1 : 1));
  };
  const onSubmit: React.MouseEventHandler = (e) => {
    confirm("작성을 완료하시겠습니까?") || e.preventDefault();
  };
  const onCancel: React.MouseEventHandler = (e) => {
    e.preventDefault();
    confirm("작성을 취소하시겠습니까?") && router.back();
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-extrabold text-3xl ">Upload Song</h1>
        <div className="text-purple-400">Step {step} / 3</div>
      </div>
      <h2 className=" flex items-center gap-2 text-lg font-bold">
        <div className="Center my-8 rounded-full bg-neutral-200 size-8 text-center">
          {step}
        </div>
        {Title(step)}
      </h2>
      <form action={uploadAction}>
        <SongUploadForm step={step} price={price} setPrice={setPrice} />

        <div className="flex gap-2 p-8">
          <button
            className="text-center p-4 flex-1 bg-neutral-200 rounded-xl"
            onClick={step === 1 ? onCancel : prevStep}
          >
            {step === 1 ? "Cancel" : "Back"}
          </button>
          <button
            className="text-center p-4 flex-1 bg-fuchsia-500 text-white rounded-xl"
            onClick={step < 3 ? nextStep : onSubmit}
          >
            {step === 3 ? "Confirm" : "Next"}
          </button>
          {state?.message}
        </div>
      </form>
    </div>
  );
}

function Title(page: number) {
  switch (page) {
    case 1:
      return "노래 파일을 업로드 해주세요";
      break;
    case 2:
      return "경매 정보를 입력해주세요";
      break;
    case 3:
      return "곡 정보를 입력해주세요";
      break;
  }
}
