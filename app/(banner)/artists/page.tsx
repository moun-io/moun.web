import ArtistList from "@/components/banner/ArtistList";
export default function Artists() {
  return (
    <>
      <h1 className="H1">Our Artists</h1>
      <section className="mt-12 flex flex-col w-full gap-4">
        <div className="flex w-full justify-between px-4">
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-gray-200 font-medium rounded-lg hover:bg-gray-300 transition">
              Part
            </div>
            <div className="px-4  py-2 bg-gray-200 font-medium rounded-lg hover:bg-gray-300 transition">
              Team
            </div>
          </div>
          <div className="px-4 py-2 bg-gray-200 font-medium rounded-lg hover:bg-gray-300 transition">
            등록곡 많은 순
          </div>
        </div>
        <ArtistList></ArtistList>
      </section>
    </>
  );
}
