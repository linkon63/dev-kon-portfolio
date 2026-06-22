"use client";

// First-party analytics. Events are posted to /api/analytics (Prisma Postgres)
// and read back for the admin dashboard. Replaces the former Firestore + GA4
// implementation.

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

/** Fire-and-forget: log a page view to the server. */
export async function trackPageView(path: string) {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "pageview",
        path,
        visitor: visitorId(),
        device: detectDevice(),
        browser: detectBrowser(),
        referrer: document.referrer || "direct",
        lang: navigator.language || "unknown",
      }),
      keepalive: true,
    });
  } catch {
    // Never let analytics break the public site.
  }
}

/** Read raw events from the last `days` for the dashboard. Resilient to errors. */
export async function fetchEvents(days = 30): Promise<AnalyticsEvent[]> {
  try {
    const res = await fetch(`/api/analytics?days=${days}`);
    if (!res.ok) return [];
    return (await res.json()) as AnalyticsEvent[];
  } catch {
    return [];
  }
}
