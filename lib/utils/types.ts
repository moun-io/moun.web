import { Genres, Positions, Vibes } from "./const";

export type YYYYMMDD =
  `${string}${string}${string}${string}-${string}${string}-${string}${string}`;
export type HHMM = `${string}${string}:${string}${string}`;
export type Length = `${string}${string}:${string}${string}`;
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
export class Song {
  // private songId: string,
  constructor(
    public audioURL: string,
    public photoURL: string,
    public title: string,
    public description: string,
    public uid: string,
    public length: Length,
    public genres: Genre[],
    public vibes: Vibe[],
    public currentPrice: number,
    public buyPrice: number,
    public expireDate: YYYYMMDD,
    public expireTime: HHMM
  ) {
    this.uid = uid;
    this.title = title;
    this.genres = genres;
    this.vibes = vibes;
    this.description = description;
    this.audioURL = audioURL;
    this.photoURL = photoURL;
    this.length = length;
    this.expireDate = expireDate;
    this.currentPrice = currentPrice;
    this.buyPrice = buyPrice;
    this.expireTime = expireTime;
  }
}
export type Position = (typeof Positions)[number];
export type Genre = (typeof Genres)[number];
export type Vibe = (typeof Vibes)[number];
