"use server";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "./firebase";
import { position } from "@chakra-ui/react";
import { NextResponse } from "next/server";

interface Artist {
  name: string;
  position: string;
  sns: string;
  description: string;
  file: string;
  userId: string;
}
export async function updateProfile(formData: FormData) {
  const data = {
    name: formData.get("name"),
    position: [
      formData.get("Rapper"),
      formData.get("Vocal"),
      formData.get("Producer"),
      formData.get("Engineer"),
      formData.get("AnR"),
    ].filter((position) => position !== null),

    sns: formData.get("sns"),
    description: formData.get("description"),
    // file: formData.get("file"),
    userId: formData.get("userId"),
  };
  try {
    await addDoc(collection(db, "artists"), data);
    console.log("Document written with ID: ", data);
  } catch (error) {
    console.log(error);
  }
  console.log(data);
}
