"use client";
import React, { useState } from "react";
import FileUpload from "@/components/svg/fileUpload";
import { useRouter } from "next/navigation";
import { Box, TextInput } from "@/components/mypage/form";
import { Slider, Switch } from "@nextui-org/react";
export default function Upload() {
  const [step, setStep] = useState(1);
  const [audio, setAudio] = useState<File | null>(null);
  const [price, setPrice] = useState([200, 2000]);
  const router = useRouter();
  const onAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === "audio/mp3") {
        if (file.size < 10000000 && file.size > 0) {
          setAudio(file);
          return;
        } else {
          setAudio(null);
          alert("파일 사이즈가 너무 큽니다. 10MB 이하의 파일을 올려주세요.");
        }
      } else {
        console.log(file.type);
        setAudio(null);
        alert("올바른 형식을 올려주세요.");
      }
    } else {
      setAudio(null);
      alert("파일을 올려주세요.");
    }
  };
  const nextStep: React.MouseEventHandler = (e) => {
    e.preventDefault();
    setStep((step) => (step < 3 ? step + 1 : 3));
  };
  const prevStep: React.MouseEventHandler = (e) => {
    e.preventDefault();
    setStep((step) => (step > 1 ? step - 1 : 1));
  };
  const onSubmit: React.MouseEventHandler = (e) => {
    e.preventDefault();
    console.log("submit");
  };
  const onCancel: React.MouseEventHandler = (e) => {
    e.preventDefault();
    router.back();
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-extrabold text-3xl ">Upload Song</h1>
        <div className="text-purple-400">Step {step} / 3</div>
      </div>
      <h2 className="mt-12 flex items-center gap-2 text-lg font-bold">
        <div className="Center rounded-full bg-neutral-200 size-8 text-center">
          {step}
        </div>
        {Title(step)}
      </h2>
      <form action="">
        <input
          type="file"
          hidden
          accept="audio/mp3"
          id="mp3"
          onChange={onAudioChange}
        />
        <label
          htmlFor="mp3"
          className="Center flex-col gap-3 my-8 w-full bg-neutral-100 h-60 cursor-pointer"
        >
          <FileUpload />
          {audio ? audio.name : <div>MP3 형식의 파일을 올려주세요.</div>}
        </label>
        <Box
          label="입찰가 설정"
          description="이용중인 플랜은 입찰가능 범위가 $200~$2000 입니다. 최고가에 입찰하면 바로 거래가 성사됩니다."
        >
          <Slider
            label="Select a budget"
            formatOptions={{ style: "currency", currency: "USD" }}
            step={10}
            radius="none"
            color="secondary"
            maxValue={2000}
            minValue={200}
            value={price}
            classNames={{
              filler: "bg-fuchsia-500",
            }}
            renderThumb={(props) => (
              <div
                {...props}
                className="group top-1/2 bg-fuchsia-500 cursor-grab rounded-sm data-[dragging=true]:cursor-grabbing"
              >
                <span className="transition-transform bg-fuchsia-500  w-5 h-5 block group-data-[dragging=true]:scale-80" />
              </div>
            )}
            onChange={setPrice as any}
            className="max-w-md"
          />
        </Box>
        <Box
          label="저작권 양도 옵션 설정"
          description="추가 금액을 받고 저작권을 양도하실 건가요?"
        >
          <Switch size="md" color="secondary"></Switch>
        </Box>
      </form>

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
      </div>
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
