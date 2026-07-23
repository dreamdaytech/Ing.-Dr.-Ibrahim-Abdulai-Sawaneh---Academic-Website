const fs = require('fs');
let c = fs.readFileSync('server.ts', 'utf8');

c = c.replace(
  "  // API route to discover\n academic publications using web/Scholar search grounding",
  "  // API route to discover academic publications using web/Scholar search grounding"
);
fs.writeFileSync('server.ts', c);
