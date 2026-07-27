const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');

// Fix tiny h4
app = app.replace(
  'h4 className="font-serif text-[10px] font-bold tracking-tight leading-tight line-clamp-3 mt-1.5"',
  'h4 className="font-serif text-sm font-bold tracking-tight leading-tight line-clamp-3 mt-1.5"'
);

// Fix h3 that is uppercase
app = app.replace(
  '<h3 className="font-serif text-sm font-bold text-editorial-navy border-b border-editorial-border-light pb-2.5 uppercase tracking-widest">',
  '<h3 className="font-serif text-lg font-bold text-editorial-navy border-b border-editorial-border-light pb-2.5">'
);

fs.writeFileSync('src/App.tsx', app);

console.log('Fixed App.tsx headings');
