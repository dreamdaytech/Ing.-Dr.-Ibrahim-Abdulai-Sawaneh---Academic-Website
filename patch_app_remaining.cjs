const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');

app = app.replace(
  'text-xs sm:text-base text-slate-300 leading-relaxed font-sans',
  'text-base text-slate-300 leading-relaxed font-sans'
);

app = app.replace(
  'bg-white/5 border border-white/15 p-6 rounded-none text-center text-slate-400 text-xs w-full py-16',
  'bg-white/5 border border-white/15 p-6 rounded-none text-center text-slate-400 text-sm w-full py-16'
);

fs.writeFileSync('src/App.tsx', app);

console.log('Fixed App.tsx remaining small text');
