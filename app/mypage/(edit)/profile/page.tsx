"use client";
import React from "react";
import { onUpdateProfile } from "@/lib/actions/updateProfile";
import SubmitButton from "@/components/mypage/submit-button";
import { Box, TextInput } from "@/components/mypage/form";
import { useFormState } from "react-dom";
import { useUser } from "@/lib/context/authProvider";
import { sendEmailVerification } from "firebase/auth";
import ImageInput from "@/components/mypage/image-input";
import { Positions } from "@/lib/utils/const";
export default function Profile() {
  const { artist, user } = useUser();
  const [state, updateAction] = useFormState(onUpdateProfile, {
    message: "",
  });

  if (user?.emailVerified)
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
          <ImageInput />
        </Box>
        <SubmitButton errorMsg={state.message} />
      </form>
    );
  else if (user?.emailVerified === false) {
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
}
