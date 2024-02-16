import Image from "next/image";
import Link from "next/link";

export default function SongCard({
  element,
}: {
  element: { img: any; title: string; composer: string };
}) {
  return (
    <Link href="/">
      <figure className="flex flex-col  gap-4 ">
        {element.img ? (
          <Image
            className="w-full object-cover rounded-[clamp(0.5rem,calc(0.5rem+(1024px-100vw)*1/4),3.125rem)]"
            src={element.img}
            alt="album-image"
            width={100}
          />
        ) : (
          <div className="w-full object-cover rounded-[clamp(0.5rem,calc(0.5rem+(1024px-100vw)*1/4),3.125rem)] bg-gray-300">
            no
          </div>
        )}

        <figcaption>
          <h3 className="text-base font-medium">{element.title}</h3>
          <div className="text-xs font-normal text-neutral-500">
            {element.composer}
          </div>
        </figcaption>
      </figure>
    </Link>
  );
}
