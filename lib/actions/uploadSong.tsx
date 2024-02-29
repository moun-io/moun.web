"use server";
import { Song, Genre, Vibe } from "@/lib/utils/types";
import { Genres, Vibes } from "@/lib/utils/const";
export default async function uploadSong(formData: FormData) {
  console.log("upload song");
  const formGenres: Genre[] = [];
  const formVibes: Vibe[] = [];
  for (const genre of Genres) {
    if (formData.get(genre)) {
      formGenres.push(genre);
    }
  }
  for (const vibe of Vibes) {
    if (formData.get(vibe)) {
      formVibes.push(vibe);
    }
  }

  const song = new Song(
    formData.get("photo") as File,
    formData.get("title") as string,
    formData.get("artist") as string,
    formGenres,
    formVibes,
    formData.get("length") as string,
    formData.get("audio") as File,
    parseInt(formData.get("currentPrice") as string),
    parseInt(formData.get("buyPrice") as string),
    formData.get("expireDate") as string
  );
  console.log(song);
}
