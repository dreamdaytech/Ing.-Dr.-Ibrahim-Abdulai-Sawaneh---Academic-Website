const fs = require('fs');
let s = fs.readFileSync('src/components/Hero.tsx', 'utf8');

s = s.replace(
  'className="mt-4 font-serif text-lg italic text-editorial-navy/85 max-w-xl border-l-2 border-editorial-gold pl-4 py-1"',
  'className="mt-4 font-serif text-base italic text-editorial-navy/85 max-w-xl border-l-2 border-editorial-gold pl-4 py-1"'
);

fs.writeFileSync('src/components/Hero.tsx', s);
