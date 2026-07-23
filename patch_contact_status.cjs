const fs = require('fs');
let c = fs.readFileSync('src/components/ContactSection.tsx', 'utf8');

c = c.replace(
  "        text: msgText,\n        date: new Date().toISOString()",
  "        text: msgText,\n        date: new Date().toISOString(),\n        status: 'Pending'"
);

c = c.replace(
  "        proposal: collabProposal,\n        date: new Date().toISOString()",
  "        proposal: collabProposal,\n        date: new Date().toISOString(),\n        status: 'Pending'"
);

fs.writeFileSync('src/components/ContactSection.tsx', c);
