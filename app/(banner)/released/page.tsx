import SongCardsList from "@/components/banner/song-cards-list";
export default function Released() {
  return (
    <>
      <h1 className="H1">Released</h1>
      <section className="flex flex-col gap-8 mt-8">
        <SongCardsList released />
      </section>
    </>
  );
}
