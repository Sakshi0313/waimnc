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

export interface ProjectRecord {
  id: string;
  titleMr: string;
  titleEn: string;
  descMr: string;
  descEn: string;
  progress: number;
  iconName: string;
  status: "active" | "inactive";
  createdAt: number;
  updatedAt: number;
}

export interface CreateProjectInput {
  titleMr: string;
  titleEn?: string;
  descMr?: string;
  descEn?: string;
  progress?: number;
  iconName?: string;
}

function collectionRef() {
  const { db } = assertFirebaseConfigured();
  return collection(db, "projects");
}

function mapProject(id: string, data: Partial<ProjectRecord>): ProjectRecord {
  return {
    id,
    titleMr: data.titleMr ?? "",
    titleEn: data.titleEn ?? data.titleMr ?? "",
    descMr: data.descMr ?? "",
    descEn: data.descEn ?? data.descMr ?? "",
    progress:
      typeof data.progress === "number"
        ? Math.min(100, Math.max(0, data.progress))
        : 0,
    iconName: data.iconName ?? "Building2",
    status: data.status ?? "active",
    createdAt: data.createdAt ?? Date.now(),
    updatedAt: data.updatedAt ?? Date.now(),
  };
}

export async function createProject(input: CreateProjectInput): Promise<ProjectRecord> {
  const id =
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const now = Date.now();
  const payload = mapProject(id, {
    titleMr: input.titleMr.trim(),
    titleEn: input.titleEn?.trim() || input.titleMr.trim(),
    descMr: input.descMr?.trim() || "",
    descEn: input.descEn?.trim() || input.descMr?.trim() || "",
    progress: input.progress ?? 0,
    iconName: input.iconName ?? "Building2",
    status: "active",
    createdAt: now,
    updatedAt: now,
  });
  await setDoc(doc(collectionRef(), id), payload);
  return payload;
}

export async function updateProject(
  id: string,
  updates: Partial<Omit<ProjectRecord, "id" | "createdAt">>
) {
  await updateDoc(doc(collectionRef(), id), { ...updates, updatedAt: Date.now() });
}

export function subscribeToAllProjects(
  callback: (projects: ProjectRecord[]) => void
): Unsubscribe {
  const q = query(collectionRef(), orderBy("createdAt", "asc"));
  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((d) => mapProject(d.id, d.data() as Partial<ProjectRecord>))
    );
  });
}

export function subscribeToActiveProjects(
  callback: (projects: ProjectRecord[]) => void
): Unsubscribe {
  return subscribeToAllProjects((items) =>
    callback(items.filter((p) => p.status === "active"))
  );
}

export async function toggleProjectStatus(id: string, status: "active" | "inactive") {
  await updateDoc(doc(collectionRef(), id), { status, updatedAt: Date.now() });
}

export async function deleteProject(id: string) {
  await deleteDoc(doc(collectionRef(), id));
}
