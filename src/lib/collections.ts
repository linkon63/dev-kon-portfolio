"use client";

import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  setDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

/** Subscribe to a collection ordered newest-first. Returns an unsubscribe fn. */
export function subscribeCollection<T>(
  name: string,
  onData: (items: T[]) => void,
  onError?: (e: Error) => void,
) {
  const q = query(collection(db, name), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) =>
      onData(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T)),
    (err) => onError?.(err),
  );
}

/** One-off read of a collection (newest-first). */
export async function listCollection<T>(name: string): Promise<T[]> {
  const q = query(collection(db, name), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
}

export async function createItem<T extends object>(name: string, data: T) {
  return addDoc(collection(db, name), { ...data, createdAt: Date.now() });
}

export async function updateItem<T extends object>(
  name: string,
  id: string,
  data: Partial<T>,
) {
  return updateDoc(doc(db, name, id), data as Record<string, unknown>);
}

export async function removeItem(name: string, id: string) {
  return deleteDoc(doc(db, name, id));
}

// ---- Site settings (single doc holding things like the current resume URL) ----

const SETTINGS_DOC = doc(db, "settings", "site");

export type SiteSettings = {
  resumeUrl?: string;
  resumeName?: string;
};

export function subscribeSettings(cb: (s: SiteSettings) => void) {
  return onSnapshot(SETTINGS_DOC, (snap) =>
    cb((snap.exists() ? snap.data() : {}) as SiteSettings),
  );
}

export async function getSettings(): Promise<SiteSettings> {
  const snap = await getDoc(SETTINGS_DOC);
  return (snap.exists() ? snap.data() : {}) as SiteSettings;
}

export async function saveSettings(patch: Partial<SiteSettings>) {
  return setDoc(SETTINGS_DOC, patch, { merge: true });
}
