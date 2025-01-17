"use client";
import React from "react";
import { onUpdateProfile } from "@/lib/actions/updateProfile";
import SubmitButton from "@/components/mypage/form/submit-button";
import {
  Box,
  TextInput,
  SelectInput,
  UserInput,
} from "@/components/mypage/form/form";
import { useFormState } from "react-dom";
import { useUser } from "@/lib/context/authProvider";
import { sendEmailVerification } from "firebase/auth";
import ImageInput from "@/components/mypage/form/image-input";
import { Positions } from "@/lib/utils/const";

export default function Profile() {
  const { artist, user } = useUser();
  const [state, updateAction] = useFormState(onUpdateProfile, {
    message: "",
  });

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
          <SelectInput
            array={Positions}
            defaultChecked={artist?.positions}
            legend="Choose your Positions"
          />
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
        <UserInput user={user} />
        <SubmitButton errorMsg={state.message} />
      </form>
    );
}
