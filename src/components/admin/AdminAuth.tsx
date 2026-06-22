"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/**
 * Admin auth backed by a server session cookie. Login/logout hit the
 * /api/admin/* routes, which set an HTTP-only signed cookie that actually gates
 * the write API routes (unlike the previous client-only demo gate).
 *
 * The demo credentials shown on the login screen come from NEXT_PUBLIC_* env
 * vars (display only); the real check happens server-side against ADMIN_EMAIL /
 * ADMIN_PASSWORD.
 */
const DEMO_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@devkon.com";
const DEMO_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "devkon2026";

type AuthState = {
  ready: boolean;
  authed: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AdminAuthContext = createContext<AuthState | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/session")
      .then((r) => r.json())
      .then((d: { authed: boolean }) => {
        if (active) setAuthed(!!d.authed);
      })
      .catch(() => {
        /* treat as logged out */
      })
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const ok = res.ok;
    if (ok) setAuthed(true);
    return ok;
  }, []);

  const logout = useCallback(() => {
    setAuthed(false);
    fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
  }, []);

  return (
    <AdminAuthContext.Provider value={{ ready, authed, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}

export const DEMO_CREDENTIALS = { email: DEMO_EMAIL, password: DEMO_PASSWORD };
