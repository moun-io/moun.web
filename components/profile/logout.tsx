"use client";
import { auth } from "@/lib/firebase/firebase";
import LogoutImg from "@/public/image/profile/logout.png";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function Logout() {
  const router = useRouter();

  return (
    <li className="h-16 px-4">
      <button
        className="flex justify-between items-center h-full w-full"
        onClick={async (e) => {
          e.preventDefault();
          try {
            await auth.signOut();
            router.replace("/");
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <h2 className="flex items-center text-base font-normal my-auto">
          <Image className="mr-4" src={LogoutImg} alt="" />
          <span>로그아웃</span>
        </h2>
        <div>
          <svg
            className="w-5 h-5 text-black sm:w-6 sm:h-6 dark:text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </div>
      </button>
    </li>
  );
}
