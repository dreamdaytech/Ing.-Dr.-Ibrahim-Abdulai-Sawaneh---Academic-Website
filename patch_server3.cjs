const fs = require('fs');
let c = fs.readFileSync('server.ts', 'utf8');

c = c.replace(
  "// API route to discover, async (req, res) => {",
  "  app.post(\"/api/notify-admin\", async (req, res) => {"
);
fs.writeFileSync('server.ts', c);
