---
description: Start development server with all necessary services
---

# Development Server Startup Workflow

**Quick start for local development.**

## Steps

// turbo-all
1. Verify dependencies are installed:
```powershell
npm install
```

2. Start development server:
```powershell
npm run dev
```

3. Open in browser at http://localhost:3000

## Optional: Start with Supabase Local

If using Supabase local development:
```powershell
npx supabase start
npm run dev
```

## Environment Check

Before starting, verify `.env.local` contains:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (for server actions)
