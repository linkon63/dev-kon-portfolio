# CI/CD to a VPS with GitHub Actions

Complete, step-by-step guide to continuously integrate and deploy this app
(**Next.js 16 + Prisma/Postgres**, Node runtime) to a **VPS** using **GitHub
Actions**. When you push to `dev` (the deployment branch), GitHub runs lint +
build (CI), then SSHes into the VPS and deploys with **zero downtime** via
**PM2**, behind **Nginx** + **HTTPS**.

---

## 1. Architecture

```
 ┌────────────┐  git push dev    ┌──────────────────────┐
 │  Developer │ ───────────────► │      GitHub          │
 └────────────┘                  │  Actions (CI + CD)   │
                                 └──────────┬───────────┘
                    CI: lint + build        │  CD: SSH deploy
                                            ▼
                              ┌──────────────────────────────┐
                              │            VPS                │
                              │  Nginx (:443/:80, TLS)        │
                              │     └─► PM2 → next start :3000 │
                              │  Postgres (local or managed)  │
                              └──────────────────────────────┘
```

**Strategy:** SSH-based pull-and-build deploy (simplest and most reliable for a
single VPS — no Docker registry or self-hosted runner to maintain). The repo is
cloned on the server; each deploy resets to the latest `dev`, installs, runs DB
migrations, builds, and reloads PM2.

**Files this guide adds to the repo:**

| File | Role |
| --- | --- |
| [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) | Lint + build on every PR/push to `dev` |
| [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) | SSH deploy on push to `dev` |
| [`scripts/deploy.sh`](../scripts/deploy.sh) | Runs on the VPS: pull → install → migrate → build → reload |
| [`ecosystem.config.js`](../ecosystem.config.js) | PM2 process config (cluster mode) |

---

## 2. One-time VPS setup

SSH into your VPS as root (or a sudo user) and do the following.

### 2.1 Install Node 20 LTS, git, PM2

```bash
# Node 20 (Next.js 16 requires Node 20.9+)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git

node -v            # expect v20.x
sudo npm install -g pm2
```

### 2.2 Create a dedicated deploy user

Never deploy as root. Create a `deploy` user that owns the app.

```bash
sudo adduser --disabled-password --gecos "" deploy
sudo usermod -aG sudo deploy          # only if migrations/pm2 need sudo; usually not
sudo su - deploy                      # switch to the deploy user
```

### 2.3 Generate an SSH deploy key (used by GitHub Actions)

As the `deploy` user, create a keypair **dedicated to CI** (no passphrase, so
Actions can use it non-interactively):

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/gh_actions -N ""

# Authorize the public key so GitHub can log in as `deploy`:
cat ~/.ssh/gh_actions.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Print the PRIVATE key — copy the whole thing into the GitHub secret later:
cat ~/.ssh/gh_actions
```

> Keep the **private** key secret (goes into `VPS_SSH_KEY`). The **public** key
> stays on the server in `authorized_keys`.

### 2.4 Clone the repo and add the environment file

```bash
cd ~
git clone https://github.com/linkon63/dev-kon-portfolio.git
cd dev-kon-portfolio
git checkout dev        # deploy branch

