# Setup, Configuration & Deployment

This guide explains how to install the project, configure environment variables,
and deploy the site. The app is a **Next.js 16 (App Router)** project that is
exported as a **fully static site** and hosted on **Firebase Hosting**.

---

## 1. Prerequisites

| Tool        | Version          | Notes                                            |
| ----------- | ---------------- | ------------------------------------------------ |
| Node.js     | **20.9+** (LTS)  | Next.js 16 requires Node 20.9 or newer.          |
| npm         | 10+              | Comes with Node. (Yarn/pnpm also work.)          |
| Git         | any              | To clone the repo.                               |
| Firebase CLI| latest           | Only needed for deploying. Install in step 5.    |

Check your versions:

```bash
node -v
npm -v
```

---

## 2. Installation

```bash
# 1. Clone the repository
git clone git@github.com:linkon63/dev-kon-portfolio.git
cd dev-kon-portfolio

# 2. Install dependencies (uses package-lock.json)
npm install
```

> This project uses **npm** (`package-lock.json`). Don't mix package managers —
> avoid creating `pnpm-lock.yaml` / `yarn.lock`.

---

## 3. Environment variables

The site **runs without any environment variables** out of the box — every page
is static. Two optional integrations read env vars:

- **Firebase SDK** (Firestore) — config lives in
  [`src/lib/firebase.ts`](src/lib/firebase.ts), reading `NEXT_PUBLIC_FIREBASE_*`.
- **EmailJS** contact form — see
  [`src/components/site/ContactForm.tsx`](src/components/site/ContactForm.tsx)
  (send logic is currently commented out).

Copy [`.env.example`](.env.example) → `.env.local` and fill in the values. A
ready-to-use `.env.local` with the original Firebase keys is already present.

### Important: static export + env vars

Because the site is statically exported (`output: "export"`), there is **no
server at runtime**. That means:

- Only variables prefixed with **`NEXT_PUBLIC_`** are available in the browser.
- Their values are **baked into the build** at `npm run build` time — they are
  **not secret**. Never put private API keys here; EmailJS public keys are fine
  because they are meant to be public.

### Create `.env.local` (git-ignored)

```bash
# .env.local

# Firebase web SDK (used by src/lib/firebase.ts)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# EmailJS (only if you wire up the contact form)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Find these values in **Firebase Console → Project settings → Your apps → SDK
setup and configuration**.

### Using Firebase in code

```ts
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const snap = await getDocs(collection(db, "projects"));
```

`.env*` files are already listed in [`.gitignore`](.gitignore), so they will not
be committed.

### Wiring the form up (optional)

In `ContactForm.tsx`, replace the commented block with:

```ts
emailjs.sendForm(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  form.current!,
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
);
```

Create your IDs at <https://dashboard.emailjs.com/>.

---

## 4. Local development & build

```bash
npm run dev      # start dev server → http://localhost:3000
npm run lint     # run ESLint
npm run build    # production build + static export → ./out
```

After `npm run build`, the deployable static site is in the **`out/`** folder.
You can preview that exact output locally with any static server:

```bash
npx serve out
```

---

## 5. Firebase configuration (already set up)

Two files control Firebase Hosting. They are committed, so you normally don't
need to touch them.

### [`.firebaserc`](.firebaserc) — which Firebase project to use

```json
{
  "projects": {
    "default": "dev-kon-portfolio"
  }
}
```

`dev-kon-portfolio` is the Firebase **project ID**. To point at a different
project, change this value (or run `firebase use --add`).

### [`firebase.json`](firebase.json) — hosting settings

```json
{
  "hosting": {
    "public": "out",
    "cleanUrls": true,
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
  }
}
```

- **`public: "out"`** → Firebase serves the static export from `out/`.
- **`cleanUrls: true`** → serves `/about` instead of `/about.html`.
- No SPA rewrite is used, because this is a multi-page static site; unknown URLs
  fall back to the generated `404.html`.

---

## 6. Deploy to Firebase Hosting

### One-time setup

```bash
# Install the Firebase CLI globally
npm install -g firebase-tools

# Log in to the Google account that owns the Firebase project
firebase login
```

Make sure a Firebase project named **`dev-kon-portfolio`** exists in the
[Firebase Console](https://console.firebase.google.com/) and that Hosting is
enabled. (Or change the ID in `.firebaserc`.)

### Deploy

```bash
# 1. Build the static site into ./out
npm run build

# 2. Upload ./out to Firebase Hosting
firebase deploy
```

After it finishes, the CLI prints the live **Hosting URL**, e.g.
`https://dev-kon-portfolio.web.app`.

> Tip: deploy only hosting (skip other Firebase resources) with
> `firebase deploy --only hosting`.

### Where it goes live

Firebase Hosting serves the site at:
- `https://<project-id>.web.app` → `https://dev-kon-portfolio.web.app`
- `https://<project-id>.firebaseapp.com`

You can attach a custom domain in **Firebase Console → Hosting → Add custom
domain**.

---

## 7. Deploying elsewhere (alternatives)

Because the build is plain static files in `out/`, you can host it anywhere.

### Vercel (recommended for Next.js, zero config)

Remove `output: "export"` from `next.config.ts` to use full Next.js features, then:

```bash
npm i -g vercel
vercel          # follow prompts; auto-detects Next.js
```

Or just connect the GitHub repo at <https://vercel.com/new> — pushes auto-deploy.

### Netlify

- Build command: `npm run build`
- Publish directory: `out`

### Any static host / CDN (GitHub Pages, S3, Cloudflare Pages, Nginx)

Run `npm run build` and upload the contents of **`out/`**.

---

## 8. Troubleshooting

| Symptom                                   | Fix                                                                 |
| ----------------------------------------- | ------------------------------------------------------------------- |
| `firebase: command not found`             | `npm install -g firebase-tools`                                     |
| Deploy succeeds but page is blank/404     | Did you run `npm run build` first? `out/` must exist before deploy.  |
| Contact form does nothing                 | Expected — EmailJS is disabled by default. See section 3.           |
| Env var is `undefined` in the browser     | It must start with `NEXT_PUBLIC_` and you must rebuild after adding. |
| "multiple lockfiles" warning during build | Delete stray `pnpm-lock.yaml` / `yarn.lock`; keep `package-lock.json`. |
| Wrong Firebase project                    | Edit `.firebaserc` or run `firebase use <project-id>`.              |
```

---

## Quick reference

```bash
npm install            # setup
npm run dev            # develop locally (localhost:3000)
npm run build          # build → ./out
firebase deploy        # publish to Firebase Hosting
```
