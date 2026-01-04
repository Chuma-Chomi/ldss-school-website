$env:DATABASE_URL = 'postgresql://postgres:v$UY5vZc4bmY!7b@db.iqepgikzlfmlnievxnog.supabase.co:5432/postgres'
Write-Host "Pushing schema..."
npx prisma db push > remote_log.txt 2>&1
Write-Host "Seeding..."
npx tsx src/seed.ts >> remote_log.txt 2>&1
Write-Host "Done! Check remote_log.txt"
