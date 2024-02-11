"use client";
import Image from "next/image";
import { isValidUrl } from "@/lib/utils/isValidUrl";
import { useArtists } from "@/lib/context/artistsProvider";
export default function ArtistModal({ params }: { params: { uid: string } }) {
  const { artistsData } = useArtists();
  const artist = artistsData?.find((artist) => artist.uid === params.uid);

  return (
    artist && (
      <>
        <div className="flex gap-8">
          {isValidUrl(artist.photoURL) ? (
            <Image
              src={artist.photoURL as string}
              alt="profile"
              width={100}
              height={100}
              className="rounded-full object-cover aspect-square"
            ></Image>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className=""
              width={100}
              height={100}
            />
          )}
          <div className="flex flex-col gap-2">
            <h2 className="H2">{artist.displayName}</h2>
            <div className="text-xs text-neutral-400">
              {artist.positions.map((position, index) => {
                if (index == 0) {
                  return <span key={index}>{position}</span>;
                } else {
                  return <span key={index}>, {position}</span>;
                }
              })}
            </div>
            <p className="text-neutral-400 text-sm min-w-72">
              {artist.description || "자기소개가 없습니다."}
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-bold">작품활동</h3>
        </div>
        <div>
          <h3 className="font-bold">SNS</h3>
        </div>
      </>
    )
  );
}
