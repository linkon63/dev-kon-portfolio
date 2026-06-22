import crypto from "node:crypto";

// Server-only admin auth. Credentials and the signing secret are read from
// (non-public) env vars with safe demo defaults so the panel works out of the
// box. Set real values in production via the environment.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@devkon.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "devkon2026";
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || "dev-only-insecure-session-secret";

export const SESSION_COOKIE = "dk_admin_session";
// 7 days, in seconds.
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

/** Constant-time check of submitted admin credentials. */
export function checkCredentials(email: string, password: string): boolean {
  const emailOk = safeEqual(
    email.trim().toLowerCase(),
    ADMIN_EMAIL.toLowerCase(),
  );
  const passOk = safeEqual(password, ADMIN_PASSWORD);
  return emailOk && passOk;
}

/** Create a signed session token: base64url(payload).hmac. */
export function createSessionToken(): string {
  const payload = base64url(
    JSON.stringify({ v: 1, iat: Math.floor(Date.now() / 1000) }),
  );
  return `${payload}.${sign(payload)}`;
}

/** Verify a session token's signature (and that it is well-formed). */
export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  return safeEqual(signature, sign(payload));
}

function sign(value: string): string {
  return crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(value)
    .digest("base64url");
}

function base64url(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}
