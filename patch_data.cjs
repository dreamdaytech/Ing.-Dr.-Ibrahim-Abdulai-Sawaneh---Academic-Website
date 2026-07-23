const fs = require('fs');
let content = fs.readFileSync('src/data/academicData.ts', 'utf8');
content = content.replace(/address: 'Freetown, Sierra Leone',/, "address: 'Freetown, Sierra Leone',\n  logoUrl: '',\n  heroUrl: '',");
fs.writeFileSync('src/data/academicData.ts', content);
