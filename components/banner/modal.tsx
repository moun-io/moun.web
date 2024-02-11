"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  // useEffect(() => {
  //   if (pathname.includes("artists/")) {
  //     document.body.style.overflow = "hidden";
  //   }
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [pathname]);
  return (
    pathname.includes("artists/") && ( //! /login 이 버그때문인지 적용이안됨
      <dialog
        className="Center fixed h-screen w-screen bg-neutral-800/40 z-20 cursor-pointer"
        onClick={() => {
          router.back();
        }}
      >
        {children}
      </dialog>
    )
  );
}
