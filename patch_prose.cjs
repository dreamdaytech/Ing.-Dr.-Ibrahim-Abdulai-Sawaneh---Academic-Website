const fs = require('fs');
const glob = require('glob');

function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace 'prose-sm sm:prose-base' with 'prose-base'
  content = content.replace(/prose-sm sm:prose-base/g, 'prose-base');
  
  // Replace remaining 'prose-sm' with 'prose-base'
  content = content.replace(/prose-sm/g, 'prose-base');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated prose in ${file}`);
  }
}

glob.sync('src/**/*.tsx').forEach(processFile);

