"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function ImageInput() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const removeImage = (e: React.MouseEvent) => {
    const ok = confirm("정말로 삭제하시겠습니까?");
    if (ok) {
      if (fileInputRef?.current?.value) {
        setFileUrl(null);
        fileInputRef.current.value = "";
      }
    }
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
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
  return (
    <>
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
          accept="image/png, image/jpeg, image/jpg"
          hidden
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </div>
    </>
  );
}
