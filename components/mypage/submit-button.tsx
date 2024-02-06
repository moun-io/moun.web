"use client";
import React from "react";
import { useFormStatus } from "react-dom";
export default function SubmitButton() {
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
