import React from "react";
import { Song } from "@/lib/utils/types";
import Image from "next/image";
import Link from "next/link";
import { isValidUrl } from "@/lib/utils/isValidUrl";
export default function SongTrackCard({
  index,
  songId,
  title,
  uid,
  photoURL,
  length,
  genres,
  currentPrice,
  buyPrice,
  expireDate,
}: Song & { index: number; songId: string }) {
  return (
    <ol className="flex items-center my-8">
      <li className="p-4 flex-none">{index + 1}</li>
      <li className="p-4 flex-none">
        <Link href={"/song/" + songId} className="flex items-center gap-4">
          <div>
            {isValidUrl(photoURL) ? (
              <Image
                src={photoURL}
                width={280}
                height={280}
                alt="no image"
                className=" aspect-square rounded-2xl size-24 object-fit"
              ></Image>
            ) : (
              "no image"
            )}
          </div>
          <figcaption className="flex flex-col justify-between py-4">
            <h2 className="font-semibold text-xl">{title}</h2>
            <div className="text-sm text-neutral-400">{uid}</div>
            <div className="mt-4 text-xs text-neutral-400">
              {genres.map((g, i) => (
                <span key={i} className="mr-2">
                  #{g}{" "}
                </span>
              ))}
            </div>
          </figcaption>
        </Link>
      </li>
      <li className="flex-auto hidden md:flex gap-8">
        <div>{length}</div>
        <div>waveform</div>
      </li>
      <li className="flex-auto">
        $ {currentPrice} / $ {buyPrice}
      </li>
      <li className="flex-none hidden sm:block">D-{expireDate}</li>
    </ol>
  );
}
