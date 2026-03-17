import {
  collection, deleteDoc, doc, onSnapshot,
  orderBy, query, setDoc, updateDoc, type Unsubscribe,
} from "firebase/firestore";
import { assertFirebaseConfigured } from "@/lib/firebase";

export type SabhaType = "upcoming" | "previous";

export interface SabhaRecord {
  id: string;
  type: SabhaType;
  titleMr: string;
  titleEn: string;
  date: string;
  time: string;
  videoUrl: string;      // live stream or recording URL
  minutesBase64: string; // PDF base64 for minutes download
  minutesName: string;
  status: "active" | "inactive";
  createdAt: number;
}

function colRef() {
  const { db } = assertFirebaseConfigured();
  return collection(db, "sabha");
}

function mapSabha(id: string, d: Partial<SabhaRecord>): SabhaRecord {
  return {
    id,
    type: d.type ?? "upcoming",
    titleMr: d.titleMr ?? "",
    titleEn: d.titleEn ?? d.titleMr ?? "",
    date: d.date ?? "",
    time: d.time ?? "",
    videoUrl: d.videoUrl ?? "",
    minutesBase64: d.minutesBase64 ?? "",
    minutesName: d.minutesName ?? "",
    status: d.status ?? "active",
    createdAt: d.createdAt ?? Date.now(),
  };
}

export function subscribeToSabha(cb: (items: SabhaRecord[]) => void): Unsubscribe {
  const q = query(colRef(), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => cb(snap.docs.map((d) => mapSabha(d.id, d.data() as Partial<SabhaRecord>))));
}

export function subscribeToActiveSabha(cb: (items: SabhaRecord[]) => void): Unsubscribe {
  return subscribeToSabha((items) => cb(items.filter((s) => s.status === "active")));
}

export async function createSabha(input: Omit<SabhaRecord, "id" | "createdAt">): Promise<SabhaRecord> {
  const id = crypto.randomUUID();
  const payload = mapSabha(id, { ...input, createdAt: Date.now() });
  await setDoc(doc(colRef(), id), payload);
  return payload;
}

export async function updateSabha(id: string, updates: Partial<SabhaRecord>) {
  await updateDoc(doc(colRef(), id), updates);
}

export async function deleteSabha(id: string) {
  await deleteDoc(doc(colRef(), id));
}
