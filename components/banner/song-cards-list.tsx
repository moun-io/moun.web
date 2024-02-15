import React from "react";
import Image from "next/image";
import Image1 from "@/public/image/home/rectangle-53.jpg";
import Image2 from "@/public/image/home/rectangle-54.jpg";
import Image3 from "@/public/image/home/rectangle-55.jpg";
import Image4 from "@/public/image/home/rectangle-56.jpg";
import SongCard from "./song-card";
import { twMerge } from "tailwind-merge";

export default function CardsList({
  released = false,
}: {
  released?: boolean;
}) {
  const todaysHit = [
    { img: Image1, title: "title1", composer: "composer1" },
    { img: Image2, title: "title2", composer: "composer2" },
    { img: Image3, title: "title3", composer: "composer3" },
    { img: Image4, title: "title4", composer: "composer4" },
    { img: Image1, title: "title1", composer: "composer1" },
    { img: Image2, title: "title2", composer: "composer2" },
    { img: Image3, title: "title3", composer: "composer3" },
    { img: Image4, title: "title4", composer: "composer4" },
  ];

  return (
    <ul
      className={twMerge(
        "flex justify-between w-[max(100%,700px)] items-start my-4 gap-4",
        released && "flex-wrap w-full"
      )}
    >
      {todaysHit.map((element, idx) => {
        if (!released && idx > 3) return null;
        return (
          <li className="w-[var(--album-width)]" key={idx}>
            <SongCard element={element} />
          </li>
        );
      })}
    </ul>
  );
}
