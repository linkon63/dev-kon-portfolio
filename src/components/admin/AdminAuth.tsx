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
 * Demo static admin login. Credentials come from env (with safe demo defaults)
 * and the session is persisted in localStorage.
 *
 * NOTE: this is a client-only demo gate — it cannot protect Firestore writes on
 * its own. For production, switch to Firebase Auth and lock down security rules.
 */
const ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@devkon.com";
const ADMIN_PASSWORD =
  process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "devkon2026";
const STORAGE_KEY = "dk_admin_session";

type AuthState = {
  ready: boolean;
  authed: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AdminAuthContext = createContext<AuthState | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const hydrate = () => {
      setAuthed(localStorage.getItem(STORAGE_KEY) === "1");
      setReady(true);
    };
    hydrate();
  }, []);

  const login = useCallback((email: string, password: string) => {
    const ok =
      email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
      password === ADMIN_PASSWORD;
    if (ok) {
      localStorage.setItem(STORAGE_KEY, "1");
      setAuthed(true);
    }
    return ok;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
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

export const DEMO_CREDENTIALS = { email: ADMIN_EMAIL, password: ADMIN_PASSWORD };
