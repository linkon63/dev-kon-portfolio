"use client";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Upload a file to Firebase Storage under `folder/` and return its public
 * download URL. Used for project images and the resume PDF.
 */
export async function uploadFile(folder: string, file: File): Promise<string> {
  const safe = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const fileRef = ref(storage, `${folder}/${Date.now()}-${safe}`);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
}
