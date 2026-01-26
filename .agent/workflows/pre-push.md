---
description: Pre-push quality gate - run before every git push to prevent build errors
---

# Pre-Push Verification Workflow

**ALWAYS run this workflow before pushing code to GitHub.** This prevents TypeScript and build errors from reaching production.

## Steps

// turbo-all
1. Run TypeScript type check (no emit):
```powershell
npx tsc --noEmit
```

2. If Step 1 fails, **DO NOT PUSH**. Fix all TypeScript errors first.

3. Run the production build to catch any additional issues:
```powershell
npm run build
```

4. If Step 3 fails, **DO NOT PUSH**. Fix all build errors first.

5. Only after both checks pass, proceed with git operations:
```powershell
git add -A
git commit -m "your commit message"
git push
```

## Common Error Types to Watch For

| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot find name 'X'` | Typo or missing import | Check component name spelling, add import |
| `Property 'x' does not exist on type 'never'` | Type inference issue | Add type assertion or fix conditional logic |
| `Object literal may only specify known properties` | Wrong function signature | Check the function/hook interface definition |
| `Argument of type 'any' is not assignable to type 'never'` | Supabase placeholder client | Cast with `as any` on the `.from()` call |

## Quick Check Command (Combined)
```powershell
npx tsc --noEmit; if ($LASTEXITCODE -eq 0) { npm run build }
```
