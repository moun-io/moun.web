import { Genres, Positions, Vibes } from "./const";
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
    public uid: string,
    public length: string,
    public genres: Genre[],
    public vibes: Vibe[],
    public currentPrice: number,
    public buyPrice: number,
    public expireDate: string
  ) {
    this.uid = uid;
    this.title = title;
    this.genres = genres;
    this.vibes = vibes;
    this.audioURL = audioURL;
    this.photoURL = photoURL;
    this.length = length;
    this.expireDate = expireDate;
    this.currentPrice = currentPrice;
    this.buyPrice = buyPrice;
  }
}
export type Position = (typeof Positions)[number];
export type Genre = (typeof Genres)[number];
export type Vibe = (typeof Vibes)[number];
