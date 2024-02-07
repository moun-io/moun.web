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
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { log } from "console";
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
}>({ artist: null, setArtist: null });

export default function ArtistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const [artist, setArtist] = useState<Artist | null>(null);

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(doc(db, "artists", user.uid), (doc) => {
      console.log(doc.data());
      if (doc.exists()) {
        setArtist(doc.data() as Artist);
      }
    });
    return () => unsub();
  }, [user]);

  return (
    <ArtistContext.Provider value={{ artist, setArtist }}>
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
