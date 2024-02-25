import { StaticImageData } from "next/image";
import { Genres, Positions } from "./const";
export class Artist {
  constructor(
    public displayName: string,
    public positions: Position[],
    public sns: string,
    public description: string,
    public email: string,
    public photoURL?: string,
    public verified?: boolean,
    public uid?: string
  ) {
    this.displayName = displayName;
    this.positions = positions;
    this.sns = sns;
    this.description = description;
    this.uid = uid;
    this.email = email;
    this.photoURL = photoURL;
  }
}
export interface ArtistForm {
  displayName: string;
  positions: string[];
  sns: string;
  description: string;
  photoURL?: string;
}
export type Position = (typeof Positions)[number];
export type Genre = (typeof Genres)[number];

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
