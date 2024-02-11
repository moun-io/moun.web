"use client";
import { useRouter, usePathname } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    pathname.includes("artists/") && (
      <div
        className="fixed h-screen w-screen bg-neutral-800/40 z-50 cursor-pointer"
        onClick={() => router.back()}
      >
        {children}
      </div>
    )
  );
}
