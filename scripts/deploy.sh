#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/thymebridge"
cd "$APP_DIR"

echo "▶ Fetching latest main..."
git fetch --all --prune
git reset --hard origin/main

echo "▶ Installing dependencies..."
npm ci

echo "▶ Building (tsc + prisma generate + vite + esbuild)..."
# t4g.small has 2GB RAM; raise V8 heap so the build doesn't OOM (needs swap too)
NODE_OPTIONS="--max-old-space-size=3072" npm run build

echo "▶ Syncing database schema..."
npx prisma db push

echo "▶ Reloading PM2..."
pm2 reload ecosystem.config.cjs --update-env
pm2 save

echo "✅ Deploy complete."
