#!/usr/bin/env bash
#
# Remote deploy script — runs ON THE VPS, invoked by .github/workflows/deploy.yml.
# Pulls the latest main, installs deps, applies DB migrations, builds, and
# reloads the app under PM2 with zero downtime.
#
# Assumes: repo already cloned in this directory, `.env` present (NOT from git),
# Node 20+, npm, and pm2 installed globally. See docs/CI-CD.md.

set -euo pipefail

# Load nvm if Node was installed that way (non-interactive shells skip .bashrc).
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

BRANCH="${DEPLOY_BRANCH:-dev}"

echo "==> Deploying branch '$BRANCH' in $(pwd)"

echo "==> Fetching latest code"
git fetch --all --prune
# Hard reset so the working tree exactly matches origin (discards any drift on
# the server). `.env`, node_modules, and .next are git-ignored so they survive.
git reset --hard "origin/$BRANCH"

echo "==> Installing dependencies (npm ci)"
npm ci

echo "==> Applying database migrations"
npx prisma migrate deploy

echo "==> Building production bundle"
npm run build

echo "==> Reloading app under PM2 (zero-downtime)"
# `reload` restarts workers one by one; on first ever deploy, start it instead.
pm2 reload ecosystem.config.js --update-env || pm2 start ecosystem.config.js
pm2 save

echo "==> Deploy complete ✅"
