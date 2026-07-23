const fs = require('fs');
let content = fs.readFileSync('src/data/academicData.ts', 'utf8');
content = content.replace(/address: "([^"]+)"/, 'address: "$1",\n  logoUrl: "",\n  heroUrl: ""');
fs.writeFileSync('src/data/academicData.ts', content);
