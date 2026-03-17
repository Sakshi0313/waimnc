import {
  collection, deleteDoc, doc, onSnapshot,
  orderBy, query, setDoc, updateDoc, type Unsubscribe,
} from "firebase/firestore";
import { assertFirebaseConfigured } from "@/lib/firebase";

export type GalleryItemType = "photo" | "video";

export interface GalleryRecord {
  id: string;
  type: GalleryItemType;
  titleMr: string;
  titleEn: string;
  date: string;
  imageBase64: string; // for photos; thumbnail for videos
  videoUrl: string;    // YouTube/external URL for videos
  status: "active" | "inactive";
  createdAt: number;
}

function colRef() {
  const { db } = assertFirebaseConfigured();
  return collection(db, "gallery");
}

function mapGallery(id: string, d: Partial<GalleryRecord>): GalleryRecord {
  return {
    id,
    type: d.type ?? "photo",
    titleMr: d.titleMr ?? "",
    titleEn: d.titleEn ?? d.titleMr ?? "",
    date: d.date ?? "",
    imageBase64: d.imageBase64 ?? "",
    videoUrl: d.videoUrl ?? "",
    status: d.status ?? "active",
    createdAt: d.createdAt ?? Date.now(),
  };
}

export function subscribeToGallery(cb: (items: GalleryRecord[]) => void): Unsubscribe {
  const q = query(colRef(), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => cb(snap.docs.map((d) => mapGallery(d.id, d.data() as Partial<GalleryRecord>))));
}

export function subscribeToActiveGallery(cb: (items: GalleryRecord[]) => void): Unsubscribe {
  return subscribeToGallery((items) => cb(items.filter((g) => g.status === "active")));
}

export async function createGalleryItem(input: Omit<GalleryRecord, "id" | "createdAt">): Promise<GalleryRecord> {
  const id = crypto.randomUUID();
  const payload = mapGallery(id, { ...input, createdAt: Date.now() });
  await setDoc(doc(colRef(), id), payload);
  return payload;
}

export async function updateGalleryItem(id: string, updates: Partial<GalleryRecord>) {
  await updateDoc(doc(colRef(), id), updates);
}

export async function deleteGalleryItem(id: string) {
  await deleteDoc(doc(colRef(), id));
}
