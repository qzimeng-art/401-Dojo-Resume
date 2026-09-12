# Deployment

## Target

Vercel + Supabase.

## Environment variables

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Only use service role server-side if actually required.

Do not expose it to client.

## Deployment flow

1. create Supabase project
2. run schema
3. run seed
4. configure Vercel env
5. connect GitHub repo
6. deploy preview
7. verify production build
8. promote/finalize production URL

## README deployment section

Must document:
- prerequisites
- install
- env
- schema
- seed
- dev
- build
- deploy

## Commands

Target:

```bash
npm install
npm run dev
npm run typecheck
npm run test
npm run build
npm run seed
```

If `seed` requires tsx or similar, keep it simple.

## Failure protection

Do not use local SQLite for Vercel production unless deployment design explicitly supports it.

## Production test

After final deployment:
- hard refresh
- create temporary record
- edit
- delete
- verify persistence
- verify mobile
