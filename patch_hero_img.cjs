const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

code = code.replace(
  'src={heroImg}',
  'src={heroInfo?.heroUrl || heroImg}'
);

fs.writeFileSync('src/components/Hero.tsx', code, 'utf8');
console.log('Patched Hero');
