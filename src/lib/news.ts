import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  type Unsubscribe,
} from "firebase/firestore";
import { assertFirebaseConfigured } from "@/lib/firebase";

export interface NewsRecord {
  id: string;
  title: string;
  titleEn: string;
  date: string;
  dateEn: string;
  tag: string;
  tagEn: string;
  externalUrl: string;
  status: "active" | "inactive";
  createdAt: number;
  updatedAt: number;
}

export interface CreateNewsInput {
  title: string;
  titleEn?: string;
  date?: string;
  dateEn?: string;
  tag?: string;
  tagEn?: string;
  externalUrl?: string;
}

function collectionRef() {
  const { db } = assertFirebaseConfigured();
  return collection(db, "news");
}

function mapNews(id: string, data: Partial<NewsRecord>): NewsRecord {
  return {
    id,
    title: data.title ?? "",
    titleEn: data.titleEn ?? data.title ?? "",
    date: data.date ?? "",
    dateEn: data.dateEn ?? data.date ?? "",
    tag: data.tag ?? "बातमी",
    tagEn: data.tagEn ?? data.tag ?? "News",
    externalUrl: data.externalUrl ?? "",
    status: data.status ?? "active",
    createdAt: data.createdAt ?? Date.now(),
    updatedAt: data.updatedAt ?? Date.now(),
  };
}

export async function createNews(input: CreateNewsInput): Promise<NewsRecord> {
  const id =
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const now = Date.now();
  const payload = mapNews(id, {
    title: input.title.trim(),
    titleEn: input.titleEn?.trim() || input.title.trim(),
    date: input.date?.trim() || "",
    dateEn: input.dateEn?.trim() || input.date?.trim() || "",
    tag: input.tag?.trim() || "बातमी",
    tagEn: input.tagEn?.trim() || input.tag?.trim() || "News",
    externalUrl: input.externalUrl?.trim() || "",
    status: "active",
    createdAt: now,
    updatedAt: now,
  });
  await setDoc(doc(collectionRef(), id), payload);
  return payload;
}

export function subscribeToAllNews(callback: (news: NewsRecord[]) => void): Unsubscribe {
  const q = query(collectionRef(), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => mapNews(d.id, d.data() as Partial<NewsRecord>)));
  });
}

export function subscribeToActiveNews(callback: (news: NewsRecord[]) => void): Unsubscribe {
  return subscribeToAllNews((items) => callback(items.filter((n) => n.status === "active")));
}

export async function toggleNewsStatus(id: string, status: "active" | "inactive") {
  await updateDoc(doc(collectionRef(), id), { status, updatedAt: Date.now() });
}

export async function updateNews(id: string, updates: Partial<Omit<NewsRecord, "id" | "createdAt">>) {
  await updateDoc(doc(collectionRef(), id), { ...updates, updatedAt: Date.now() });
}

export async function deleteNews(id: string) {
  await deleteDoc(doc(collectionRef(), id));
}
