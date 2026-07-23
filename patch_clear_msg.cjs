const fs = require('fs');
let c = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');

c = c.replace(
  "setEditingId(null);",
  "setEditingId(null);\n    setSelectedMessage(null);"
);

fs.writeFileSync('src/components/CMSDashboard.tsx', c);
