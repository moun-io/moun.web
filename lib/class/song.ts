import { Length, YYYYMMDD, HHMM, Genre, Vibe } from "../utils/types";
import { Genres, Vibes } from "@/lib/utils/const";
import { verifyId } from "@/lib/actions/verify-id";
import ArrayFilter from "@/lib/utils/array-filter";
import { db, storage } from "../firebase/server";
import { getDownloadURL } from "firebase-admin/storage";
import { redirect } from "next/navigation";
import { isValidDate, isValidTime } from "../utils/isValid";
export class SongDoc {
  title: string;
  audioURL: string;
  photoURL: string;
  description: string;
  uid: string;
  length: Length;
  genres: Genre[];
  vibes: Vibe[];
  currentPrice: number;
  buyPrice: number;
  expireDate: YYYYMMDD;
  expireTime: HHMM;

  constructor(formData: FormData) {
    const selectedGenres = ArrayFilter(Genres, formData) as Genre[];
    const selectedVibes = ArrayFilter(Vibes, formData) as Vibe[];
    this.audioURL = "";
    this.photoURL = "";
    this.title = formData.get("title") as string;
    this.description = formData.get("description") as string;
    this.uid = formData.get("userId") as string;
    const length = parseInt(formData.get("length") as string); //! 예외처리 필요
    const lengthMin = Math.floor(length / 60)
      .toString()
      .padStart(2, "0");
    const lengthSec = length % 60;
    this.length = `${lengthMin}:${lengthSec}` as Length;
    this.genres = selectedGenres;
    this.vibes = selectedVibes;
    this.currentPrice = parseInt(formData.get("currentPrice") as string);
    this.buyPrice = parseInt(formData.get("buyPrice") as string);
    this.expireDate = formData.get("expireDate") as YYYYMMDD;
    this.expireTime = formData.get("expireTime") as HHMM;
  }
  getPlainObject() {
    return {
      audioURL: this.audioURL,
      photoURL: this.photoURL,
      title: this.title,
      description: this.description,
      uid: this.uid,
      length: this.length,
      genres: this.genres,
      vibes: this.vibes,
      currentPrice: this.currentPrice,
      buyPrice: this.buyPrice,
      expireDate: this.expireDate,
      expireTime: this.expireTime,
    };
  }
}

export class Song extends SongDoc {
  audio: File;
  photo: File;
  constructor(formData: FormData) {
    super(formData);
    this.audio = formData.get("audio") as File;
    this.photo = formData.get("photo") as File;
  }
  isValidForm() {
    if (!this.title) return { message: "제목을 입력해주세요." };
    if (!this.photo) return { message: "이미지를 업로드해주세요." };
    if (!this.description) return { message: "설명을 입력해주세요." };
    if (!isValidDate(this.expireDate) || !isValidTime(this.expireTime))
      return { message: "날짜를 올바르게 입력해주세요." };

    if (!this.currentPrice || !this.buyPrice)
      return { message: "가격을 입력해주세요." };
    if (this.currentPrice === this.buyPrice)
      return { message: "판매가와 즉시 구매가는 같을 수 없습니다." };
    if (this.currentPrice < 0)
      return { message: "가격은 0원 이상이어야 합니다." };

    if (!this.audio) return { message: "음악 파일을 업로드해주세요." };
    if (this.genres.length === 0 || this.vibes.length === 0)
      return { message: "1가지 이상의 장르와 분위기를 선택해주세요." };
    if (
      !(
        this.audio.size < 10000000 &&
        this.audio.size > 0 && //10MB
        ["audio/mp3", "audio/mpeg"].includes(this.audio.type)
      )
    )
      return {
        message: " 10MB 이하의 MP3/MPEG파일을 올려주세요.",
      };

    if (
      !(
        this.photo.size > 0 &&
        this.photo.size < 10000000 && //10MB
        ["image/png", "image/jpg", "image/jpeg"].includes(this.photo.type)
      )
    )
      return {
        message: "10MB 이하의 PNG/JPG 파일을 올려주세요.",
      };
    return null;
  }
  async getAudioPhotoBuffer() {
    const audioBuffer = await this.audio.arrayBuffer();
    const photoBuffer = await this.photo.arrayBuffer();
    return [audioBuffer, photoBuffer];
  }

  async uploadDocument() {
    const docRef = await db
      .collection("songs")
      .add(this.getPlainObject())
      .then((docRef) => {
        return docRef;
      });
    return docRef;
  }

  async uploadSong(docRef: FirebaseFirestore.DocumentReference) {
    const audioBuffer = await this.audio.arrayBuffer();

    try {
      const audioFileRef = await storage
        .bucket("moun-df9ff.appspot.com")
        .file(`songs/${docRef.id}/song`);
      // console.log("fileRef", audioFileRef);
      await audioFileRef.save(Buffer.from(audioBuffer), {
        contentType: this.audio.type,
        metadata: {
          cacheControl: "public, max-age=31536000",
        },
      });
      const audioURL = await getDownloadURL(audioFileRef);
      await docRef.update({ audioURL });
      return null;
    } catch (error) {
      console.log(error);
      if (docRef) await docRef.delete();
      return {
        message: "음악 업로드에 실패했습니다. 다시 시도해주세요.",
      };
    }
  }
  async uploadPhoto(docRef: FirebaseFirestore.DocumentReference) {
    const photoBuffer = await this.photo.arrayBuffer();
    try {
      const fileRef = await storage
        .bucket("moun-df9ff.appspot.com")
        .file(`songs/${docRef.id}/album`);
      // console.log("fileRef", fileRef);
      await fileRef.save(Buffer.from(photoBuffer), {
        contentType: this.photo.type,
        metadata: {
          cacheControl: "public, max-age=31536000",
        },
      });
      const photoURL = await getDownloadURL(fileRef);
      await docRef.update({ photoURL });
      return null;
    } catch (error) {
      await docRef.delete();
      return {
        message: "이미지 업로드에 실패했습니다. 다시 시도해주세요.",
      };
    }
  }
}
