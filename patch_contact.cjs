const fs = require('fs');
let c = fs.readFileSync('src/components/ContactSection.tsx', 'utf8');

c = c.replace(
  "      await saveDocument('messages', newCollab.id, newCollab);\n      setCollabSuccess(true);",
  "      await saveDocument('messages', newCollab.id, newCollab);\n      \n      // Send email notification\n      try {\n        await fetch('/api/notify-admin', {\n          method: 'POST',\n          headers: {\n            'Content-Type': 'application/json',\n          },\n          body: JSON.stringify({\n            type: newCollab.type,\n            email: newCollab.email,\n            org: newCollab.org,\n            proposal: newCollab.proposal\n          }),\n        });\n      } catch (err) {\n        console.error('Failed to send notification email', err);\n      }\n\n      setCollabSuccess(true);"
);

fs.writeFileSync('src/components/ContactSection.tsx', c);
