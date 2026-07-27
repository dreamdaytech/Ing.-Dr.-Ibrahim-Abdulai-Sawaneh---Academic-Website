const fs = require('fs');
let s = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');

s = s.replace("{activeModel === 'publications' && (\n              <div className=\"border border-editorial-border bg-white p-6 shadow-xs rounded-none mt-6\">",
              "<div className=\"border border-editorial-border bg-white p-6 shadow-xs rounded-none mt-6\">");

fs.writeFileSync('src/components/CMSDashboard.tsx', s);
