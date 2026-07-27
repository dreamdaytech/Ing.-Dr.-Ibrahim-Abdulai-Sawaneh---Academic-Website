const fs = require('fs');

let rs = fs.readFileSync('src/components/ResearchSection.tsx', 'utf8');

rs = rs.replace(
  '<h3 className="font-serif text-sm font-bold text-editorial-navy mb-4 uppercase tracking-wider flex items-center gap-2 border-b border-editorial-border-light pb-2.5">',
  '<h3 className="font-serif text-lg font-bold text-editorial-navy mb-4 flex items-center gap-2 border-b border-editorial-border-light pb-2.5">'
);

rs = rs.replace(
  '<h4 className="font-serif text-sm font-semibold text-editorial-navy uppercase tracking-wide">Data Management</h4>',
  '<h4 className="font-serif text-base font-semibold text-editorial-navy">Data Management</h4>'
);

rs = rs.replace(
  '<h4 className="font-serif text-sm font-semibold text-editorial-navy uppercase tracking-wide">Export Publications</h4>',
  '<h4 className="font-serif text-base font-semibold text-editorial-navy">Export Publications</h4>'
);

rs = rs.replace(
  '<h4 className="font-serif text-sm font-semibold text-editorial-gold uppercase tracking-wide">Need the full CV file?</h4>',
  '<h4 className="font-serif text-base font-semibold text-editorial-gold">Need the full CV file?</h4>'
);

fs.writeFileSync('src/components/ResearchSection.tsx', rs);
console.log('Fixed headings in ResearchSection');
