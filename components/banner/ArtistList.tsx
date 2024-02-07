import ExampleImage from "@/public/image/example.jpg";
import Image from "next/image";

export default function ArtistList() {
  return (
    <div className="mt-4 gap-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  w-full">
      <ArtistCard
        src={ExampleImage}
        name="김예림"
        positions="보컬, 작사, 작곡"
      ></ArtistCard>
      <ArtistCard
        src={ExampleImage}
        name="김예림"
        positions="보컬, 작사, 작곡"
      ></ArtistCard>{" "}
      <ArtistCard
        src={ExampleImage}
        name="김예림"
        positions="보컬, 작사, 작곡"
      ></ArtistCard>{" "}
      <ArtistCard
        src={ExampleImage}
        name="김예림"
        positions="보컬, 작사, 작곡"
      ></ArtistCard>{" "}
      <ArtistCard
        src={ExampleImage}
        name="김예림"
        positions="보컬, 작사, 작곡"
      ></ArtistCard>{" "}
      <ArtistCard
        src={ExampleImage}
        name="김예림"
        positions="보컬, 작사, 작곡"
      ></ArtistCard>{" "}
      <ArtistCard
        src={ExampleImage}
        name="김예림"
        positions="보컬, 작사, 작곡"
      ></ArtistCard>
      <ArtistCard
        src={ExampleImage}
        name="김예림"
        positions="보컬, 작사, 작곡"
      ></ArtistCard>
      <ArtistCard
        src={ExampleImage}
        name="김예림"
        positions="보컬, 작사, 작곡"
      ></ArtistCard>{" "}
      <ArtistCard
        src={ExampleImage}
        name="김예림"
        positions="보컬, 작사, 작곡"
      ></ArtistCard>{" "}
      <ArtistCard
        src={ExampleImage}
        name="김예림"
        positions="보컬, 작사, 작곡"
      ></ArtistCard>{" "}
      <ArtistCard
        src={ExampleImage}
        name="김예림"
        positions="보컬, 작사, 작곡"
      ></ArtistCard>{" "}
      <ArtistCard
        src={ExampleImage}
        name="김예림"
        positions="보컬, 작사, 작곡"
      ></ArtistCard>{" "}
      <ArtistCard
        src={ExampleImage}
        name="김예림"
        positions="보컬, 작사, 작곡"
      ></ArtistCard>
    </div>
  );
}

function ArtistCard({ src, name, positions }) {
  return (
    <figure className="Center flex-col p-2 gap-2">
      <Image
        src={src}
        alt="image"
        className="rounded-full object-cover aspect-square"
      ></Image>
      <figcaption className="Center flex-col gap-2">
        <h3 className="font-medium">{name}</h3>
        <div className="text-neutral-400 text-xs">{positions}</div>
      </figcaption>
    </figure>
  );
}
