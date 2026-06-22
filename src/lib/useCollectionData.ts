"use client";

import { useEffect, useState } from "react";
import { subscribeCollection } from "./collections";

/**
 * Collection data (fetched from the content API) with a static fallback.
 * Renders the fallback on first paint (no hydration mismatch) and during
 * empty/error, then swaps in fetched data once it arrives.
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
