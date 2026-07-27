const fs = require('fs');
let s = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');
s = s.replace(
  "body: JSON.stringify({ url: 'https://scholar.google.com/citations?view_op=list_works&hl=en&hl=en&user=FFFjTA0AAAAJ' })",
  "body: JSON.stringify({ url: 'https://scholar.google.com/citations?view_op=list_works&hl=en&hl=en&user=FFFjTA0AAAAJ&cstart=0&pagesize=100' })"
);
fs.writeFileSync('src/components/CMSDashboard.tsx', s);
