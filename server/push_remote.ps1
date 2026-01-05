$env:DATABASE_URL = 'postgresql://postgres.iqepgikzlfmlnievxnog:v$UY5vZc4bmY!7b@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true'
Write-Host "Pushing schema to Remote DB (Pooler)..."
npx prisma db push --accept-data-loss
Write-Host "Seeding..."
npx tsx src/seed.ts
