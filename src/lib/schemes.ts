import {
  collection, deleteDoc, doc, onSnapshot,
  orderBy, query, setDoc, updateDoc, type Unsubscribe,
} from "firebase/firestore";
import { assertFirebaseConfigured } from "@/lib/firebase";

export type SchemeCategory = "central" | "state" | "local" | "other";

export interface SchemeRecord {
  id: string;
  category: SchemeCategory;
  titleMr: string;
  titleEn: string;
  descMr: string;
  descEn: string;
  eligibilityMr: string;
  eligibilityEn: string;
  benefitsMr: string;
  benefitsEn: string;
  externalUrl: string;
  imageBase64: string;
  status: "active" | "inactive";
  createdAt: number;
}

function colRef() {
  const { db } = assertFirebaseConfigured();
  return collection(db, "schemes");
}

function mapScheme(id: string, d: Partial<SchemeRecord>): SchemeRecord {
  return {
    id,
    category: d.category ?? "local",
    titleMr: d.titleMr ?? "",
    titleEn: d.titleEn ?? d.titleMr ?? "",
    descMr: d.descMr ?? "",
    descEn: d.descEn ?? d.descMr ?? "",
    eligibilityMr: d.eligibilityMr ?? "",
    eligibilityEn: d.eligibilityEn ?? d.eligibilityMr ?? "",
    benefitsMr: d.benefitsMr ?? "",
    benefitsEn: d.benefitsEn ?? d.benefitsMr ?? "",
    externalUrl: d.externalUrl ?? "",
    imageBase64: d.imageBase64 ?? "",
    status: d.status ?? "active",
    createdAt: d.createdAt ?? Date.now(),
  };
}

export function subscribeToSchemes(cb: (items: SchemeRecord[]) => void): Unsubscribe {
  const q = query(colRef(), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => cb(snap.docs.map((d) => mapScheme(d.id, d.data() as Partial<SchemeRecord>))));
}

export function subscribeToActiveSchemes(cb: (items: SchemeRecord[]) => void): Unsubscribe {
  return subscribeToSchemes((items) => cb(items.filter((s) => s.status === "active")));
}

export async function createScheme(input: Omit<SchemeRecord, "id" | "createdAt">): Promise<SchemeRecord> {
  const id = crypto.randomUUID();
  const payload = mapScheme(id, { ...input, createdAt: Date.now() });
  await setDoc(doc(colRef(), id), payload);
  return payload;
}

export async function updateScheme(id: string, updates: Partial<SchemeRecord>) {
  await updateDoc(doc(colRef(), id), updates);
}

export async function deleteScheme(id: string) {
  await deleteDoc(doc(colRef(), id));
}
