import React from "react";
import { Song } from "@/lib/utils/types";
import Image from "next/image";
import Link from "next/link";
import { isValidUrl } from "@/lib/utils/isValid";
export default function SongTrackCard({
  index,
  audioURL,
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
  console.log(audioURL);

  console.log("expireDate", expireDate);

  const endDate = new Date(expireDate);
  const startDate = new Date();
  console.log(startDate);

  const diff = endDate.getTime() - startDate.getTime();
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  console.log(diffDays);

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
        <div>
          <audio controls src={audioURL}></audio>
        </div>
      </li>
      <li className="flex-auto">
        $ {currentPrice} / $ {buyPrice}
      </li>
      <li className="flex-none hidden sm:block">D-{diffDays}</li>
    </ol>
  );
}
