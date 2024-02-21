import Image, { StaticImageData } from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";
import Album from "@/public/image/home/rectangle-54.jpg";
import { Song } from "@/lib/utils/types";
import Tag from "@/public/image/song/tag.png";
import Coin from "@/public/image/song/coin.png";
import Time from "@/public/image/song/time.png";
import Music from "@/public/image/song/music.png";
import Heart from "@/public/image/song/heart.png";
import PlayList from "@/public/image/song/playlist.png";

import Box from "@/components/song/box";
import PriceSet from "@/components/song/price-set";

export default function SongDetail({ params }: { params: { songId: string } }) {
  let Song1 = new Song(
    Album,
    "21",
    "Dean",
    ["Trap", "Ballad"],
    "3:32",
    "audio",
    40,
    2000,
    2
  );
  return (
    <div className="Box">
      <div className="flex flex-col lg:flex-row h-full mt-0 lg:mt-40 mb-40 gap-16 lg:px-4">
        <section className="bg-gradient-to-t from-neutral-700 to-white lg:bg-none flex flex-col justify-between items-center lg:items-start gap-4 lg:w-1/2 w-full">
          <div>
            <div className="mt-16 lg:mt-0 text-lg text-neutral-500">
              {Song1.artist}
            </div>
            <h1 className=" font-bold text-[2.5rem]">{Song1.title}</h1>
          </div>

          <div className="hidden lg:block">play Button</div>
          <Image
            className="size-80 my-12 lg:m-0 lg:w-full lg:h-auto aspect-square lg:rounded-xl rounded-none"
            src={Album}
            width={720}
            priority
            alt="album"
          />
        </section>

        <section className="w-full lg:w-1/2 flex flex-col gap-8">
          <Box title="현재가">
            <PriceSet></PriceSet>
          </Box>
          <Box title="경매 정보">
            <Element src={Time}>{Song1.remainingTime}일 남음</Element>
            <Element src={Coin}>저작권 양도 O</Element>
            <Element src={Tag}>14건 입찰</Element>
          </Box>
          <Box title="곡 정보">
            <Element src={PlayList}>{Song1.length}</Element>
            <Element src={Music}>{Song1.genre}</Element>
            <Element src={Heart}>분위기</Element>
          </Box>
        </section>
      </div>
    </div>
  );
}

function Element({
  children,
  src,
}: {
  children: React.ReactNode;
  src: StaticImageData;
}) {
  return (
    <div className="flex gap-4">
      <Image src={src} width={24} alt="icon"></Image>
      <div>{children}</div>
    </div>
  );
}
