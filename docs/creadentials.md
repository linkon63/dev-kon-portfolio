# Environment variables

Copy [`.env.example`](../.env.example) to `.env` (or `.env.local`) and fill in
the values. `.env*` is git-ignored. This is a server-rendered app, so secrets
(database URL, admin credentials) are **not** exposed to the browser — only
`NEXT_PUBLIC_*` vars are.

```bash
# --- Database (Prisma Postgres) ---
# Set automatically by `prisma postgres link`; or paste your own connection string.
DATABASE_URL=prisma.m.alinkon10@gmail.com-with-github

# --- Admin panel (server-side check; keep secret) ---
ADMIN_EMAIL=admin@devkon.com
ADMIN_PASSWORD=devkon-year
ADMIN_SESSION_SECRET=change-me-to-a-long-random-string

# --- Login screen hint (public, display only) ---
NEXT_PUBLIC_ADMIN_EMAIL=admin@devkon.com
NEXT_PUBLIC_ADMIN_PASSWORD=devkon-year

# --- EmailJS contact form (optional) ---
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

## Notes

- **`DATABASE_URL`** powers Prisma (API routes, migrations, seed). Don't commit it.
- **`ADMIN_*`** are checked server-side by `/api/admin/login`. The defaults match
  the demo; set strong values in production and a long random `ADMIN_SESSION_SECRET`.
- **`NEXT_PUBLIC_ADMIN_*`** only populate the demo-credentials hint on the login
  screen — they don't grant access on their own.
