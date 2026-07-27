const fs = require('fs');
const glob = require('glob');

function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // For h3 with text-sm
  content = content.replace(/<h3([^>]*)className="([^"]*)text-sm([^"]*)"/g, '<h3$1className="$2text-lg$3"');
  // Remove uppercase tracking-widest from h3 if we are making them actual structural headings, but actually some might be labels. Let's just bump the size for legibility and remove uppercase if it's there to prevent eyebrows.
  content = content.replace(/<h3([^>]*)className="([^"]*)uppercase tracking-wide(st|r)([^"]*)"/g, '<h3$1className="$2$4"');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated h3 in ${file}`);
  }
}

glob.sync('src/**/*.tsx').forEach(processFile);

