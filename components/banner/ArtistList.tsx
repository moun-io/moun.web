import ExampleImage from "@/public/image/example.jpg";
import Image, { StaticImageData } from "next/image";

export default function ArtistList() {
  const artistData = [
    {
      src: ExampleImage,
      name: "김예림",
      positions: ["Vocal", "Rapper", "Producer"],
    },
    {
      src: ExampleImage,
      name: "김첨지",
      positions: ["Vocal", "Rapper", "Producer"],
    },

    {
      src: ExampleImage,
      name: "김첨지",
      positions: ["Vocal", "Rapper", "Producer"],
    },
    {
      src: ExampleImage,
      name: "김첨지",
      positions: ["Vocal", "Rapper", "Producer"],
    },
    {
      src: ExampleImage,
      name: "김첨지",
      positions: ["Vocal", "Rapper", "Producer"],
    },
    {
      src: ExampleImage,
      name: "김첨지",
      positions: ["Vocal", "Rapper", "Producer"],
    },
    {
      src: ExampleImage,
      name: "김첨지",
      positions: ["Vocal", "Rapper", "Producer"],
    },
    {
      src: ExampleImage,
      name: "김첨지",
      positions: ["Vocal", "Rapper", "Producer"],
    },
    {
      src: ExampleImage,
      name: "김첨지",
      positions: ["Vocal", "Rapper", "Producer"],
    },
    {
      src: ExampleImage,
      name: "김첨지",
      positions: ["Vocal", "Rapper", "Producer"],
    },
    {
      src: ExampleImage,
      name: "김첨지",
      positions: ["Vocal", "Rapper", "Producer"],
    },
    {
      src: ExampleImage,
      name: "김첨지",
      positions: ["Vocal", "Rapper", "Producer"],
    },

    {
      src: ExampleImage,
      name: "김첨지",
      positions: ["Vocal", "Rapper", "Producer"],
    },
    {
      src: ExampleImage,
      name: "김첨지",
      positions: ["Vocal", "Rapper", "Producer"],
    },
    {
      src: ExampleImage,
      name: "김첨지",
      positions: ["Vocal", "Rapper", "Producer"],
    },
  ];
  return (
    <div className="mt-4 gap-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  w-full">
      {artistData.map((artist, index) => {
        return (
          <ArtistCard
            key={index}
            src={artist.src}
            name={artist.name}
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
  src: StaticImageData;
  name: string;
  positions: string[];
}) {
  return (
    <figure className="Center flex-col p-2 gap-2">
      <Image
        src={src}
        alt="image"
        className="rounded-full object-cover aspect-square"
      ></Image>
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
