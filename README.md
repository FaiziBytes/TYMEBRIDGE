# ThymeBridge

Marketing site and web platform for ThymeBridge — solar, battery storage and EV
charging installers based in Nottingham, UK.

A single TypeScript codebase: a React + Vite client and an Express + Prisma API,
built together into one deployable bundle.

## Stack

| Layer    | Tech                                                             |
| -------- | ---------------------------------------------------------------- |
| Client   | React 18, Vite 7, React Router 7, TanStack Query, Zustand         |
| UI       | Tailwind CSS 4, Radix UI primitives, lucide-react, Recharts       |
| Server   | Express 5, Prisma 7 (PostgreSQL), Socket.IO, BullMQ + Redis       |
| Auth     | JWT (access + refresh), Google OAuth, email/WhatsApp OTP          |
| Services | Brevo SMTP, Meta WhatsApp Cloud API, Zoom S2S OAuth, AWS S3       |
| Tooling  | TypeScript, ESLint 9, Prettier, Husky + lint-staged, esbuild      |

## Project structure

```
client/          React app (Vite root)
  src/pages/     Route-level pages — home, design-system, not-found
  src/components/site/   Layout, header, footer, picture, JSON-LD
  src/components/ui/     Radix-based UI primitives
  src/config/site.ts     Every client-specific string (brand, services, contact)
server/          Express API
  app.ts         Middleware chain, CSP/CORS, static + Vite wiring
  server.ts      Dev/production entrypoint
  serverless.ts  Vercel function entrypoint
  config/        env validation, cors, csp, multer, s3, app config
  middlewares/   requestId, rateLimiter, inputSanitizer, errorHandler, validator
  modules/       Feature modules (routes + controller + service per feature)
  utils/         ApiError, ApiResponse, jwt, logger, mailer, storage, pagination
shared/          Types shared between client and server
prisma/          schema.prisma — add your models here
api/index.js     Vercel serverless handler
script/build.ts  Production build (Vite client + esbuild server bundle)
scripts/deploy.sh  Staging deploy script run over SSH
```

Branding lives in [client/src/config/site.ts](client/src/config/site.ts) —
changing the brand means editing that file, not hunting through components.

## Getting started

Requires **Node.js 24+** (see [.nvmrc](.nvmrc)) and a PostgreSQL database.

```bash
npm install
cp .example.env .env     # then fill in the blanks
npm run db:push          # push the Prisma schema and generate the client
npm run dev              # http://localhost:5000
```

The server validates environment variables at boot
([server/config/env.ts](server/config/env.ts)) and refuses to start with a clear
message if anything required is missing or malformed. Only `DATABASE_URL` and
`JWT_SECRET` are strictly required; optional integrations (Google, SMTP,
WhatsApp, Zoom, S3) stay disabled when left blank and fall back to logging to
the console, so every flow remains testable locally.

## Scripts

| Command                | What it does                                      |
| ---------------------- | ------------------------------------------------- |
| `npm run dev`          | Nodemon + tsx, client served through Vite middleware |
| `npm run build`        | Typecheck, `prisma generate`, then bundle client + server |
| `npm start`            | Run the production bundle (`dist/index.cjs`)      |
| `npm run check`        | TypeScript typecheck                              |
| `npm run lint`         | ESLint (`lint:fix` to autofix)                    |
| `npm run format`       | Prettier write (`format:check` to verify)         |
| `npm run db:migrate`   | Create and apply a dev migration                  |
| `npm run db:push`      | Push schema without a migration, then generate    |
| `npm run db:studio`    | Open Prisma Studio                                |

A Husky `pre-commit` hook runs lint-staged (ESLint + Prettier) on staged files.

## Deployment

**Staging (VPS).** Pushing to `main` triggers
[.github/workflows/deploy-staging.yml](.github/workflows/deploy-staging.yml):
it typechecks and lints, then SSHes into the staging host and runs
[scripts/deploy.sh](scripts/deploy.sh). The process is kept alive by PM2 using
[ecosystem.config.cjs](ecosystem.config.cjs).

**Vercel.** [vercel.json](vercel.json) serves the built client from
`dist/public` and rewrites `/api/*` to the serverless handler in
[api/index.js](api/index.js), which wraps `dist/serverless.cjs`.

## Notes

- Images in `client/public/img/` are CC0 — provenance is tracked in
  [IMAGE-CREDITS.md](IMAGE-CREDITS.md).
- `/call` is served with cross-origin isolation headers so Zoom's gallery view
  works; toggle with `ZOOM_CALL_ISOLATION`.
- `.env`, `uploads/`, `logs/` and `dist/` are gitignored — never commit secrets.

## Licence

MIT
