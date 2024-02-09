"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "@/lib/firebase/client";
import { User, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext<{
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>> | null;
}>({ user: null, setUser: null });

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(auth.currentUser);

  const checkToken = async (user: User | null) => {
    console.log("checkToken");
    const token = await user?.getIdToken();
    console.log(token);
    //? token을 서버로 보내서 유효한지 확인
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
      cache: "no-store",
    });
    if (res.status === 200) return true;
    else return false;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (newuser) => {
      // console.log("onAuthStateChanged", newuser);
      const res = await checkToken(auth.currentUser);
      if (newuser) {
        //? token이 유효하면
        // newuser.reload().then(() => {
        // console.log("reload", newuser.displayName);
        setUser(newuser);
        // });
      } else {
        //? token이 유효하지 않으면 or 로그아웃 시
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
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
