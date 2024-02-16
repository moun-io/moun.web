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
