# dev|kon — Portfolio

Personal portfolio of **Md Abdul Ahad Linkon**, converted from Create React App to
**Next.js (App Router)** with **Tailwind CSS v4** and **shadcn/ui**. The original
Bootstrap-based design is reproduced 1:1 in Tailwind.

## Tech stack

| Concern      | Tool                                   |
| ------------ | -------------------------------------- |
| Framework    | Next.js 16 (App Router, static export) |
| UI library   | React 19                               |
| Styling      | Tailwind CSS v4                        |
| Components   | shadcn/ui (radix-nova)                 |
| Icons        | react-icons, lucide-react              |
| Contact form | @emailjs/browser                       |
| Hosting      | Firebase Hosting                       |

## Scripts

```bash
npm run dev     # start the dev server (http://localhost:3000)
npm run build   # build + static export to ./out
npm run lint    # run ESLint
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

## Deployment

The app is configured for a fully static export (`output: "export"` in
`next.config.ts`). Build, then deploy the `out/` directory to Firebase Hosting:

```bash
npm run build
firebase deploy
```
