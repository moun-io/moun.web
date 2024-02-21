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
import { Play } from "next/font/google";
export default function SongDetail({
  params,
  SongParam,
}: {
  params: { songId: string };
  SongParam: Song;
}) {
  let Song1 = new Song(
    Album,
    "21",
    "Dean",
    ["Trap", "Ballad"],
    "3:32",
    "audio",
    40,
    2000,
    0
  );
  return (
    <div className="Box">
      <div className="flex flex-col lg:flex-row h-full mt-0 lg:mt-32 mb-32 gap-12">
        <section className="bg-gradient-to-t from-neutral-700 to-white lg:bg-none flex flex-col justify-between items-center lg:items-start gap-4 lg:w-1/2 w-full">
          <div className="mt-16 lg:mt-0 text-lg text-neutral-500">
            {Song1.artist}
          </div>
          <h1 className=" font-bold text-[2.5rem]">{Song1.title}</h1>
          <div className="hidden lg:block h-36">play Button</div>
          <Image
            className="size-80 my-12 lg:my-0 lg:size-full object-cover aspect-square lg:rounded-xl rounded-none"
            src={Album}
            width={500}
            priority
            alt="album"
          />
        </section>

        <section className="w-full lg:w-1/2 flex flex-col gap-8">
          <Box title="현재가">
            <h3 className="text-[2.5rem] font-bold">$ {Song1.currentPrice}</h3>
            <div>
              <div></div>
              <div className="flex justify-between">
                <div>
                  <div>20$</div>
                  <div>시작가</div>
                </div>
                <div>
                  <div>2000$</div>
                  <div>바로구매가</div>
                </div>
              </div>
            </div>
            <div className="flex w-full gap-4">
              <button className="bg-green-400 rounded-xl p-4 w-full">
                바로구매
              </button>
              <button className="bg-neutral-200 rounded-xl p-4 w-full">
                가격제안
              </button>
            </div>
          </Box>
          <Box title="경매 정보">
            <Element src={Time}>{Song1.remainingTime}</Element>
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

function Box({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className=" border-solid border rounded-xl w-full p-8 flex flex-col gap-4">
      <h2 className="text-neutral-500 font-bold">{title}</h2>
      {children}
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
