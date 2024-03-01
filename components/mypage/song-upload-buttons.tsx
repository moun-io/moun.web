import React from "react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
export default function Buttons({
  step,
  setStep,
  state,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  state?: { message: string };
}) {
  const router = useRouter();
  const { pending } = useFormStatus();
  const nextStep: React.MouseEventHandler = (e) => {
    e.preventDefault();
    setStep((step) => (step < 3 ? step + 1 : 3));
  };
  const prevStep: React.MouseEventHandler = (e) => {
    e.preventDefault();
    setStep((step) => (step > 1 ? step - 1 : 1));
  };
  const onSubmit: React.MouseEventHandler = (e) => {
    confirm("작성을 완료하시겠습니까?") || e.preventDefault();
  };
  const onCancel: React.MouseEventHandler = (e) => {
    e.preventDefault();
    confirm("작성을 취소하시겠습니까?") && router.back();
  };
  return (
    <div className="flex gap-2 p-8">
      <button
        className="text-center p-4 flex-1 bg-neutral-200 rounded-xl"
        onClick={step === 1 ? onCancel : prevStep}
      >
        {step === 1 ? "Cancel" : "Back"}
      </button>
      {pending ? (
        <button
          className="text-center p-4 flex-1 bg-fuchsia-500 text-white rounded-xl"
          onClick={step < 3 ? nextStep : onSubmit}
        >
          {step === 3 ? "Confirm" : "Next"}
        </button>
      ) : (
        <div
          onClick={(e) => e.preventDefault()}
          className="Center rounded-xl text-neutral-500 bg-neutral-300 p-4"
        >
          Loading...
        </div>
      )}

      {state?.message}
    </div>
  );
}
