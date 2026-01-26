---
description: Deploy to Vercel production with verification
---

# Production Deployment Workflow

**Deploy to Vercel with pre-flight checks.**

## Steps

// turbo-all
1. Run type check:
```powershell
npx tsc --noEmit
```

2. Run production build locally:
```powershell
npm run build
```

3. If both pass, commit and push:
```powershell
git add -A
git commit -m "deploy: production release"
git push
```

4. Deploy to Vercel:
```powershell
npx vercel --prod
```

## Rollback Command

If deployment fails:
```powershell
npx vercel rollback
```

## Environment Variables

Ensure Vercel has all required environment variables:
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Verify:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GOOGLE_API_KEY` (if using Gemini)
