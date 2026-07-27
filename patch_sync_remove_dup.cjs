const fs = require('fs');
let s = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');

const regexToRemove = /\s*const \[isSyncingDirect, setIsSyncingDirect\] = useState\(false\);[\s\S]*?setIsSyncingDirect\(false\);\s*\}\s*\};\s*/;
// Replace only the first occurrence
s = s.replace(regexToRemove, '\n');

fs.writeFileSync('src/components/CMSDashboard.tsx', s);
