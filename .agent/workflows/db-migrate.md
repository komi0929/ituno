---
description: Create and apply Supabase database migrations
---

# Database Migration Workflow

**Manage Supabase schema changes safely.**

## Steps

### Creating a New Migration

// turbo-all
1. Create migration file:
```powershell
npx supabase migration new <migration_name>
```

2. Edit the migration file in `supabase/migrations/`

3. Apply locally:
```powershell
npx supabase db reset
```

### Applying to Production

1. Link to remote project (if not already):
```powershell
npx supabase link --project-ref <project-ref>
```

2. Push migration to production:
```powershell
npx supabase db push
```

### Regenerate Types

After any schema change:
```powershell
npx supabase gen types typescript --local > src/lib/database.types.ts
```

## Common Migration Patterns

### Add new column
```sql
ALTER TABLE table_name
ADD COLUMN column_name data_type DEFAULT value;
```

### Add RLS policy
```sql
CREATE POLICY "policy_name" ON table_name
FOR SELECT USING (auth.uid() = user_id);
```

### Add foreign key
```sql
ALTER TABLE child_table
ADD CONSTRAINT fk_name
FOREIGN KEY (parent_id) REFERENCES parent_table(id);
```
