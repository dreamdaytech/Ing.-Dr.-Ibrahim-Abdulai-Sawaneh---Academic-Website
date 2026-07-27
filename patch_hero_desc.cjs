const fs = require('fs');
let s = fs.readFileSync('src/components/Hero.tsx', 'utf8');

s = s.replace(
  'className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg max-w-xl font-sans"',
  'className="mt-6 text-sm sm:text-base leading-relaxed text-slate-600 max-w-xl font-sans"'
);

fs.writeFileSync('src/components/Hero.tsx', s);
