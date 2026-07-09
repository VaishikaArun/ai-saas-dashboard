# Console — AI SaaS Dashboard

A full-stack AI SaaS starter: authentication, AI chat, AI image generation,
AI resume builder, AI code reviewer, and a real usage-analytics dashboard —
built with Next.js 14 (App Router), TypeScript, Tailwind, Prisma, and OpenAI.

## Design direction

The UI leans into an "instrument console" identity rather than a generic
dark-mode template: a warm charcoal background (not blue-black), an amber
signal accent, a cool slate-teal data accent, and a live telemetry strip
(`SignalStrip`) across the top of the dashboard that reads like a systems
console — model, latency, uptime, session id. Space Grotesk for display type,
Inter for body copy, JetBrains Mono for data and code.

## Getting started

```bash
npm install
cp .env.example .env
```

Fill in `.env`:

| Variable | Where to get it |
|---|---|
| `DATABASE_URL` | A Postgres connection string — [Neon](https://neon.tech) or [Supabase](https://supabase.com) both have free tiers |
| `AUTH_SECRET` | Run `npx auth secret` |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → OAuth Client ID → redirect URI `http://localhost:3000/api/auth/callback/google` |
| `OPENAI_API_KEY` | [platform.openai.com](https://platform.openai.com/api-keys) |

Push the schema to your database:

```bash
npm run db:push
```

Run the dev server:

```bash
npm run dev
```

Visit `http://localhost:3000` — it redirects to `/login`.

## Project structure

```
src/
  app/
    (auth)/login, register        → auth pages
    (dashboard)/                   → protected route group (checked in layout.tsx)
      dashboard/                   → usage analytics overview
      chat/                        → AI chat
      image-generator/             → DALL·E image generation
      resume-builder/              → AI resume section writer
      code-reviewer/               → AI code review
    api/
      auth/[...nextauth]           → NextAuth handlers
      auth/register                → credentials signup
      chat, image, resume, code-review, analytics
  components/
    dashboard/                     → sidebar, signal strip, analytics chart
  lib/
    auth.ts                        → NextAuth config (Credentials + Google)
    prisma.ts                      → Prisma client singleton
    openai.ts                      → OpenAI client
  middleware.ts                    → route protection
prisma/schema.prisma                → User, Chat, Message, GeneratedImage, Resume, CodeReview
```

## What this demonstrates (for recruiters / reviewers)

- **Auth**: credential + OAuth flows, password hashing, JWT sessions, protected routes via middleware.
- **API integration**: server-side OpenAI calls (chat completions + image generation) never exposed to the client.
- **Database**: normalized Prisma schema, per-user data scoping, aggregation queries for analytics.
- **AI**: three distinct product surfaces (chat, generation, structured writing/review) built on the same provider.
- **Dashboard UI**: real usage data (not mocked) rendered with Recharts, plus a distinctive design system instead of a default template.

## Deploying

Push to GitHub, import into [Vercel](https://vercel.com/new), add the same
environment variables in Project Settings → Environment Variables, and set
`DATABASE_URL` to your hosted Postgres instance. Vercel runs `prisma generate`
automatically via the `postinstall` script.

## Extending

- **Payments**: not included yet — add Stripe checkout + a `Subscription` model gating AI usage by plan when you're ready.
- **Streaming chat**: current chat endpoint returns a full completion; swap to `openai.chat.completions.create({ stream: true })` + a `ReadableStream` response for token-by-token streaming.
- **Rate limiting**: add per-user request limits (e.g. Upstash Ratelimit) before these AI routes hit production traffic.
