"use client";

import { createContext, useContext, useEffect, useState } from "react";
// import { auth, db } from "@/lib/firebase/client";
// import { User, onAuthStateChanged } from "firebase/auth";
import {User} from '../class/User';
import { Artist } from "@/lib/utils/types";
import { doc, onSnapshot } from "firebase/firestore";


const AuthContext = createContext<{
  user: User | null;
  authLoading: boolean;
  artist: Artist | null;
  artistLoading: boolean;
}>({
  user: null,
  authLoading: true,
  artist: null,
  artistLoading: true,
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [artistLoading, setArtistLoading] = useState(true);


  // const isAuthenticated = async (user: User | null) => {

  //   const token = user?.token;
  //   //? token을 서버로 보내서 유효한지 확인

  //   const res = await fetch("/api/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ token }),
  //     cache: "no-store",
  //   });
  //   if (res.status === 200) return true;
  //   else return false;
  // };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (newuser) => {
  //     setAuthLoading(true);
  //     setArtistLoading(true);
  //     const res = await isAuthenticated(auth.currentUser);
  //     if (newuser && res) {
  //       //? token이 유효하면
  //       setUser(newuser);
  //       setAuthLoading(false);
  //       const unsub = onSnapshot(doc(db, "artists", newuser.uid), (doc) => {
  //         if (doc.exists()) {
  //           setArtist(doc.data() as Artist);
  //           setArtistLoading(false);
  //         }
  //       });
  //       return () => unsub();
  //     } else {
  //       //? token이 유효하지 않으면 or 로그아웃 시
  //       setUser(null);
  //       setArtist(null);
  //       setAuthLoading(false);
  //       setArtistLoading(false);
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);

  return (
    <AuthContext.Provider value={{ user, authLoading, artist, artistLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("user is null");
  }
  return context;
};