# Create the production .env (git-ignored, never committed).
cp .env.example .env
nano .env        # fill in real values — see section 4
```

Fill `.env` with **production** values:

```bash
DATABASE_URL=postgresql://USER:PASS@HOST:5432/DBNAME?schema=public
ADMIN_EMAIL=admin@devkon.com
ADMIN_PASSWORD=<strong-password>
ADMIN_SESSION_SECRET=<long-random-string>          # openssl rand -hex 32
NEXT_PUBLIC_ADMIN_EMAIL=admin@devkon.com
NEXT_PUBLIC_ADMIN_PASSWORD=<same-as-admin-or-demo>
RESEND_API_KEY=<your-resend-key>
CONTACT_TO_EMAIL=you@example.com
CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
```

### 2.5 Provision the database

Either use a **managed Postgres** (Prisma Postgres / Neon / Supabase / RDS) and
paste its URL into `DATABASE_URL`, **or** install Postgres locally:

```bash
sudo apt-get install -y postgresql
sudo -u postgres psql -c "CREATE DATABASE devkon;"
sudo -u postgres psql -c "CREATE USER devkon WITH ENCRYPTED PASSWORD 'strongpass';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE devkon TO devkon;"
# DATABASE_URL=postgresql://devkon:strongpass@localhost:5432/devkon?schema=public
```

### 2.6 First manual deploy (bootstrap)

Run one deploy by hand so the app is live before automation takes over:

```bash
cd ~/dev-kon-portfolio
chmod +x scripts/deploy.sh
npm ci
npx prisma migrate deploy
npm run db:seed          # optional: seed initial content
npm run build
pm2 start ecosystem.config.js
pm2 save
pm2 startup              # run the printed command (sudo ...) so PM2 survives reboot
```

Verify locally on the box:

```bash
curl -I http://localhost:3000     # expect HTTP 200
pm2 status
```

### 2.7 Nginx reverse proxy + HTTPS

```bash
sudo apt-get install -y nginx
sudo nano /etc/nginx/sites-available/devkon
```

```nginx
server {
    listen 80;
    server_name devkon.com www.devkon.com;   # <-- your domain

    client_max_body_size 10M;                # uploads go through /api/uploads

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/devkon /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Free TLS via Let's Encrypt (auto-edits the Nginx config for :443 + redirect):
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d devkon.com -d www.devkon.com
```

### 2.8 Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

---

## 3. GitHub repository secrets

In GitHub → **Settings → Secrets and variables → Actions → New repository
secret**, add:

| Secret | Value |
| --- | --- |
| `VPS_HOST` | VPS IP or hostname (e.g. `203.0.113.10`) |
| `VPS_PORT` | SSH port (usually `22`) |
| `VPS_USER` | `deploy` |
| `VPS_SSH_KEY` | The **private** key printed in step 2.3 (full `-----BEGIN…END-----`) |
| `VPS_APP_DIR` | Absolute path to the repo, e.g. `/home/deploy/dev-kon-portfolio` |

> Tip: for a real production setup, create a GitHub **Environment** named
> `production` and attach these secrets to it plus a required-reviewer rule, so
> deploys need an approval. (Then add `environment: production` to the deploy job.)

---

## 4. Environment variables reference

Secrets live in the VPS `.env` (server-side, never shipped to the browser). CI
only needs placeholders because the build doesn't hit the DB. See
[`.env.example`](../.env.example) and [`docs/creadentials.md`](creadentials.md).

| Var | Where | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | VPS `.env` | Postgres connection (used at runtime + migrations) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | VPS `.env` | Admin login check |
| `ADMIN_SESSION_SECRET` | VPS `.env` | Signs the admin session cookie |
| `NEXT_PUBLIC_ADMIN_*` | VPS `.env` | Login-screen hint (public) |
| `RESEND_API_KEY`, `CONTACT_*` | VPS `.env` | Contact-form email |

---

## 5. How the pipeline works

### CI — [`ci.yml`](../.github/workflows/ci.yml)

Triggers on every PR and push to `dev`:

1. Checkout → setup Node 20 (npm cache).
2. `npm ci` (runs `prisma generate` via `postinstall`).
3. `npm run lint`.
4. `npm run build` with placeholder env vars.

If CI fails, fix it before merging — a red build should block deploy.

### CD — [`deploy.yml`](../.github/workflows/deploy.yml)

Triggers on push to `dev` (and manual **Run workflow**). It opens an SSH
session to the VPS and runs [`scripts/deploy.sh`](../scripts/deploy.sh), which:

1. `git fetch` + `git reset --hard origin/dev` (server matches `dev` exactly).
2. `npm ci`.
3. `npx prisma migrate deploy` (applies pending migrations).
4. `npm run build`.
5. `pm2 reload ecosystem.config.js` — **zero-downtime** rolling restart.
6. `pm2 save`.

`concurrency: deploy-production` guarantees only one deploy runs at a time and a
running deploy is never cancelled midway.

> **Gate deploy on CI (recommended):** the two workflows run independently. To
> ensure deploy only runs after CI is green, either merge them into one workflow
> with `needs: build`, or use branch protection so nothing lands on `dev`
> without passing CI. See section 8.

---

## 6. Everyday workflow

```bash
# 1. Work on a branch, open a PR → CI runs automatically.
git checkout -b feature/x
git push -u origin feature/x

# 2. Merge the PR into dev → CI runs, then Deploy runs → live in ~1–3 min.

# 3. Redeploy current dev without a code change:
#    GitHub → Actions → "Deploy to VPS" → Run workflow.
```

Watch progress in the repo's **Actions** tab. On the server:

```bash
pm2 status
pm2 logs dev-kon-portfolio
```

---

## 7. Database migrations

- Create migrations locally during development: `npm run db:migrate` (creates a
  migration in `prisma/migrations/`), then commit them.
- The deploy script applies them in production with `prisma migrate deploy`
  (never `migrate dev` on the server — it's non-interactive and safe).
- **Back up before risky migrations:** `pg_dump "$DATABASE_URL" > backup.sql`.

---

## 8. Gating deploy on CI (optional hardening)

Enable **branch protection** on `dev` (Settings → Branches):

- Require pull request before merging.
- Require the **CI / Lint & Build** status check to pass.

This ensures no unbuildable commit reaches `dev`, so the deploy workflow only
ever ships green code. Alternatively, combine both jobs in one file:

```yaml
deploy:
  needs: build          # deploy waits for the CI job in the same workflow
  if: github.ref == 'refs/heads/dev'
```

---

## 9. Rollback

Because deploys are plain git checkouts, rolling back = deploying an older commit.

```bash
# On the VPS:
cd ~/dev-kon-portfolio
git reset --hard <previous-good-commit-sha>
npm ci && npm run build
pm2 reload ecosystem.config.js
```

> If a migration is involved, restore the DB backup first, or write a
> compensating "down" migration. Roll code and schema back together.

To find the SHA: `git log --oneline -n 10`.

---

## 10. Troubleshooting

| Symptom | Fix |
| --- | --- |
| Actions: `Permission denied (publickey)` | `VPS_SSH_KEY` must be the full **private** key; the matching public key must be in `~deploy/.ssh/authorized_keys`. |
| Actions hangs / times out on SSH | Check `VPS_HOST`/`VPS_PORT`, and that the firewall allows SSH from anywhere. |
| `node: command not found` in deploy | Node installed under nvm for an interactive shell only — install Node system-wide (section 2.1) or keep the nvm-load lines in `deploy.sh`. |
| `prisma migrate deploy` fails | Verify `DATABASE_URL` in the VPS `.env` and that the DB is reachable. |
| Build OOM-kills on a small VPS | Add swap: `fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile`. |
| 502 Bad Gateway from Nginx | App not listening on `:3000` — `pm2 status`, `pm2 logs`; confirm `PORT` matches the Nginx `proxy_pass`. |
| Env change not taking effect | `.env` is read at boot — `pm2 reload ecosystem.config.js --update-env`. |
| Uploads fail with 413 | Raise `client_max_body_size` in the Nginx server block. |

---

## Quick reference

```bash
# GitHub secrets needed: VPS_HOST VPS_PORT VPS_USER VPS_SSH_KEY VPS_APP_DIR

# Manual deploy on the VPS:
cd ~/dev-kon-portfolio && ./scripts/deploy.sh

# PM2:
pm2 status | pm2 logs dev-kon-portfolio | pm2 reload ecosystem.config.js

# Trigger deploy from GitHub: Actions → "Deploy to VPS" → Run workflow
```
