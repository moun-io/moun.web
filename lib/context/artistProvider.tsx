"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { db, auth } from "@/lib/firebase/client";
import { doc, onSnapshot } from "firebase/firestore";
import { useUser } from "./authProvider";

export interface Artist {
  displayName: string;
  position: string[];
  sns: string;
  description: string;
  photoURL?: string | null;
}
const ArtistContext = createContext<{
  artist: Artist | null;
  setArtist: Dispatch<SetStateAction<Artist | null>> | null;
  artistLoading: boolean;
}>({ artist: null, setArtist: null, artistLoading: true });

export default function ArtistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [artistLoading, setArtistLoading] = useState(true);

  useEffect(() => {
    setArtistLoading(true);
    console.log(artistLoading);

    if (!user) {
      setArtist(null);
      setArtistLoading(false);
    } else {
      const unsub = onSnapshot(doc(db, "artists", user.uid), (doc) => {
        console.log(doc.data());
        if (doc.exists()) {
          setArtist(doc.data() as Artist);
          setArtistLoading(false);
          console.log(artistLoading);
        }
      });
      return () => unsub();
    }
  }, [user]);

  return (
    <ArtistContext.Provider value={{ artist, setArtist, artistLoading }}>
      {children}
    </ArtistContext.Provider>
  );
}

export const useArtist = () => {
  const context = useContext(ArtistContext);

  if (context === undefined) {
    throw new Error("artist is null");
  }
  return context;
};
