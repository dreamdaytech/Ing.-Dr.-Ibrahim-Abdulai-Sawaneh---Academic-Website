const fs = require('fs');
let s = fs.readFileSync('src/components/Footer.tsx', 'utf8');

s = s.replace(
  'Designed for digital scientific archiving • Open-Access Research Policy • Freetown, Sierra Leone',
  'Made with ❤️ by DreamDay Technology Limited'
);

fs.writeFileSync('src/components/Footer.tsx', s);
