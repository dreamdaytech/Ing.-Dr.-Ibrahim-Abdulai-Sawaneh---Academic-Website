const fs = require('fs');
let s = fs.readFileSync('src/components/Hero.tsx', 'utf8');

s = s.replace(
  'text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl font-sans',
  'text-base leading-relaxed text-slate-600 max-w-2xl font-sans'
);

fs.writeFileSync('src/components/Hero.tsx', s);
