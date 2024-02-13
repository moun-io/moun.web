"use client";
import React from "react";
import { useRef, useState } from "react";
import { onUpdateProfile } from "@/lib/actions/updateProfile";
import SubmitButton from "@/components/mypage/submit-button";
import { Box, TextInput } from "@/components/mypage/form";
import Image from "next/image";
import { useFormState } from "react-dom";
import { useUser } from "@/lib/context/authProvider";
import { sendEmailVerification } from "firebase/auth";

export default function Profile() {
  const Positions: ["Producer", "Vocal", "Rapper", "Engineer", "AnR"] = [
    "Producer",
    "Vocal",
    "Rapper",
    "Engineer",
    "AnR",
  ];

  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const { artist, user } = useUser();
  const [state, updateAction] = useFormState(onUpdateProfile, {
    message: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const removeImage = (e: React.MouseEvent) => {
    const ok = confirm("정말로 삭제하시겠습니까?");
    if (ok) {
      if (fileInputRef?.current?.value) {
        setFileUrl(null);
        fileInputRef.current.value = "";
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 0) {
        if (file.size > 10000000) {
          alert("파일 사이즈가 너무 큽니다. 10MB 이하의 파일을 올려주세요.");
          return;
        } else {
          const reader = new FileReader();
          reader.onload = (readEvent) => {
            if (
              readEvent.target != null &&
              typeof readEvent.target.result === "string"
            ) {
              setFileUrl(readEvent.target.result);
            }
          };
          reader.readAsDataURL(file);
        }
      }
    } else {
      setFileUrl(null);
    }
  };

  if (user?.emailVerified === false) {
    return (
      <div className="Center flex-col gap-4">
        <h1 className="text-2xl text-red-600">이메일 인증이 필요합니다.</h1>
        <p className="text-xs text-neutral-600">
          이메일 인증을 위해 이메일을 확인해주세요.
        </p>
        <button
          className="underline text-blue-400"
          onClick={(e) => {
            e.preventDefault();
            sendEmailVerification(user).then(
              () => {
                alert("인증메일을 보냈습니다.");
              },
              () => {
                alert("인증메일을 보내지 못했습니다.");
              }
            );
          }}
        >
          이메일 다시 보내기
        </button>
      </div>
    );
  }
  return (
    <form action={updateAction} className="flex flex-col gap-4">
      <Box label="활동명" required>
        <TextInput
          placeholder="활동명 입력"
          required={true}
          name="name"
          defaultValue={artist?.displayName}
        />
      </Box>
      <Box label="포지션" required>
        <fieldset className="flex flex-wrap gap-4">
          <legend hidden>Choose your Positions</legend>
          {Positions.map((element, idx) => (
            <div key={idx}>
              <input
                id={element}
                type="checkbox"
                name={element}
                className="peer hidden"
                defaultChecked={artist?.positions?.includes(element) || false}
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
        </fieldset>
      </Box>
      <Box label="SNS" description="매력을 어필할 SNS 계정을 연결해주세요">
        <TextInput
          name="sns"
          placeholder="인스타그램 프로필 URL 입력"
          defaultValue={artist?.sns}
        />
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
          defaultValue={artist?.description}
        />
      </Box>
      <Box
        label="프로필 이미지"
        description="매력적인 이미지가 있으면 경매 입찰 수가 2배까지 늘어나요"
      >
        {/* 삭제버튼 */}
        {fileUrl && (
          <div
            onClick={removeImage}
            className="relative Center top-80 h-0 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="red"
              className="w-6 h-6 bg-white rounded-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        )}

        <div className="Center text-neutral-600">
          {/* 이미지 업로드 버튼 */}
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
          {/* 이미지 업로드 인풋 */}
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            hidden
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>
      </Box>
      <SubmitButton errorMsg={state.message} />
    </form>
  );
}
