const fs = require('fs');
let s = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');

// replace the start
s = s.replace(
  "{activeModel === 'publications' && (\n            <div className=\"border border-editorial-border bg-white p-6 shadow-xs rounded-none\">",
  "{activeModel === 'publications' && (\n            <>\n              <div className=\"border border-editorial-border bg-white p-6 shadow-xs rounded-none\">"
);

// replace the end
s = s.replace(
  "              </div>\n            )}\n\n          )}\n        </div>",
  "              </div>\n            </>\n          )}\n        </div>"
);

fs.writeFileSync('src/components/CMSDashboard.tsx', s);
