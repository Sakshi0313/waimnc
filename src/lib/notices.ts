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
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
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
  attachmentUrl: string;
  attachmentName: string;
  attachmentStoragePath: string;
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
  if (file?.type.startsWith("image/")) {
    return "image";
  }

  if (file?.type === "application/pdf") {
    return "pdf";
  }

  if (file) {
    return "file";
  }

  if (externalUrl) {
    return "file";
  }

  return "text";
}

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
}

function mapNotice(id: string, data: Partial<NoticeRecord>): NoticeRecord {
  return {
    id,
    title: data.title ?? "",
    titleEn: data.titleEn ?? data.title ?? "",
    content: data.content ?? "",
    contentEn: data.contentEn ?? data.content ?? "",
    tag: data.tag ?? "सामान्य",
    tagEn: data.tagEn ?? data.tag ?? "General",
    externalUrl: data.externalUrl ?? "",
    attachmentUrl: data.attachmentUrl ?? "",
    attachmentName: data.attachmentName ?? "",
    attachmentStoragePath: data.attachmentStoragePath ?? "",
    attachmentType: data.attachmentType ?? "text",
    status: data.status ?? "active",
    createdAt: data.createdAt ?? Date.now(),
    updatedAt: data.updatedAt ?? Date.now(),
  };
}

export async function createNotice(input: CreateNoticeInput) {
  const { storage } = assertFirebaseConfigured();
  const id = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const now = Date.now();
  let attachmentUrl = "";
  let attachmentName = "";
  let attachmentStoragePath = "";

  if (input.file) {
    attachmentName = input.file.name;
    attachmentStoragePath = `notices/${id}/${sanitizeFileName(input.file.name)}`;
    const uploadRef = ref(storage, attachmentStoragePath);
    await uploadBytes(uploadRef, input.file);
    attachmentUrl = await getDownloadURL(uploadRef);
  }

  const payload = mapNotice(id, {
    title: input.title.trim(),
    titleEn: input.titleEn?.trim() || input.title.trim(),
    content: input.content.trim(),
    contentEn: input.contentEn?.trim() || input.content.trim(),
    tag: input.tag?.trim() || "सूचना",
    tagEn: input.tagEn?.trim() || input.tag?.trim() || "Notice",
    externalUrl: input.externalUrl?.trim() || "",
    attachmentUrl,
    attachmentName,
    attachmentStoragePath,
    attachmentType: detectAttachmentType(input.file, input.externalUrl),
    status: "active",
    createdAt: now,
    updatedAt: now,
  });

  await setDoc(doc(collectionRef(), id), payload);
  return payload;
}

export function subscribeToAllNotices(callback: (notices: NoticeRecord[]) => void): Unsubscribe {
  const noticesQuery = query(collectionRef(), orderBy("createdAt", "desc"));

  return onSnapshot(noticesQuery, (snapshot) => {
    callback(snapshot.docs.map((noticeDoc) => mapNotice(noticeDoc.id, noticeDoc.data() as Partial<NoticeRecord>)));
  });
}

export function subscribeToActiveNotices(callback: (notices: NoticeRecord[]) => void): Unsubscribe {
  return subscribeToAllNotices((notices) => {
    callback(notices.filter((notice) => notice.status === "active"));
  });
}

export async function toggleNoticeStatus(id: string, status: NoticeStatus) {
  await updateDoc(doc(collectionRef(), id), {
    status,
    updatedAt: Date.now(),
  });
}

export async function deleteNotice(notice: NoticeRecord) {
  const { storage } = assertFirebaseConfigured();

  if (notice.attachmentStoragePath) {
    await deleteObject(ref(storage, notice.attachmentStoragePath));
  }

  await deleteDoc(doc(collectionRef(), notice.id));
}

export function formatNoticeDate(timestamp: number, locale: "mr" | "en") {
  return new Date(timestamp).toLocaleDateString(locale === "mr" ? "mr-IN" : "en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}