import ResetPasswordForm from "@/components/login/reset-password-form";
import { LoginLink, SignUpLink } from "@/components/login/links";
export default function ResetPassword() {
  return (
    <>
      <h1 className="H1 my-4">Reset Password</h1>
      <ResetPasswordForm></ResetPasswordForm>
      <LoginLink />
      <SignUpLink />
    </>
  );
}
