# Shift to Zero Carbon

Website and admin console for Shift to Zero Carbon, built from the Stitch design "Shift to Zero Carbon Portal".

- **Next.js 16** (App Router, Cache Components) + TypeScript + Tailwind CSS v4
- **Sanity** (public dataset) for content: blog, events, team, carbon tools, site settings. Studio at `/studio`
- **Neon Postgres + Drizzle** for form submissions (kept out of Sanity because they contain personal data)
- **Auth.js** (Google, email allowlist) for `/admin`
- **Resend** for new-submission emails

## Getting started

Requires Node 20.9+ (`nvm use` picks up `.nvmrc`).

```bash
npm install
cp .env.example .env.local   # fill in values, see below
npm run db:migrate           # create tables in Neon
npm run dev
```

## Accounts and environment

| Service | Steps | Env vars |
| --- | --- | --- |
| Sanity | Create project + `production` dataset (public). Add CORS origins `http://localhost:3000` and the prod domain (allow credentials). Add a webhook → `https://<domain>/api/revalidate`, filter `_type in ["post","event","teamMember","carbonTool","siteSettings"]`, projection `{_type, "slug": slug.current}`, with a secret. | `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_REVALIDATE_SECRET` |
| Neon | Create project, copy the pooled connection string. | `DATABASE_URL` |
| Google Cloud | OAuth client (Web). Redirect URIs: `http://localhost:3000/api/auth/callback/google` and the prod equivalent. | `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` |
| Auth.js | `npx auth secret` | `AUTH_SECRET`, `ADMIN_EMAILS` |
| Resend | Verify the sending domain, create an API key. | `RESEND_API_KEY`, `NOTIFY_EMAIL_TO`, `NOTIFY_EMAIL_FROM` |

Content editors sign in to `/studio` with their own Sanity accounts (invite them from sanity.io/manage).

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` / `build` / `start` | Next.js |
| `npm run typecheck` | TypeScript |
| `npm run format` | Prettier (with Tailwind class sorting) |
| `npm run db:generate` | Generate a migration after editing `src/db/schema.ts` |
| `npm run db:migrate` | Apply migrations to `DATABASE_URL` |
| `npm run db:studio` | Browse the database |
| `npm run typegen` | Generate TypeScript types for Sanity queries |

## Structure

```text
src/
  app/(site)/          public pages
  app/admin/(console)/ admin pages (protected by src/proxy.ts + lib/dal.ts)
  app/admin/login/     admin sign-in
  app/studio/          embedded Sanity Studio
  app/api/revalidate/  Sanity webhook → revalidateTag
  components/          ui/, site/, admin/
  db/                  Drizzle schema + client
  lib/submissions.ts   the only module that touches submission storage
  lib/actions/         Server Actions (public forms, admin inbox)
  sanity/              schemas, queries, fetch helper
```

Spam protection on public forms is a honeypot field plus a minimum fill time (`src/lib/spam.ts`). Add Cloudflare Turnstile there if needed.
# shifttozero-web
