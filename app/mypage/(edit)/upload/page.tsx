"use client";
import React, { useEffect, useState } from "react";
import FileUpload from "@/components/svg/fileUpload";
import { Genre } from "@/lib/utils/const";
import { useRouter } from "next/navigation";
import { Box, TextInput, SelectInput } from "@/components/mypage/form";
import { Slider, Switch } from "@nextui-org/react";
import ImageInput from "@/components/mypage/image-input";
export default function Upload() {
  const [step, setStep] = useState(1);
  const [price, setPrice] = useState([200, 2000]);
  const router = useRouter();

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
      <h2 className=" flex items-center gap-2 text-lg font-bold">
        <div className="Center my-8 rounded-full bg-neutral-200 size-8 text-center">
          {step}
        </div>
        {Title(step)}
      </h2>
      <form action="">
        <Input step={step} price={price} setPrice={setPrice} />
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

function Input({
  step,
  price,
  setPrice,
}: {
  step: number;
  price: number[];
  setPrice: (value: number[]) => void;
}) {
  const [audio, setAudio] = useState<File | null>(null);
  function formatDate(date: Date): string {
    let year = date.getFullYear();
    let month: string | number = date.getMonth() + 1; // getMonth() is zero-based, add 1 to get the correct month number
    let day: string | number = date.getDate();

    // Pad the month and day with a leading zero if they are less than 10
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  }

  const today = new Date();
  const threeDaysLater = new Date(today);
  const twoWeeksLater = new Date(today);
  twoWeeksLater.setDate(today.getDate() + 14);
  threeDaysLater.setDate(today.getDate() + 3);
  const [minDate, setMinDate] = useState(formatDate(threeDaysLater)); //YYYY-MM-DD
  const [maxDate, setMaxDate] = useState(formatDate(twoWeeksLater)); //YYYY-MM-DD
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
  switch (step) {
    case 1:
      return (
        <>
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
        </>
      );
      break;
    case 2:
      return (
        <div className="flex flex-col gap-8">
          <Box
            label="입찰가 설정"
            description="이용중인 플랜은 입찰가능 범위가 $200~$2000 입니다. 최고가에 입찰하면 바로 거래가 성사됩니다."
          >
            <Slider
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
            <div className="flex justify-between">
              <div>${price[0]}</div>
              <div>${price[1]}</div>
            </div>
          </Box>
          <Box
            label="저작권 양도 옵션 설정"
            description="추가 금액을 받고 저작권을 양도하실 건가요?"
          >
            <Switch size="md" color="secondary"></Switch>
          </Box>
          <Box
            label="경매기간 설정"
            description="최소 3일부터 최대 2주 동안 진행 가능합니다."
          >
            <div className="flex justify-between items-center">
              {/* <label
                htmlFor="startDate"
                className="bg-neutral-100 p-4 rounded-lg gap-2 flex justify-between"
              >
                <div>{minDate}</div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                  <path
                    fillRule="evenodd"
                    d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label> */}
              <input
                id="startDate"
                type="date"
                value={formatDate(today)}
                className="bg-neutral-100 p-4 rounded-lg text-black "
                disabled
              />
              <div>~</div>
              <input
                type="date"
                id="endDate"
                placeholder="종료일"
                min={minDate}
                max={maxDate}
                className="bg-neutral-100 p-4 flex-none rounded-lg cursor-pointer hover:bg-neutral-200 transition text-black"
              />
            </div>
          </Box>
        </div>
      );
      break;

    case 3:
      return (
        <div className="flex flex-col gap-8">
          <Box required label="노래 제목">
            <TextInput required placeholder="노래 제목 입력" name="title" />
          </Box>
          <Box
            label="커버 이미지 업로드"
            description="매력적인 이미지가 있으면 경매 입찰 수가 50% 늘어나요"
          >
            <ImageInput />
          </Box>
          <Box
            required
            label="노래 설명"
            description="노래에 대한 설명을 적어주세요."
          >
            <TextInput
              required
              placeholder="노래에 대한 설명을 적어주세요."
              name="description"
            />
          </Box>
          <Box label="장르 선택">
            <SelectInput
              legend="Choose the Genre of the song"
              array={Genre}
              defaultChecked={undefined}
            />
          </Box>
          <Box label="바이브 선택">
            <SelectInput
              legend="Choose the Vibe of the song"
              array={["Sad", "Happy", "Exciting", "Relaxing", "Energetic"]}
              defaultChecked={undefined}
            />
          </Box>
        </div>
      );
  }
}
