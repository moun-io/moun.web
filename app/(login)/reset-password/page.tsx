import ResetPasswordForm from "@/components/login/reset-password-form";
import Link from "next/link";
export default function ResetPassword() {
  return (
    <>
      <h1 className="H1 my-4">Reset Password</h1>
      <ResetPasswordForm></ResetPasswordForm>

      <div className="text-sm text-neutral-400 my-2">
        이미 <strong className="font-medium">계정</strong>이 있으신가요?{" "}
        <Link
          href="/login"
          className="text-purple-400 underline hover:animate-pulse"
        >
          Log in →
        </Link>
      </div>

      <div className="text-sm text-neutral-400 ">
        <strong className="font-medium">Moun</strong>이 처음이신가요?{" "}
        <Link
          href="/signup"
          className="text-purple-400 underline hover:animate-pulse"
        >
          Sign up →
        </Link>
      </div>
    </>
  );
}
