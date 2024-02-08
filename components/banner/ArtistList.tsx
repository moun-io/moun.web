"use client";

import Image, { StaticImageData } from "next/image";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { useEffect, useState } from "react";
import { isValidUrl } from "@/lib/utils/isValidUrl";
import { Artist } from "@/lib/utils/types";

export default function ArtistList() {
  const [artistData, setArtistData] = useState<Artist[] | null>(null);
  const fetchData = async () => {
    const q = query(
      collection(db, "artists"),
      where("positions", "!=", false),
      limit(30)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data() as Artist);
      setArtistData((prev) => {
        return [
          ...(prev || []),
          {
            ...(doc.data() as Artist),
          },
        ];
      });
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mt-4 gap-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  w-full">
      {artistData &&
        artistData.map((artist, index) => {
          return (
            <ArtistCard
              key={index}
              src={artist.photoURL}
              name={artist.displayName}
              positions={artist.positions}
            />
          );
        })}
    </div>
  );
}

function ArtistCard({
  src,
  name,
  positions,
}: {
  src: string | undefined;
  name: string;
  positions: string[];
}) {
  return (
    <figure className="Center flex-col p-2 gap-2">
      {isValidUrl(src) ? (
        <Image
          src={src as string}
          alt="image"
          className="rounded-full object-cover aspect-square"
          width={200}
          height={200}
        ></Image>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className=""
          width={200}
          height={200}
        >
          <path
            fillRule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            clipRule="evenodd"
          />
        </svg>
      )}

      <figcaption className="Center flex-col gap-2">
        <h3 className="font-medium">{name}</h3>
        <div className="text-neutral-400 text-xs">
          {positions.map((position, index) => {
            if (index == 0) {
              return <span key={index}>{position}</span>;
            } else {
              return <span key={index}>, {position}</span>;
            }
          })}
        </div>
      </figcaption>
    </figure>
  );
}
