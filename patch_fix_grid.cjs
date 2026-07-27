const fs = require('fs');
let s = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');

const dataManagementRegex = /\s*{\/\* Manual Import \/ Export JSON \*\/}[\s\S]*?Data Management[\s\S]*?<\/div>\s*<\/div>\s*\)\}/;
const match = s.match(dataManagementRegex);

if (match) {
  const dataManagementBlock = match[0];
  s = s.replace(dataManagementBlock, '');
  
  s = s.replace('          {/* Right Column:', dataManagementBlock + '\n          {/* Right Column:');
  
  fs.writeFileSync('src/components/CMSDashboard.tsx', s);
  console.log("Patched successfully");
} else {
  console.log("Could not find the Data Management block");
}
