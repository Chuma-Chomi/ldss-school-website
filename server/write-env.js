const fs = require('fs');
const content = 'DATABASE_URL="postgresql://postgres:admin123@127.0.0.1:5432/ldss_db"\nJWT_SECRET="super-secret-key"\nPORT=5000';
fs.writeFileSync('.env', content);
console.log('.env file written');
