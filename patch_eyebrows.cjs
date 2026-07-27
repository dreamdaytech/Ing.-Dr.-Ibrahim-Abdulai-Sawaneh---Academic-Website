const fs = require('fs');

let hero = fs.readFileSync('src/components/Hero.tsx', 'utf8');
hero = hero.replace(
  /<motion\.div\s+variants=\{itemVariants\}\s+className="inline-block px-3 py-1 bg-slate-100 text-editorial-navy text-\[10px\] font-bold uppercase tracking-widest mb-6 w-fit font-mono"\s*>\s*Academic Profile & Research Repository\s*<\/motion\.div>/g,
  ''
);
fs.writeFileSync('src/components/Hero.tsx', hero);

let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(
  /<span className="text-\[10px\] font-mono font-bold uppercase tracking-widest text-editorial-gold">Collaboration Gateway<\/span>/g,
  ''
);
fs.writeFileSync('src/App.tsx', app);

let contact = fs.readFileSync('src/components/ContactSection.tsx', 'utf8');
contact = contact.replace(
  /<span className="text-xs font-mono font-bold uppercase tracking-widest text-editorial-gold">Collaboration Portal<\/span>/g,
  ''
);
fs.writeFileSync('src/components/ContactSection.tsx', contact);

let about = fs.readFileSync('src/components/AboutSection.tsx', 'utf8');
about = about.replace(
  /<span className="text-xs font-mono font-bold uppercase tracking-widest text-editorial-gold">Executive Profile<\/span>/g,
  ''
);
fs.writeFileSync('src/components/AboutSection.tsx', about);

console.log('Removed eyebrows');
