import React from "react";
import { Song } from "@/lib/utils/types";
export default function SongTrackCard({
  title,
  artist,
  genre,
  image,
  audio,
  length,
  timeleft,
  price_now,
}: Song) {
  return (
    <tr className="flex items-center h-20">
      <td className="p-4">1</td>
      <td>{title}</td>
      <td>{genre}</td>
      <td>{length}</td>
      <td>{timeleft}</td>
    </tr>
  );
}
