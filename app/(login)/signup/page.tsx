import SignupForm from "@/components/login/signup-form";
import Link from "next/link";
export default function Signup() {
  return (
    <>
      <h1 className="H2 my-10 w-80 hidden lg:block">Join Us</h1>
      <div className="w-[min(25rem,85%)] Center flex-col">
        <SignupForm />
        <div className="text-sm text-neutral-400 my-2 ">
          이미 <strong className="font-medium">계정</strong>이 있으신가요?{" "}
          <Link
            href="/login"
            className="text-purple-400 underline hover:animate-pulse"
          >
            Log in→
          </Link>
        </div>

        <div className="text-sm text-neutral-400 ">
          비밀번호를 잊어버리셨나요?{" "}
          <Link
            href="/"
            className="text-purple-400 hover:animate-pulse underline"
          >
            Reset Password →
          </Link>
        </div>
      </div>
    </>
  );
}
