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
  constructor(
    public title: string,
    public artist: string,
    public genre: Genre,
    public image: string,
    public audio: string,
    public length: string,
    public createdAt: number,
    public timeleft: number,
    public price_now: number
  ) {
    this.artist = artist;
    this.title = title;
    this.genre = genre;
    this.image = image;
    this.audio = audio;
    this.length = length;
    this.createdAt = createdAt;
    this.timeleft = timeleft;
    this.price_now = price_now;
  }
}
