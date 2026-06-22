// Client-side data layer. These helpers talk to the Next.js API routes under
// /api (backed by Prisma Postgres), replacing the former Firestore SDK calls.
// The function signatures are unchanged so callers don't need to change.

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    const msg = await res
      .json()
      .then((b) => (b as { error?: string }).error)
      .catch(() => null);
    throw new Error(msg || `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

/**
 * Subscribe to a collection. Postgres has no realtime channel, so this fetches
 * once and invokes `onData`; the returned function cancels a pending fetch.
 * Signature matches the previous Firestore implementation.
 */
export function subscribeCollection<T>(
  name: string,
  onData: (items: T[]) => void,
  onError?: (e: Error) => void,
) {
  let active = true;
  fetchJson<T[]>(`/api/content/${name}`)
    .then((items) => {
      if (active) onData(items);
    })
    .catch((e) => {
      if (active) onError?.(e instanceof Error ? e : new Error(String(e)));
    });
  return () => {
    active = false;
  };
}

/** One-off read of a collection (newest-first). */
export async function listCollection<T>(name: string): Promise<T[]> {
  return fetchJson<T[]>(`/api/content/${name}`);
}

export async function createItem<T extends object>(name: string, data: T) {
  return fetchJson(`/api/content/${name}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateItem<T extends object>(
  name: string,
  id: string,
  data: Partial<T>,
) {
  return fetchJson(`/api/content/${name}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function removeItem(name: string, id: string) {
  return fetchJson(`/api/content/${name}/${id}`, { method: "DELETE" });
}

// ---- Site settings (single doc holding things like the current resume URL) ----

export type SiteSettings = {
  resumeUrl?: string;
  resumeName?: string;
};

/**
 * Subscribe to site settings. Fetches once (no realtime). Returns an
 * unsubscribe function, matching the previous Firestore signature.
 */
export function subscribeSettings(cb: (s: SiteSettings) => void) {
  let active = true;
  fetchJson<SiteSettings>("/api/settings")
    .then((s) => {
      if (active) cb(s);
    })
    .catch(() => {
      /* keep defaults on error */
    });
  return () => {
    active = false;
  };
}

export async function getSettings(): Promise<SiteSettings> {
  return fetchJson<SiteSettings>("/api/settings");
}

export async function saveSettings(patch: Partial<SiteSettings>) {
  return fetchJson<SiteSettings>("/api/settings", {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}
