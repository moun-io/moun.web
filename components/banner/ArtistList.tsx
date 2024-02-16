"use client";

import {
  collection,
  query,
  where,
  getDocs,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { useEffect, useState } from "react";
import { Artist } from "@/lib/utils/types";
import ArtistCard from "./ArtistCard";
import { useInView } from "react-intersection-observer";
import { useArtists } from "@/lib/context/artistsProvider";
import SortButton from "./sort-button";
import { Position } from "@/lib/utils/types";
import Spinner from "./spinner";

export default function ArtistList() {
  const [selected, setSelected] = useState<Position | null>(null);
  const { ref, inView } = useInView({ threshold: 0 });
  const { artistsData, setArtistsData, setPage, page } = useArtists();
  const [end, setEnd] = useState(false);

  const fetchData = async () => {
    if (end) return;

    const artistsRef = collection(db, "artists");
    const constraints = [
      where("positions", "!=", false),
      limit(10),
      ...(page ? [startAfter(page)] : []),
      ...(selected ? [where("positions", "array-contains", selected)] : []),
    ];
    const Query = query(artistsRef, ...constraints);
    const querySnapshot = await getDocs(Query);
    if (!querySnapshot.empty) {
      const newArtists = querySnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...(doc.data() as Artist),
      }));
      setArtistsData((prev) => [...(prev || []), ...newArtists]);
      setPage(querySnapshot.docs[querySnapshot.docs.length - 1]);
    } else {
      setEnd(true);
    }
  };

  useEffect(() => {
    if (inView && !end) {
      fetchData();
    }
  }, [inView, end]);
  useEffect(() => {
    if (selected) {
      setArtistsData([]);
      setPage(null);
      setEnd(false);
      fetchData();
    }
  }, [selected]);
  return (
    <>
      <SortButton selected={selected} setSelected={setSelected} />
      <div className="mt-4 gap-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  w-full">
        {artistsData?.map((artist, index) => (
          <ArtistCard
            key={index}
            src={artist.photoURL}
            name={artist.displayName}
            positions={artist.positions}
            uid={artist.uid as string}
            description={artist.description}
          />
        ))}
        <Spinner end={end} ref={ref} />
      </div>
    </>
  );
}
