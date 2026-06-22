"use client";

import { useEffect, useState } from "react";
import { subscribeCollection } from "./collections";

/**
 * Live Firestore collection data with a static fallback. Renders the fallback
 * on first paint (no hydration mismatch) and during offline/empty/error, then
 * swaps in live data once it arrives.
 */
export function useCollectionData<T>(name: string, fallback: T[]): T[] {
  const [items, setItems] = useState<T[]>(fallback);

  useEffect(() => {
    return subscribeCollection<T>(
      name,
      (data) => {
        if (data.length) setItems(data);
      },
      () => {
        /* keep the fallback on permission/offline errors */
      },
    );
  }, [name]);

  return items;
}
