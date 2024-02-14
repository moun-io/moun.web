import React from "react";
import Image from "next/image";
import Image1 from "@/public/image/home/rectangle-53.jpg";
import Image2 from "@/public/image/home/rectangle-54.jpg";
import Image3 from "@/public/image/home/rectangle-55.jpg";
import Image4 from "@/public/image/home/rectangle-56.jpg";

export default function CardsList({ numOfCards = 4 }) {
  const todaysHit = [
    { img: Image1, title: "title1", composer: "composer1" },
    { img: Image2, title: "title2", composer: "composer2" },
    { img: Image3, title: "title3", composer: "composer3" },
    { img: Image4, title: "title4", composer: "composer4" },
    { img: Image1, title: "title1", composer: "composer1" },
    { img: Image2, title: "title2", composer: "composer2" },
    { img: Image3, title: "title3", composer: "composer3" },
    { img: Image4, title: "title4", composer: "composer4" },
  ];

  return (
    <ul className="flex flex-nowrap justify-between w-[max(100%,700px)] my-4 gap-4">
      {todaysHit.map((element, idx) => {
        if (idx >= numOfCards) return null;
        return (
          <li className="w-[var(--album-width)]" key={idx}>
            {/* <figure className="w-[var(--album-width)]"> */}
            {/* <figure className="flex flex-col gap-4 overflow-hidden">
              {element.img ? (
                <Image
                  className="w-full object-cover rounded-[clamp(0.5rem,calc(0.5rem+(1024px-100vw)*1/4),3.125rem)]"
                  src={element.img}
                  alt="album"
                  width={100}
                />
              ) : (
                <div className="w-full object-cover rounded-[clamp(0.5rem,calc(0.5rem+(1024px-100vw)*1/4),3.125rem)] bg-gray-300">
                  no
                </div>
              )}

              <figcaption className="">
                <h3 className="text-base font-medium">{element.title}</h3>
                <div className="text-xs font-normal text-gray">
                  {element.composer}
                </div>
              </figcaption>
            </figure> */}
            <Image
              src={element.img}
              alt=""
              className="w-80 flex-shrink-0"
            ></Image>
          </li>
        );
      })}
    </ul>
  );
}
