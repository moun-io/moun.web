"use client";

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { Artist } from "@/lib/utils/types";

// Define a type for the context's value to make it cleaner
type ArtistContextType = {
  artistsData: Artist[] | null;
  setArtistsData: Dispatch<SetStateAction<Artist[] | null>>;
  artistsLoading: boolean;
  page: QueryDocumentSnapshot | undefined;
  setPage: Dispatch<SetStateAction<QueryDocumentSnapshot | undefined>>;
};

// Initialize context with undefined. This will be handled in the hook.
const ArtistContext = createContext<ArtistContextType | undefined>(undefined);

export function ArtistProvider({ children }: { children: React.ReactNode }) {
  const [artistsData, setArtistsData] = useState<Artist[] | null>(null);
  const [page, setPage] = useState<QueryDocumentSnapshot>();
  const [artistsLoading, setArtistsLoading] = useState(true);

  const value = { artistsData, setArtistsData, artistsLoading, page, setPage };

  return (
    <ArtistContext.Provider value={value}>{children}</ArtistContext.Provider>
  );
}

export const useArtists = (): ArtistContextType => {
  const context = useContext(ArtistContext);
  if (!context) {
    // This ensures that the hook is used within a component wrapped in an ArtistProvider
    throw new Error("useArtists must be used within an ArtistProvider");
  }
  return context;
};
