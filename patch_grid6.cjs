const fs = require('fs');
let s = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');

const regexToReplace = /\{\s*\/\* Academic AI Discovery Hub for publications \*\/\s*\n\s*\{activeModel === 'publications' && \(\s*\n\s*(<div className="border border-editorial-border bg-white p-6 shadow-xs rounded-none">)/;

s = s.replace(regexToReplace, \`{/* Academic AI Discovery Hub for publications */}
          {activeModel === 'publications' && (
            <>
              $1\`);

const regexToReplaceEnd = /\s*\{\/\* Manual Import \/ Export JSON \*\/\}/;
s = s.replace(regexToReplaceEnd, \`
              {/* Manual Import / Export JSON */}\`);

const regexToReplaceEnd2 = /\s*\)\}\s*<\/div>\s*\{\/\* Right Column: Interactive Form Engine/;
s = s.replace(regexToReplaceEnd2, \`
            </>
          )}
        </div>

        {/* Right Column: Interactive Form Engine\`);

fs.writeFileSync('src/components/CMSDashboard.tsx', s);
