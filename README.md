# AI SaaS Dashboard

A modern AI-powered dashboard built with Next.js, TypeScript, Prisma, and NextAuth. The app provides a secure workspace where users can sign in, interact with AI tools, save their work, and view activity analytics from one place.

## What this project includes

- User authentication with email/password and Google OAuth
- Protected dashboard routes
- AI chat experience
- AI image generation flow
- Resume generation workflow
- Code review assistance
- Usage analytics dashboard with charts

## Tech stack

- Frontend: Next.js 14, React, Tailwind CSS
- Backend: Next.js route handlers
- Authentication: NextAuth
- Database: Prisma with MySQL
- AI integrations: Hugging Face and OpenAI-based services

## Project structure

- [src/app](src/app) contains the app router pages and API routes
- [src/components](src/components) holds reusable UI components
- [src/lib](src/lib) contains configuration for auth, Prisma, and AI services
- [prisma/schema.prisma](prisma/schema.prisma) defines the database models

## How it works

1. A user signs in or registers through the auth pages.
2. NextAuth manages the session and protects dashboard pages.
3. The dashboard shell loads the sidebar and activity UI.
4. Each AI feature sends requests to server-side API routes.
5. The server validates the session, stores relevant data in Prisma, and calls the AI service.
6. The response is returned to the client and displayed in the UI.

## Getting started

Install dependencies:

```bash
npm install
```

Create your environment file and add the required values:

```bash
cp .env.example .env
```

Required environment variables:

- `DATABASE_URL`
- `AUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `OPENAI_API_KEY`
- `HF_TOKEN`

Push the Prisma schema:

```bash
npm run db:push
```

Start the development server:

```bash
npm run dev
```

Then open http://localhost:3000.

## Notes

This project is a strong starter template for building AI products with authentication, database persistence, and analytics in a single app.
