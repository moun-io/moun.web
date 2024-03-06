"use client";
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  startAfter,
} from "firebase/firestore";

import SortButton from "./sort-button";
import { Genres } from "@/lib/utils/const";
import Spinner from "./spinner";
import { useInView } from "react-intersection-observer";
import SongTrackCard from "./song-track-card";
import { Song } from "@/lib/utils/types";

import { db } from "@/lib/firebase/client";

import { useCallback, useEffect, useState } from "react";

export default function SongsList() {
  const [genre, setGenre] = useState<string | null>(null);
  const [end, setEnd] = useState(false);
  const [ref, inView] = useInView({ threshold: 0 });
  const [page, setPage] = useState<any>();
  const [play, setPlay] = useState<string | null>(null);

  const [songs, setSongs] = useState<(Song & { songId: string })[]>([]);

  const fetchSongs = useCallback(async () => {
    if (end) {
      console.log("end");
      return;
    }

    try {
      const songsRef = collection(db, "songs");
      const artistsRef = collection(db, "artists");
      const constraints = [
        where("audioURL", "!=", false),
        limit(5),
        ...(page ? [startAfter(page)] : []),
        // ...(part ? [where("positions", "array-contains", part)] : []),
      ];
      const Query = query(songsRef, ...constraints);
      const querySnapshot = await getDocs(Query);

      if (!querySnapshot.empty) {
        //데이터가 있을때

        const newSongs = querySnapshot.docs.map((doc) => ({
          songId: doc.id,

          ...(doc.data() as Song),
        }));

        setPage(querySnapshot.docs[querySnapshot.docs.length - 1]); //마지막 데이터 저장
        console.log("fetching");

        setSongs((prev) => [...(prev ?? []), ...newSongs]); //데이터 추가
      } else {
        //데이터가 없을때
        setEnd(true);
      }
    } catch (error) {
      alert(error);
    }
  }, [end, page, setSongs, setPage]);

  useEffect(() => {
    if (inView && !end) {
      fetchSongs();
    }
  }, [inView, end, fetchSongs]);

  return (
    <div className="w-full">
      <div className="flex justify-between w-full">
        <SortButton
          selected={genre}
          setSelected={setGenre}
          data={Genres}
          defaultName="Genre"
        />
      </div>
      <div className="flex flex-col mt-4">
        <ol className="flex text-neutral-400 items-center">
          <li className="p-4 flex-none">#</li>
          <li className="p-4 flex-none">곡정보</li>
          <li className="flex-auto hidden md:block">재생시간</li>
          <li className="flex-1">현재가 / 바로구매가</li>
          <li className="hidden sm:block">남은시간</li>
        </ol>

        {songs.map((song, index) => (
          <SongTrackCard
            key={index}
            index={index}
            {...song}
            play={play}
            setPlay={setPlay}
          />
        ))}
        <Spinner end={end} ref={ref} />
      </div>
    </div>
  );
}
