"use client";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";
import { app, db } from "./firebase";
import { COLLECTIONS } from "./types";

const VISITOR_KEY = "dk_visitor_id";

export type AnalyticsEvent = {
  type: string;
  path: string;
  ts: number;
  visitor: string;
  device: string;
  browser: string;
  referrer: string;
  lang: string;
};

function visitorId(): string {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

function detectDevice(): string {
  const ua = navigator.userAgent;
  if (/iPad|Tablet/i.test(ua)) return "Tablet";
  if (/Mobi|Android|iPhone/i.test(ua)) return "Mobile";
  return "Desktop";
}

function detectBrowser(): string {
  const ua = navigator.userAgent;
  if (/Edg\//.test(ua)) return "Edge";
  if (/OPR\//.test(ua)) return "Opera";
  if (/Chrome\//.test(ua)) return "Chrome";
  if (/Safari\//.test(ua)) return "Safari";
  if (/Firefox\//.test(ua)) return "Firefox";
  return "Other";
}

/** Fire-and-forget: log a page view to Firestore AND to Firebase Analytics (gtag/GA4). */
export async function trackPageView(path: string) {
  // First-party Firestore event (powers the in-app dashboard).
  try {
    await addDoc(collection(db, COLLECTIONS.analytics), {
      type: "pageview",
      path,
      ts: Date.now(),
      visitor: visitorId(),
      device: detectDevice(),
      browser: detectBrowser(),
      referrer: document.referrer || "direct",
      lang: navigator.language || "unknown",
    } satisfies AnalyticsEvent);
  } catch {
    // Offline / rules — ignore so the public site never breaks on analytics.
  }

  // Firebase Analytics (GA4) — only where supported.
  try {
    if (await isSupported()) {
      logEvent(getAnalytics(app), "page_view", { page_path: path });
    }
  } catch {
    // measurementId not set or unsupported — fine.
  }
}

/** Read raw events from the last `days` for the dashboard. Resilient to errors. */
export async function fetchEvents(days = 30): Promise<AnalyticsEvent[]> {
  try {
    const since = Date.now() - days * 86_400_000;
    const q = query(
      collection(db, COLLECTIONS.analytics),
      where("ts", ">=", since),
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data() as AnalyticsEvent);
  } catch {
    // Permission/offline — return nothing rather than hanging the dashboard.
    return [];
  }
}
