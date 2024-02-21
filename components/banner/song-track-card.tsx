import React from "react";
import { Song } from "@/lib/utils/types";
import Image from "next/image";
import Link from "next/link";
export default function SongTrackCard({
  image,
  title,
  artist,
  genre,
  length,
  audio,
  currentPrice,
  buyPrice,
  remainingTime,
  index,
}: Song) {
  return (
    <tr className="flex items-center my-8">
      <td className="p-4  flex-none">{index + 1}</td>
      <td className="p-4  basis-80 shrink">
        <Link href={"/song/d"} className="flex items-center gap-4">
          <div>
            <Image
              src={image}
              width={100}
              height={100}
              alt=""
              className="aspect-square rounded-2xl "
            ></Image>
          </div>
          <figcaption className="flex flex-col justify-between py-4">
            <h2 className="font-semibold text-xl">{title}</h2>
            <div className="text-sm text-neutral-400">{artist}</div>
            <div className="mt-4 text-xs text-neutral-400">
              {genre.map((g, i) => (
                <span key={i} className="mr-2">
                  #{g}{" "}
                </span>
              ))}
            </div>
          </figcaption>
        </Link>
      </td>
      <td className="flex-auto hidden md:flex gap-8">
        <div>{length}</div>
        <div>waveform</div>
      </td>
      <td className="flex-auto">
        $ {currentPrice} / $ {buyPrice}
      </td>
      <td className="flex-none hidden sm:block">D-{remainingTime}</td>
    </tr>
  );
}
