# dev|kon — Portfolio

Personal portfolio of **Md Abdul Ahad Linkon**, converted from Create React App to
**Next.js (App Router)** with **Tailwind CSS v4** and **shadcn/ui**. The original
Bootstrap-based design is reproduced 1:1 in Tailwind.

## Tech stack

| Concern      | Tool                                       |
| ------------ | ------------------------------------------ |
| Framework    | Next.js 16 (App Router, server-rendered)   |
| UI library   | React 19                                   |
| Styling      | Tailwind CSS v4                            |
| Components   | shadcn/ui (radix-nova)                     |
| Icons        | react-icons, lucide-react                  |
| Database     | Prisma ORM 7 + Prisma Postgres             |
| Contact form | @emailjs/browser                           |
| Hosting      | Any Node host (Vercel/Render/VPS)          |

## Scripts

```bash
npm run dev        # start the dev server (http://localhost:3000)
npm run build      # prisma generate + next build
npm run lint       # run ESLint
npm run db:migrate # apply Prisma migrations (dev)
npm run db:seed    # seed portfolio content from src/data
npm run db:studio  # open Prisma Studio
npm run db:verify  # quick DB connectivity check
```

## Routes

| Path          | Page                           |
| ------------- | ------------------------------ |
| `/`, `/home`  | Landing + skills grid          |
| `/about`      | About / bio                    |
| `/projects`   | Featured projects (scrollable) |
| `/allProject` | Full project list              |
| `/resume`     | Embedded resume PDF            |
| `/contact`    | Contact form                   |
| `/blogs`      | Blog (coming soon)             |
| `/dashboard`  | Admin placeholder              |

## Project structure

```
src/
  app/                 # routes (one folder per page)
  components/
    site/              # page sections (SiteLayout, TopNavbar, ProjectCard, …)
    ui/                # shadcn/ui primitives
  data/                # skills + projects data
  lib/                 # utils
public/
  assets/              # images
  files/               # resume PDF
```

## Data & admin

Dynamic content (projects, blogs, services, testimonials, resume, analytics)
lives in **Prisma Postgres** and is served through Next.js API routes under
`/api`. The `/admin` panel manages it behind a server session-cookie login
(`/api/admin/login`); uploaded images and the resume PDF are stored in Postgres
and served from `/api/uploads/:id`. See [`DEPLOYMENT.md`](DEPLOYMENT.md) for
environment variables and setup.

## Deployment

This is a server-rendered Next.js app (it needs a Node runtime for the API
routes and Prisma — it is no longer a static export). Deploy to any Node-capable
host, e.g. Vercel:

```bash
# set DATABASE_URL (+ ADMIN_* secrets) in the host's env, then:
npm run build   # runs `prisma generate` then `next build`
npm start       # or let the platform run the build/start for you
```

Run `npx prisma migrate deploy` against the production database as part of your
release step.
