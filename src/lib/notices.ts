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

export type NoticeStatus = "active" | "inactive";
export type NoticeAttachmentType = "text" | "pdf" | "image" | "file";

export interface NoticeRecord {
  id: string;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  tag: string;
  tagEn: string;
  externalUrl: string;
  // base64 for PDF/image stored in Firestore (no Storage)
  attachmentBase64: string;
  attachmentName: string;
  attachmentType: NoticeAttachmentType;
  status: NoticeStatus;
  createdAt: number;
  updatedAt: number;
}

export interface CreateNoticeInput {
  title: string;
  titleEn?: string;
  content: string;
  contentEn?: string;
  tag?: string;
  tagEn?: string;
  externalUrl?: string;
  file?: File | null;
}

function collectionRef() {
  const { db } = assertFirebaseConfigured();
  return collection(db, "notices");
}

function detectAttachmentType(file?: File | null, externalUrl?: string): NoticeAttachmentType {
  if (file?.type.startsWith("image/")) return "image";
  if (file?.type === "application/pdf") return "pdf";
  if (file) return "file";
  if (externalUrl) return "file";
  return "text";
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function mapNotice(id: string, data: Partial<NoticeRecord & { attachmentUrl?: string; attachmentStoragePath?: string }>): NoticeRecord {
  return {
    id,
    title: data.title ?? "",
    titleEn: data.titleEn ?? data.title ?? "",
    content: data.content ?? "",
    contentEn: data.contentEn ?? data.content ?? "",
    tag: data.tag ?? "सामान्य",
    tagEn: data.tagEn ?? data.tag ?? "General",
    externalUrl: data.externalUrl ?? "",
    // support old records that used attachmentUrl
    attachmentBase64: data.attachmentBase64 ?? (data as Record<string, string>).attachmentUrl ?? "",
    attachmentName: data.attachmentName ?? "",
    attachmentType: data.attachmentType ?? "text",
    status: data.status ?? "active",
    createdAt: data.createdAt ?? Date.now(),
    updatedAt: data.updatedAt ?? Date.now(),
  };
}

export async function createNotice(input: CreateNoticeInput): Promise<NoticeRecord> {
  const id = crypto.randomUUID();
  const now = Date.now();

  let attachmentBase64 = "";
  let attachmentName = "";

  if (input.file) {
    if (input.file.size > 5 * 1024 * 1024) throw new Error("File too large. Max 5 MB.");
    attachmentBase64 = await fileToBase64(input.file);
    attachmentName = input.file.name;
  }

  const payload = mapNotice(id, {
    title: input.title.trim(),
    titleEn: input.titleEn?.trim() || input.title.trim(),
    content: input.content.trim(),
    contentEn: input.contentEn?.trim() || input.content.trim(),
    tag: input.tag?.trim() || "सूचना",
    tagEn: input.tagEn?.trim() || input.tag?.trim() || "Notice",
    externalUrl: input.externalUrl?.trim() || "",
    attachmentBase64,
    attachmentName,
    attachmentType: detectAttachmentType(input.file, input.externalUrl),
    status: "active",
    createdAt: now,
    updatedAt: now,
  });

  await setDoc(doc(collectionRef(), id), payload);
  return payload;
}

export async function updateNotice(id: string, updates: Partial<NoticeRecord>) {
  await updateDoc(doc(collectionRef(), id), { ...updates, updatedAt: Date.now() });
}

export function subscribeToAllNotices(callback: (notices: NoticeRecord[]) => void): Unsubscribe {
  const q = query(collectionRef(), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => mapNotice(d.id, d.data() as Partial<NoticeRecord>)));
  });
}

export function subscribeToActiveNotices(callback: (notices: NoticeRecord[]) => void): Unsubscribe {
  return subscribeToAllNotices((notices) => callback(notices.filter((n) => n.status === "active")));
}

export async function toggleNoticeStatus(id: string, status: NoticeStatus) {
  await updateDoc(doc(collectionRef(), id), { status, updatedAt: Date.now() });
}

export async function deleteNotice(notice: NoticeRecord) {
  await deleteDoc(doc(collectionRef(), notice.id));
}

export function formatNoticeDate(timestamp: number, locale: "mr" | "en") {
  return new Date(timestamp).toLocaleDateString(locale === "mr" ? "mr-IN" : "en-IN", {
    day: "2-digit", month: "long", year: "numeric",
  });
}
