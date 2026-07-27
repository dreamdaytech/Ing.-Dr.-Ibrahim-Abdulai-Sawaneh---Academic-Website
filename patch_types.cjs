const fs = require('fs');
let s = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');

s = s.replace(
  "const promises = data.publications.map((pub) => saveDocument('publications', pub.id || `pub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, pub));",
  "const promises = data.publications.map((pub: any) => saveDocument('publications', pub.id || `pub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, pub));"
);

s = s.replace(
  "setPublications(fetched.length > 0 ? (fetched) : PUBLICATIONS);",
  "setPublications(fetched.length > 0 ? (fetched as any) : PUBLICATIONS);"
);

fs.writeFileSync('src/components/CMSDashboard.tsx', s);
