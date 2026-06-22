# Setup, Configuration & Deployment

This guide explains how to install the project, configure environment variables,
set up the database, and deploy. The app is a **Next.js 16 (App Router)** server
app: dynamic content lives in **Prisma Postgres** and is served through API
routes under `/api`. It needs a **Node runtime** (it is no longer a static
export hosted on Firebase).

---

## 1. Prerequisites

| Tool    | Version         | Notes                                   |
| ------- | --------------- | --------------------------------------- |
| Node.js | **20.9+** (LTS) | Next.js 16 requires Node 20.9 or newer. |
| npm     | 10+             | Comes with Node.                        |
| Git     | any             | To clone the repo.                      |

A **Prisma Postgres** database (or any PostgreSQL database reachable via a
connection string) is required.

---

## 2. Installation

```bash
git clone git@github.com:linkon63/dev-kon-portfolio.git
cd dev-kon-portfolio
npm install        # also runs `prisma generate` (postinstall)
```

> Uses **npm** (`package-lock.json`). Don't mix package managers.

---

## 3. Environment variables

Copy [`.env.example`](.env.example) → `.env` and fill in values (`.env*` is
git-ignored). See [`docs/creadentials.md`](docs/creadentials.md) for the full
reference. The essentials:

```bash
DATABASE_URL=                 # Prisma Postgres connection string
ADMIN_EMAIL=admin@devkon.com  # admin login (server-side check)
ADMIN_PASSWORD=devkon2026
ADMIN_SESSION_SECRET=change-me-to-a-long-random-string
NEXT_PUBLIC_ADMIN_EMAIL=admin@devkon.com    # login-screen hint only
NEXT_PUBLIC_ADMIN_PASSWORD=devkon2026
```

Unlike the old static build, this is a **server app**, so secrets are kept on the
server and never shipped to the browser. Only `NEXT_PUBLIC_*` vars reach the client.

---

## 4. Database setup (Prisma Postgres)

```bash
# Link an existing Prisma Postgres database (writes DATABASE_URL to .env):
npx prisma postgres link --database <DATABASE_ID>

# Apply migrations and generate the client:
npx prisma migrate dev      # or `npm run db:migrate`

# Seed initial content from src/data (idempotent):
npm run db:seed

# Optional sanity checks:
npm run db:verify           # prints row counts
npm run db:studio           # browse data in a GUI
```

Schema lives in [`prisma/schema.prisma`](prisma/schema.prisma); database config
(URL, migrations path, seed command) is in
[`prisma.config.ts`](prisma.config.ts). The Prisma Client singleton (with the
`@prisma/adapter-pg` driver) is at [`src/lib/prisma.ts`](src/lib/prisma.ts) and
is **server-only** — never import it into a client component.

---

## 5. Local development & build

```bash
npm run dev      # dev server → http://localhost:3000
npm run lint     # ESLint
npm run build    # prisma generate + next build
npm start        # serve the production build
```

The admin panel is at `/admin` (sign in with the `ADMIN_*` credentials).

---

## 6. Deployment

Deploy to any Node-capable host (the app needs a running server — static hosts
like Firebase Hosting / GitHub Pages no longer work).

### Vercel (recommended)

1. Import the GitHub repo at <https://vercel.com/new> (auto-detects Next.js).
2. Add env vars in the project settings: `DATABASE_URL`, `ADMIN_EMAIL`,
   `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` (+ the `NEXT_PUBLIC_*` hints).
3. Add `npx prisma migrate deploy` to the build/release step (or run it once
   against the production DB).

`npm run build` already runs `prisma generate`, and `postinstall` regenerates the
client on fresh installs (the generated client in `/generated` is git-ignored).

### Other Node hosts (Render, Railway, a VPS, Docker)

```bash
npm ci
npx prisma migrate deploy   # apply migrations to the production DB
npm run build
npm start                   # serves on $PORT (default 3000)
```

---

## 7. Notes on the architecture

- **Content API**: `/api/content/:collection` (GET public; POST/PATCH/DELETE
  admin-only) for blogs, projects, testimonials, services.
- **Settings**: `/api/settings` (resume URL/name).
- **Uploads**: `/api/uploads` (POST, admin) stores files in Postgres;
  `/api/uploads/:id` (GET, public) serves them. Replaces Firebase Storage.
- **Analytics**: `/api/analytics` (POST public to log a view; GET admin for the
  dashboard). First-party only — no third-party trackers.
- **Auth**: `/api/admin/login` sets a signed HTTP-only session cookie that gates
  all write routes; `/api/admin/logout` and `/api/admin/session` manage it.

---

## 8. Troubleshooting

| Symptom                                  | Fix                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------ |
| `DATABASE_URL is not set`                | Set it in `.env` (run `prisma postgres link` or paste a connection URL).  |
| Prisma Client type/import errors         | Run `npx prisma generate` (or `npm install`, which does it).              |
| Admin writes return 401                  | Sign in at `/admin`; the session cookie must be present.                  |
| Env var is `undefined` in the browser    | Only `NEXT_PUBLIC_`-prefixed vars reach the client; rebuild after adding. |
| Schema changed but DB didn't             | Run `npm run db:migrate` (dev) or `npx prisma migrate deploy` (prod).     |

---

## Quick reference

```bash
npm install          # setup (+ prisma generate)
npm run db:migrate   # apply migrations
npm run db:seed      # seed content
npm run dev          # develop (localhost:3000)
npm run build        # prisma generate + next build
npm start            # run production server
```
