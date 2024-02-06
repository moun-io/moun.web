"use client";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { auth } from "@/lib/firebase/client";
import { onUpdateProfile } from "@/lib/actions/updateProfile";
import { useFormStatus } from "react-dom";
import SubmitButton from "@/components/mypage/submit-button";
import { Stringifier } from "postcss";
import { log } from "console";
import Image from "next/image";
function Box({
  children,
  label,
  description,
  required = false,
}: {
  children: React.ReactNode;
  label: string;
  description?: string;
  required?: boolean;
}) {
  return (
    <div className="w-full border-neutral-300 border-solid border rounded-2xl p-6">
      <label className="block font-bold">
        {label} {required && <p className="inline"> * </p>}
      </label>
      {description && (
        <div className="text-neutral-400 text-sm mt-4">{description}</div>
      )}
      <div className="mt-8">{children}</div>
    </div>
  );
}

function TextInput({
  placeholder,
  name,
  value,
  onChange,
  defaultValue,
}: {
  placeholder: string;
  name: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string;
}) {
  return (
    <input
      onChange={onChange}
      value={value}
      className="w-full bg-neutral-100 rounded-lg p-4"
      type="text"
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  );
}
export default function Edit() {
  const Positions: ["Producer", "Vocal", "Rapper", "Engineer", "AnR"] = [
    "Producer",
    "Vocal",
    "Rapper",
    "Engineer",
    "AnR",
  ];
  const [user, setUser] = useState(auth.currentUser);

  const [fileUrl, setFileUrl] = useState<string | null>(null);
  return (
    <form action={onUpdateProfile} className="flex flex-col gap-4">
      <Box label="활동명" required>
        <TextInput placeholder="활동명 입력" name="name" />
      </Box>
      <Box label="포지션" required>
        <div className="flex flex-wrap gap-4">
          {Positions.map((element, idx) => (
            <div key={idx}>
              <input
                id={element}
                type="checkbox"
                name={element}
                className="peer hidden"
              />
              <label
                htmlFor={element}
                className={
                  "border p-3 block peer-checked:bg-purple-500 peer-checked:text-white text-sm text-neutral-500 rounded-2xl hover:border-purple-500 hover:text-purple-500 transition"
                }
              >
                {element}
              </label>
            </div>
          ))}
        </div>
      </Box>
      <Box label="SNS" description="매력을 어필할 SNS 계정을 연결해주세요">
        <TextInput name="sns" placeholder="인스타그램 프로필 URL 입력" />
      </Box>
      <Box
        label="자기소개"
        description="프로필에 보여질 소개문구를 입력해보세요 (최대 50자)"
      >
        <textarea
          className="w-full bg-neutral-100 rounded-lg p-4 "
          placeholder="자기소개 입력"
          maxLength={50}
          name="description"
        />
      </Box>
      <Box
        label="프로필 이미지"
        description="매력적인 이미지가 있으면 경매 입찰 수가 2배까지 늘어나요"
      >
        <div className="Center text-neutral-600">
          <label
            htmlFor="photo"
            className=" Center flex-col  gap-4 bg-neutral-100 size-80 rounded-full cursor-pointer"
          >
            {fileUrl ? (
              <Image
                src={fileUrl}
                alt="profile"
                height={100}
                width={100}
                className="w-80 h-80 rounded-full"
              />
            ) : (
              <>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                </div>
                <p> 720px 이상의 PNG / JPG 파일을 올려주세요</p>
              </>
            )}
          </label>
          <input
            id="photo"
            name="photo"
            type="file"
            hidden
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                if (e.target.files[0].size > 1000000) {
                  alert(
                    "파일 사이즈가 너무 큽니다. 10MB 이하의 파일을 올려주세요."
                  );
                  return;
                }
                const reader = new FileReader();
                const file = e.target.files[0];
                if (file) {
                  console.log(file);
                  reader.onload = (readEvent) => {
                    if (
                      readEvent.target != null &&
                      typeof readEvent.target.result === "string"
                    ) {
                      setFileUrl(readEvent.target.result);
                      console.log(readEvent.target.result);
                    }
                  };
                  reader.readAsDataURL(file);
                }
              }
            }}
          />
        </div>
      </Box>
      {user && <input hidden type="text" name="userId" value={user?.uid} />}
      <SubmitButton />
    </form>
  );
}
