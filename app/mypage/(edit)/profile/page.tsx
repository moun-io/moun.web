"use client";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { auth } from "@/lib/firebase/client";
import { onUpdateProfile } from "@/lib/actions/updateProfile";
import { set } from "firebase/database";
import { useFormStatus } from "react-dom";
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
}: {
  placeholder: string;
  name: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <input
      onChange={onChange}
      value={value}
      className="w-full bg-neutral-100 rounded-lg p-4"
      type="text"
      name={name}
      placeholder={placeholder}
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
  // //* fetch Data
  // useEffect(() => {
  //   if (user) setUser(auth.currentUser);
  // }, []);
  // const formData = new FormData();

  // function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   if (user) {
  //     const target = e.target as typeof e.target & {
  //       name: { value: string };
  //       sns: { value: string };
  //       description: { value: string };
  //       file: { files: FileList };
  //       userId: { value: string };
  //       Producer: { checked: boolean };
  //       Vocal: { checked: boolean };
  //       Rapper: { checked: boolean };
  //       Engineer: { checked: boolean };
  //       AnR: { checked: boolean };
  //     };
  //     console.log(target.Vocal.checked);
  //     const name = target.name.value;
  //     const sns = target.sns.value;
  //     const file = target.file.files[0];
  //     const userId = target.userId.value;
  //     let positions: string[] = [];
  //     Positions.map((element) => {
  //       if (target[element].checked) {
  //         positions.push(element);
  //       }
  //     });
  //     updateProfile(user, {
  //       displayName: name,
  //     });
  //   }
  // }

  // function onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
  //   setName(e.target.value);
  // }
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
            htmlFor="file"
            className=" Center flex-col  gap-4 bg-neutral-100 size-80 rounded-full cursor-pointer"
          >
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
            720px 이상의 PNG / JPG 파일을 올려주세요
          </label>
          <input id="file" name="file" type="file" hidden />
        </div>
      </Box>
      {user && <input hidden type="text" name="userId" value={user?.uid} />}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <div className="Center rounded-xl text-neutral-500 bg-neutral-300 p-4">
          Loading...
        </div>
      ) : (
        <button
          type="submit"
          className="rounded-xl text-neutral-500 bg-neutral-300 p-4 hover:bg-purple-500 hover:text-white transition"
        >
          Confirm
        </button>
      )}
    </>
  );
}
