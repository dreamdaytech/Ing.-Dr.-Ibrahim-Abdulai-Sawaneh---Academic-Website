const fs = require('fs');
let s = fs.readFileSync('src/components/Hero.tsx', 'utf8');

s = s.replace(
  'className="relative w-full max-w-sm"',
  'className="relative w-full max-w-md"'
);
s = s.replace(
  'className="flex h-80 w-full items-center justify-center bg-slate-50 relative overflow-hidden border-r-4 border-editorial-gold"',
  'className="flex h-96 sm:h-[32rem] w-full items-center justify-center bg-slate-50 relative overflow-hidden border-r-4 border-editorial-gold"'
);

fs.writeFileSync('src/components/Hero.tsx', s);
