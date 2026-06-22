"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

/** Logs a page view to the site's analytics API on each route. */
export default function Tracker() {
  const pathname = usePathname();
  useEffect(() => {
    trackPageView(pathname || "/");
  }, [pathname]);
  return null;
}
