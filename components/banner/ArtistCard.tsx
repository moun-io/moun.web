import { isValidUrl } from "@/lib/utils/isValidUrl";
import Image from "next/image";
import Link from "next/link";
import Profile from "../svg/profile";
export default function ArtistCard({
  src,
  name,
  positions,
  uid,
  description,
}: {
  src: string | undefined;
  name: string;
  positions: string[];
  uid: string;
  description: string;
}) {
  // console.log(uid, "uid");

  return (
    <Link scroll={false} href={`/artists/${uid}`}>
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
          <Profile className="w-100 h-100" />
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
    </Link>
  );
}
