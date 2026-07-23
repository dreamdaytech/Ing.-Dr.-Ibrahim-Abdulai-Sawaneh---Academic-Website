const fs = require('fs');
let c = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');

c = c.replace(
  "case 'galleryCategories': return galleryCategories.map(c => ({ ...c, title: c.name }));",
  "case 'galleryCategories': return galleryCategories.map(c => ({ ...c, title: c.name }));\n      case 'messages': return messages.map(m => ({ ...m, title: `${m.type}: ${m.subject || m.name || m.org || 'Unknown'}` }));"
);

fs.writeFileSync('src/components/CMSDashboard.tsx', c);
