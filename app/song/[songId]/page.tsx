"use client";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";

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
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export default function SongDetail({ params }: { params: { songId: string } }) {
  const fetchSong = async () => {
    const songRef = doc(db, "songs", params.songId);
    const songSnap = await getDoc(songRef);
    if (songSnap.exists()) {
      console.log(songSnap.data());
      setSong(songSnap.data() as Song);
    }
  };
  const [song, setSong] = useState<Song | null>(null);
  useEffect(() => {
    fetchSong();
  }, []);

  return (
    song && (
      <>
        <section className="bg-gradient-to-t from-neutral-700 to-white lg:bg-none flex flex-col justify-between items-center lg:items-start gap-4 lg:w-1/2 w-full">
          <div>
            <div className="mt-16 lg:mt-0 text-lg text-neutral-500">
              {song.uid}
            </div>
            <h1 className=" font-bold text-[2.5rem]">{song.title}</h1>
          </div>

          <div className="hidden lg:block">play Button</div>
          <Image
            className="size-80 my-12 lg:m-0 lg:w-full lg:h-auto aspect-square lg:rounded-xl rounded-none"
            src={song.photoURL}
            height={720}
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
            <Element src={Time}>{song.expireDate}일 남음</Element>
            <Element src={Coin}>저작권 양도 O</Element>
            <Element src={Tag}>14건 입찰</Element>
          </Box>
          <Box title="곡 정보">
            <Element src={PlayList}>{song.length}</Element>
            <Element src={Music}>
              {song.genres.map(
                (genre, index) =>
                  `#${genre}${index === song.genres.length - 1 ? "" : " "}`
              )}
            </Element>
            <Element src={Heart}>
              {song.vibes.map(
                (vibe, index) =>
                  `#${vibe}${index === song.vibes.length - 1 ? "" : " "}`
              )}
            </Element>
          </Box>
        </section>
      </>
    )
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
