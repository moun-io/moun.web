"use client";
import { useState } from "react";
import SortButton from "./sort-button";
import { Genre } from "@/lib/utils/const";
import Spinner from "./spinner";
import { useInView } from "react-intersection-observer";
import SongTrackCard from "./song-track-card";
import { Song } from "@/lib/utils/types";

export default function SongsList() {
  const [genre, setGenre] = useState<string | null>(null);
  const [end, setEnd] = useState(false);
  const [ref, inView] = useInView({ threshold: 0 });
  const Songs: Song[] = [
    new Song("title", "artist", "POP", "image", "audio", "uid", 0, 0, 0),
    new Song("title", "artist", "POP", "image", "audio", "uid", 0, 0, 0),
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between w-full">
        <SortButton
          selected={genre}
          setSelected={setGenre}
          data={Genre}
          defaultName="Genre"
        />
      </div>
      <table className="flex flex-col mt-4">
        <tr className="flex text-neutral-500 font-medium items-center">
          <th className="p-4 flex-none">#</th>
          <th className="p-4 flex-none">곡정보</th>
          <th className="flex-auto">재생시간</th>
          <th className="flex-1">현재가 / 바로구매가</th>
          <th>남은시간</th>
        </tr>

        {/* {Songs.map((song, index) => (
          <SongTrackCard
            key={index}
            title={song.title}
            artist={song.artist}
            genre={song.genre}
            image={song.image}
            audio={song.audio}
            length={song.length}
            timeleft={song.timeleft}
            price_now={song.price_now}
          />
        ))} */}
        <Spinner end={end} ref={ref} />
      </table>
    </div>
  );
}

// "use client";

// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   limit,
//   startAfter,
// } from "firebase/firestore";
// import { db } from "@/lib/firebase/client";
// import { useCallback, useEffect, useState } from "react";
// import { Artist } from "@/lib/utils/types";
// import ArtistCard from "./ArtistCard";
// import { useInView } from "react-intersection-observer";
// import { useArtists } from "@/lib/context/artistsProvider";
// import SortButton from "./sort-button";
// import Spinner from "./spinner";
// import SortButtonsList from "./sort-buttons-list";
// import { Positions } from "@/lib/utils/const";
// import { Position } from "@/lib/utils/types";
// export default function ArtistBoard() {
//   const [part, setPart] = useState<string | null>(null);
//   const [team, setTeam] = useState<string | null>(null);
//   const [orderBy, setOrderBy] = useState<string | null>(null);
//   const { ref, inView } = useInView({ threshold: 0 });
//   const { artistsData, setArtistsData, setPage, page } = useArtists();
//   const [end, setEnd] = useState(false);

//   //아티스트 데이터 가져오기
//   const fetchArtists = useCallback(async () => {
//     if (end) {
//       console.log("end");
//       return;
//     }

//     try {
//       const artistsRef = collection(db, "artists");
//       const constraints = [
//         where("positions", "!=", false),
//         limit(5),
//         ...(page ? [startAfter(page)] : []),
//         ...(part ? [where("positions", "array-contains", part)] : []),
//       ];
//       const Query = query(artistsRef, ...constraints);
//       const querySnapshot = await getDocs(Query);

//       if (!querySnapshot.empty) {
//         //데이터가 있을때
//         const newArtists = querySnapshot.docs.map((doc) => ({
//           uid: doc.id,
//           ...(doc.data() as Artist),
//         }));
//         setPage(querySnapshot.docs[querySnapshot.docs.length - 1]); //마지막 데이터 저장
//         console.log("fetching");

//         setArtistsData((prev) => [...(prev ?? []), ...newArtists]); //데이터 추가
//       } else {
//         //데이터가 없을때
//         setEnd(true);
//       }
//     } catch (error) {
//       alert(error);
//     }
//   }, [end, page, part, setArtistsData, setPage]);

//   //무한 스크롤
//   useEffect(() => {
//     if (inView && !end) {
//       fetchArtists();
//     }
//   }, [inView, end, fetchArtists]);
//   // 포지션 선택시
//   useEffect(() => {
//     if (part) {
//       setArtistsData([]);
//       setPage(null);
//       setEnd(false); //데이터초기화 및 무한스크롤 초기화
//     }
//   }, [part, setPage, setArtistsData]);
//   return (
//     <>
//       <SortButtonsList>
//         <div className="flex gap-4">
//           <SortButton
//             selected={part}
//             setSelected={setPart}
//             data={Positions}
//             defaultName="Part"
//           />
//           {/* <SortButton
//             selected={team}
//             setSelected={setTeam}
//             data={Positions}
//             defaultName="Team"
//           /> */}
//         </div>
//         <div>
//           {/* <SortButton
//             selected={orderBy}
//             setSelected={setOrderBy}
//             data={Positions}
//             defaultName="등록곡 많은 순"
//           /> */}
//         </div>
//       </SortButtonsList>

//       <div className="mt-4 gap-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  w-full">
//         {artistsData?.map((artist, index) => (
//           <ArtistCard
//             key={index}
//             src={artist.photoURL}
//             name={artist.displayName}
//             positions={artist.positions}
//             uid={artist.uid as string}
//             description={artist.description}
//           />
//         ))}
//         <Spinner end={end} ref={ref} />
//       </div>
//     </>
//   );
// }
