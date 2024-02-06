"use client";

import { createContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase/client";
import { User, onAuthStateChanged } from "firebase/auth";
export const AuthContext = createContext({});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
