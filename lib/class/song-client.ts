import { Length, YYYYMMDD, HHMM, Genre, Vibe } from "../utils/types";

import { db, storage } from "../firebase/server";
import { getDownloadURL } from "firebase-admin/storage";
import { isValidDate, isValidTime } from "../utils/isValid";
import { uploadable } from "./interface";
import { doc } from "firebase/firestore";
import { QueryDocumentSnapshot, DocumentData } from "@firebase/firestore-types";

export class Song {
  title: string;
  audioURL: string;
  photoURL: string;
  description: string;
  songId: string;
  uid: string;
  length: Length;
  genres: Genre[];
  vibes: Vibe[];
  currentPrice: number;
  buyPrice: number;
  expireDate: YYYYMMDD;
  expireTime: HHMM;
  constructor(data: DocumentData) {
    this.title = data.title;
    this.audioURL = data.audioURL;
    this.photoURL = data.photoURL;
    this.description = data.description;
    this.songId = data.songId;
    this.uid = data.uid;
    this.length = data.length;
    this.genres = data.genres;
    this.vibes = data.vibes;
    this.currentPrice = data.currentPrice;
    this.buyPrice = data.buyPrice;
    this.expireDate = data.expireDate;
    this.expireTime = data.expireTime;
  }
  getDateDiff() {
    let endDate = new Date(this.expireDate);
    let startDate = new Date();
    let diff = endDate.getTime() - startDate.getTime();
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays;
  }
  getGenres() {
    return this.genres.map(
      (genre, index) =>
        `#${genre}${index === this.genres.length - 1 ? "" : " "}`
    );
  }
  getVibes() {
    return this.vibes.map(
      (vibe, index) => `#${vibe}${index === this.vibes.length - 1 ? "" : " "}`
    );
  }
}
