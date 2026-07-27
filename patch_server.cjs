const fs = require('fs');
let s = fs.readFileSync('server.ts', 'utf8');

s = s.replace(
  "res.json({ success: true, publications });",
  `if (publications.length === 0) {
            console.log("No publications found. Possible Captcha or rate limit.", data);
            return res.status(404).json({ error: "No publications found. The profile might be private, blocked by Google Captcha, or the URL is incorrect." });
          }
          res.json({ success: true, publications });`
);

fs.writeFileSync('server.ts', s);
