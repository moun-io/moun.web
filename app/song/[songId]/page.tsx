"use client";
import Image, { StaticImageData } from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import WaveForm from "@/components/banner/waveform";
import { Song } from "@/lib/class/song-client";
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
  const [play, setPlay] = useState<string | null>(null);
  const [song, setSong] = useState<Song>();
  const fetchSong = useCallback(async () => {
    console.log("fetchSong");

    const songRef = doc(db, "songs", params.songId);
    const songSnap = await getDoc(songRef);
    if (songSnap.exists()) {
      console.log(songSnap.data());
      setSong(new Song(songSnap.data()));
    }
  }, [params.songId]);

  useEffect(() => {
    fetchSong();
  }, [fetchSong]);

  return (
    <div className="Box">
      <div className="flex flex-col lg:flex-row h-full mt-0 lg:mt-40 mb-40 gap-16 lg:px-4 ">
        <section className="bg-gradient-to-t from-neutral-700 to-white lg:bg-none flex flex-col justify-between items-center lg:items-start gap-4 lg:w-1/2 w-full selection:bg-transparent">
          <div className="flex flex-col items-center lg:block">
            <div className="mt-16 lg:mt-0 text-lg text-neutral-500">
              {song?.uid}
            </div>
            <h1 className=" font-bold text-[2.5rem]">{song?.title}</h1>
          </div>
          <div className="Center gap-4 w-full">
            {play ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-20 h-20 cursor-pointer transition"
                onClick={() => setPlay(null)}
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM9 8.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H9Zm5.25 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-20 h-20 cursor-pointer "
                onClick={() => setPlay(params.songId)}
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                  clipRule="evenodd"
                />
              </svg>
            )}

            {song && (
              <div className="w-full">
                <WaveForm
                  url={song.audioURL}
                  play={play}
                  setPlay={setPlay}
                  songId={params.songId}
                  large
                />
              </div>
            )}
          </div>

          <div className="hidden lg:block"></div>
          {song && (
            <Image
              className="size-80 my-12 lg:m-0 lg:w-full lg:h-auto aspect-square lg:rounded-xl rounded-none"
              src={song?.photoURL}
              height={720}
              width={720}
              priority
              alt="album"
            />
          )}
        </section>

        <section className="w-full lg:w-1/2 flex flex-col gap-8">
          <Box title="현재가">
            {song && (
              <PriceSet
                minValue={song?.currentPrice}
                maxValue={song?.buyPrice}
              ></PriceSet>
            )}
          </Box>
          <Box title="경매 정보">
            <Element src={Time}>{song?.getDateDiff()}일 남음</Element>
            <Element src={Coin}>저작권 양도 O</Element>
            <Element src={Tag}>14건 입찰</Element>
          </Box>
          <Box title="곡 정보">
            <Element src={PlayList}>{song?.length}</Element>
            <Element src={Music}>{song?.getGenres()}</Element>
            <Element src={Heart}>{song?.getVibes()}</Element>
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
