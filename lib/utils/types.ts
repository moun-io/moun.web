import { StaticImageData } from "next/image";

export interface Artist {
  displayName: string;
  positions: string[];
  sns: string;
  description: string;
  uid?: string;
  email: string;
  photoURL?: string;
  verified?: boolean;
}
export interface ArtistForm {
  displayName: string;
  positions: string[];
  sns: string;
  description: string;
  photoURL?: string;
}
export type Position = "Producer" | "Vocal" | "Rapper" | "Engineer" | "AnR";
export type Genre =
  | "Ballad"
  | "Boombap"
  | "EDM"
  | "Indie"
  | "Idol"
  | "POP"
  | "Rock"
  | "Sub Culture"
  | "Trap"
  | "UK Garage"
  | "Others";

export class Song {
  // private songId: string,
  constructor(
    public image: StaticImageData | string,
    public title: string,
    public artist: string,
    public genre: Genre[],
    public length: string,
    public audio: string,
    public currentPrice: number,
    public buyPrice: number,
    public remainingTime: number,
    public index: number = 0
  ) {
    this.artist = artist;
    this.title = title;
    this.genre = genre;
    this.image = image;
    this.audio = audio;
    this.length = length;
    this.remainingTime = remainingTime;
    this.currentPrice = currentPrice;
    this.buyPrice = buyPrice;
    this.index = index;
  }
}
