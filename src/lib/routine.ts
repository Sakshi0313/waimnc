import {
  collection, deleteDoc, doc, onSnapshot,
  orderBy, query, setDoc, updateDoc, type Unsubscribe,
} from "firebase/firestore";
import { assertFirebaseConfigured } from "@/lib/firebase";

export interface RoutineRecord {
  id: string;
  date: string;
  titleMr: string;
  titleEn: string;
  descMr: string;
  descEn: string;
  imageBase64: string;
  status: "active" | "inactive";
  createdAt: number;
}

function colRef() {
  const { db } = assertFirebaseConfigured();
  return collection(db, "routine");
}

function mapRoutine(id: string, d: Partial<RoutineRecord>): RoutineRecord {
  return {
    id,
    date: d.date ?? "",
    titleMr: d.titleMr ?? "",
    titleEn: d.titleEn ?? d.titleMr ?? "",
    descMr: d.descMr ?? "",
    descEn: d.descEn ?? d.descMr ?? "",
    imageBase64: d.imageBase64 ?? "",
    status: d.status ?? "active",
    createdAt: d.createdAt ?? Date.now(),
  };
}

export function subscribeToRoutine(cb: (items: RoutineRecord[]) => void): Unsubscribe {
  const q = query(colRef(), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => cb(snap.docs.map((d) => mapRoutine(d.id, d.data() as Partial<RoutineRecord>))));
}

export function subscribeToActiveRoutine(cb: (items: RoutineRecord[]) => void): Unsubscribe {
  return subscribeToRoutine((items) => cb(items.filter((r) => r.status === "active")));
}

export async function createRoutine(input: Omit<RoutineRecord, "id" | "createdAt">): Promise<RoutineRecord> {
  const id = crypto.randomUUID();
  const payload = mapRoutine(id, { ...input, createdAt: Date.now() });
  await setDoc(doc(colRef(), id), payload);
  return payload;
}

export async function updateRoutine(id: string, updates: Partial<RoutineRecord>) {
  await updateDoc(doc(colRef(), id), updates);
}

export async function deleteRoutine(id: string) {
  await deleteDoc(doc(colRef(), id));
}
