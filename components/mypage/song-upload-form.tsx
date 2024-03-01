"use client";

import { useState } from "react";
import {
  Box,
  TextInput,
  SelectInput,
  UserInput,
} from "@/components/mypage/form";
import { Slider, Switch } from "@nextui-org/react";
import ImageInput from "@/components/mypage/image-input";
import FileUpload from "@/components/svg/fileUpload";
import { Genres, Vibes } from "@/lib/utils/const";
import { useUser } from "@/lib/context/authProvider";

function formatDate(date: Date): string {
  let year = date.getFullYear();
  let month: string | number = date.getMonth() + 1; // getMonth() is zero-based, add 1 to get the correct month number
  let day: string | number = date.getDate();

  // Pad the month and day with a leading zero if they are less than 10
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
}
export default function SongUploadForm({
  step,
  price,
  setPrice,
}: {
  step: number;
  price: number[];
  setPrice: (value: number[]) => void;
}) {
  const { user } = useUser();
  const [audio, setAudio] = useState<File | null>(null);

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
      if (file.type === "audio/mp3" || file.type === "audio/mpeg") {
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

  return (
    <>
      <UserInput user={user} />
      <div style={{ display: step === 1 ? "flex" : "none" }}>
        <input
          type="file"
          name="audio"
          hidden
          accept="audio/mp3,audio/mpeg"
          id="mp3"
          onChange={onAudioChange}
        />
        <label
          htmlFor="mp3"
          className="Center p-8 text-center flex-col gap-3 my-8 w-full bg-neutral-100 h-60 cursor-pointer"
        >
          <FileUpload />

          {audio ? audio.name : <div>MP3 형식의 파일을 올려주세요.</div>}
        </label>
      </div>
      <div
        className="flex flex-col gap-8"
        style={{ display: step === 2 ? "flex" : "none" }}
      >
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
          <input hidden name="currentPrice" type="number" value={price[0]} />
          <input hidden name="buyPrice" type="number" value={price[1]} />
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
              name="expireDate"
              placeholder="종료일"
              min={minDate}
              max={maxDate}
              className="bg-neutral-100 p-4 flex-none rounded-lg cursor-pointer hover:bg-neutral-200 transition text-black"
            />
          </div>
        </Box>
      </div>
      <div
        className="flex flex-col gap-8"
        style={{ display: step === 3 ? "flex" : "none" }}
      >
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
            array={Genres}
            defaultChecked={undefined}
          />
        </Box>
        <Box label="바이브 선택">
          <SelectInput
            legend="Choose the Vibe of the song"
            array={Vibes}
            defaultChecked={undefined}
          />
        </Box>
      </div>
    </>
  );
}
