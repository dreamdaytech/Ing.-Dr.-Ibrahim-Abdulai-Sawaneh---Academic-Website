const fs = require('fs');
let c = fs.readFileSync('src/types.ts', 'utf8');

c = c.replace(
  "  date: string;\n}",
  "  date: string;\n  status?: 'Pending' | 'In Progress' | 'Completed';\n}"
);

fs.writeFileSync('src/types.ts', c);
