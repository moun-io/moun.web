import ArtistList from "@/components/banner/ArtistList";
export default function Artists() {
  return (
    <>
      <h1 className="H1">Our Artists</h1>
      <section className="mt-12 flex flex-col w-full gap-4">
        <ArtistList></ArtistList>
      </section>
    </>
  );
}
