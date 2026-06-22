"use client";

import { useEffect, useState } from "react";
import { subscribeSettings } from "./collections";

const DEFAULT_RESUME = "/files/Resume-V12.pdf";

/** The current resume URL (admin-uploaded), falling back to the bundled PDF. */
export function useResumeUrl(): string {
  const [url, setUrl] = useState(DEFAULT_RESUME);
  useEffect(
    () => subscribeSettings((s) => setUrl(s.resumeUrl || DEFAULT_RESUME)),
    [],
  );
  return url;
}
