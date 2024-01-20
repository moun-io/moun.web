"use client";
import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed flex justify-between items-center px-3 w-full bg-neutral-900 h-[4.5rem]">
      <div className="text-white">
        <Link href="/">home</Link>
      </div>
      <div className="text-white flex gap-20">
        <Link href="/songs">songs</Link>
        <Link href="/artists">artists</Link>
        <Link href="released">released</Link>
      </div>
      <div className="text-white">Login</div>
    </header>
  );
}
