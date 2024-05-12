import React from "react";
import { Song } from "@/lib/class/song-client";
import Image from "next/image";
import Link from "next/link";
import { isValidUrl } from "@/lib/utils/isValid";

import WaveForm from "@/components/banner/waveform";
import { twMerge } from "tailwind-merge";
export default function SongTrackCard({
  index,
  song,
  play,
  setPlay,
}: {
  song: Song;
  index: number;
  play: string | null;
  setPlay: any;
}) {
  const onPlay = () => {
    console.log(play);
    if (play === song.songId) {
      setPlay(null);
      console.log(null);
      return;
    } else {
      setPlay(song.songId);
    }
  };
  return (
    <ol className="flex items-center my-8 hover:bg-gray-100">
      <li className="p-4 flex-none">{index + 1}</li>
      <li className="p-4 flex-none flex items-center gap-4">
        {isValidUrl(song.photoURL) ? (
          <div className="Center group" onClick={onPlay}>
            <Image
              src={song.photoURL}
              width={280}
              height={280}
              alt="no image"
              className=" aspect-square rounded-2xl size-24 object-fit cursor-pointer"
            />
            <div className="absolute cursor-pointer">
              {play === song.songId ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#B8EE1E"
                  className="size-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#B8EE1E"
                  className="size-8 group-hover:block hidden transition"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
        ) : (
          "no image"
        )}
        <Link href={"/song/" + song.songId} className="">
          <figcaption className="flex flex-col justify-between py-4">
            <h2 className="font-semibold text-xl">{song.title}</h2>
            <div className="text-sm text-neutral-400">{song.uid}</div>
            <div className="mt-4 text-xs text-neutral-400">
              {song.genres.map((g, i) => (
                <span key={i} className="mr-2">
                  #{g}{" "}
                </span>
              ))}
            </div>
          </figcaption>
        </Link>
      </li>
      <li className="flex-auto hidden md:flex gap-8 items-center mx-8">
        <div>{length}</div>
        <div className="w-full">
          {song.audioURL && (
            <WaveForm
              url={song.audioURL}
              play={play}
              songId={song.songId}
              setPlay={setPlay}
            ></WaveForm>
          )}
        </div>
      </li>
      <li className="flex-auto">
        $ {song.currentPrice} / $ {song.buyPrice}
      </li>
      <li className="flex-none hidden sm:block">D-{song.getDateDiff()}</li>
    </ol>
  );
}
