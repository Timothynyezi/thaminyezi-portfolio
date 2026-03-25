# Workspace

## Overview

pnpm workspace monorepo with a React + TypeScript frontend portfolio and a C# ASP.NET Core backend API, backed by PostgreSQL.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend**: C# ASP.NET Core Web API (.NET 8)
- **Database**: PostgreSQL + Dapper ORM (via Npgsql)
- **API codegen**: Orval (from OpenAPI spec)

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── portfolio/          # React + Vite portfolio frontend (serves at /)
│   ├── portfolio-api/      # C# ASP.NET Core Web API (serves at /api via api-server artifact)
│   ├── api-server/         # Artifact config only — runs the C# portfolio-api project
│   └── mockup-sandbox/     # UI prototyping sandbox
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas
│   └── db/                 # Drizzle schema (unused, C# uses Dapper)
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Portfolio Content

Owner: **Thamsanqa Timothy Nyezi** — Junior C# / .NET Developer
- Location: Belhar, Cape Town, South Africa
- GitHub: https://github.com/Timothynyezi
- LinkedIn: https://www.linkedin.com/in/tt-nyezi

## C# ASP.NET Core API

Located at `artifacts/portfolio-api/`. Runs via the `artifacts/api-server` artifact.

### Endpoints
- `GET /api/healthz` — Health check
- `GET /api/profile` — Profile information
- `GET /api/projects` — GitHub projects (from PostgreSQL)
- `GET /api/skills` — Technical skills (from PostgreSQL)
- `POST /api/contact` — Contact form submission

### Structure
- `Program.cs` — App setup, DI, CORS, database seeding
- `Controllers/` — ProfileController, ProjectsController, SkillsController, ContactController
- `Data/` — Repository interfaces and implementations (Dapper), DatabaseSeeder
- `Models/` — Project, Profile, SkillCategory, Contact models

### Database
PostgreSQL tables: `projects`, `project_tags`, `skill_categories`, `skills`, `contact_submissions`
Seeded automatically on startup if empty.

### Running in Dev
```bash
cd artifacts/portfolio-api && dotnet run --urls http://0.0.0.0:8080
```

## Frontend Portfolio

Located at `artifacts/portfolio/`. React + Vite + TypeScript + Tailwind CSS.

### Sections
1. **Hero** — Name, title, photo, CTA buttons
2. **About** — Bio and personal info
3. **Skills** — Grouped technical skills from API
4. **Projects** — GitHub project cards from API
5. **Experience** — WeThinkCode_ training
6. **Contact** — Form that POSTs to /api/contact

Profile photo at `artifacts/portfolio/public/profile.jpg`

## OpenAPI & Codegen

Spec: `lib/api-spec/openapi.yaml`

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

## Packages

### `artifacts/api-server` (`@workspace/api-server`)
Artifact config only — the dev run command points to the C# project.

### `artifacts/portfolio-api` (C# .NET 8)
- Npgsql 8.0.6 — PostgreSQL driver
- Dapper 2.1.66 — Micro ORM for SQL queries

### `artifacts/portfolio` (`@workspace/portfolio`)
- React, Vite, TypeScript, Tailwind CSS
- framer-motion, react-hook-form, @hookform/resolvers, zod
- @tanstack/react-query, wouter
