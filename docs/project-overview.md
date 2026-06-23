# dev|kon Portfolio — Project Overview

A concise overview of the architecture and workflow of the **dev|kon** personal portfolio project.

## Tech Stack
* **Framework:** Next.js 16 (App Router) - Server-side rendered (SSR).
* **Styling:** Tailwind CSS v4 & custom variables (cream/ink theme) in [globals.css](file:///Users/linkon/Linkon/own-projects/dev-kon-portfolio/src/app/globals.css).
* **Database:** Prisma ORM 7 + PostgreSQL (Prisma Postgres).
* **Animations & Scrolling:** Lenis (smooth scroll) & Motion v12.
* **Component Library:** shadcn/ui (radix-nova).

## Directory Structure
* [`src/app/`](file:///Users/linkon/Linkon/own-projects/dev-kon-portfolio/src/app): Next.js pages/routes and backend API endpoints.
* [`src/components/`](file:///Users/linkon/Linkon/own-projects/dev-kon-portfolio/src/components): React components.
  * [`site/`](file:///Users/linkon/Linkon/own-projects/dev-kon-portfolio/src/components/site): General page layout components.
  * [`portfolio/`](file:///Users/linkon/Linkon/own-projects/dev-kon-portfolio/src/components/portfolio): Modular landing page sections (Hero, About, Services, FeaturedProjects, Testimonials, Thoughts, Contact).
  * [`admin/`](file:///Users/linkon/Linkon/own-projects/dev-kon-portfolio/src/components/admin): Dashboard auth & shell controls.
  * [`ui/`](file:///Users/linkon/Linkon/own-projects/dev-kon-portfolio/src/components/ui): Reusable shadcn primitive components.
* [`src/lib/`](file:///Users/linkon/Linkon/own-projects/dev-kon-portfolio/src/lib): Shared helpers (Prisma initialization, auth session utilities, EmailJS/Resend config, API wrappers, etc.).
* [`prisma/`](file:///Users/linkon/Linkon/own-projects/dev-kon-portfolio/prisma): DB configuration, [schema.prisma](file:///Users/linkon/Linkon/own-projects/dev-kon-portfolio/prisma/schema.prisma), and database seeds.

## Core Features & Data Flow
1. **Dynamic Content Engine:** 
   * Content (Projects, Blogs, Services, Testimonials) is served via `/api/content/[collection]`.
   * Stored in PostgreSQL, managed by Prisma, replacing the former Firestore configuration.
2. **PostgreSQL File Storage:**
   * Images and PDFs (like the resume) are stored directly in PostgreSQL as byte arrays (`Bytes`) under the `Upload` model.
   * Served to the client dynamically via `/api/uploads/[id]`, replacing Firebase Storage.
3. **Admin Dashboard (`/admin` / `/dashboard`):**
   * Authenticated via a server-side session cookie checking `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
   * Provides full CRUD on content collections, file uploads, and analytics telemetry.
4. **First-Party Analytics:**
   * Tracks views and visits using custom server events stored in the `AnalyticsEvent` table via `/api/analytics`. No third-party trackers are used.

## Essential Scripts
* Run Dev Server: `npm run dev`
* Sync DB Schema: `npm run db:migrate`
* Seed Default Content: `npm run db:seed`
* Build Production App: `npm run build`
