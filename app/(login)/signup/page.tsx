import SignupForm from "@/components/login/signup-form";
export default function Signup() {
  return (
    <>
      <h1 className="H2 my-10 w-80">Sign Up</h1>
      <div className="w-[min(25rem,85%)] Center flex-col">
        <SignupForm />
      </div>
    </>
  );
}
