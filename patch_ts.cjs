const fs = require('fs');

function patchFile(path, replacer) {
  let content = fs.readFileSync(path, 'utf8');
  content = replacer(content);
  fs.writeFileSync(path, content);
}

patchFile('src/types.ts', c => {
  if(!c.includes('logoUrl?')) {
    return c.replace(/address\?: string;/, 'address?: string;\n  logoUrl?: string;\n  heroUrl?: string;');
  }
  return c;
});
