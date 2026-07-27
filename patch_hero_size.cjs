const fs = require('fs');
let s = fs.readFileSync('src/components/Hero.tsx', 'utf8');

s = s.replace(
  'className="lg:col-span-7 flex flex-col justify-center"',
  'className="lg:col-span-6 flex flex-col justify-center"'
);
s = s.replace(
  'className="lg:col-span-5 flex justify-center"',
  'className="lg:col-span-6 flex justify-center"'
);
s = s.replace(
  'className="relative w-full max-w-md"',
  'className="relative w-full max-w-xl"' // increased from md to xl
);
s = s.replace(
  'className="flex h-96 sm:h-[32rem] w-full items-center justify-center bg-slate-50 relative overflow-hidden border-r-4 border-editorial-gold"',
  'className="flex h-96 sm:h-[36rem] w-full items-center justify-center bg-slate-50 relative overflow-hidden border-r-4 border-editorial-gold"'
);

fs.writeFileSync('src/components/Hero.tsx', s);
