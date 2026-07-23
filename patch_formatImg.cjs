const fs = require('fs');

function patchFile(path) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(
    /return \`https:\/\/drive\.google\.com\/uc\?export=view&id=\$\{\w+\[1\]\}\`;/,
    'return \`https://drive.google.com/thumbnail?id=\${driveMatch[1]}&sz=w1000\`;'
  );
  fs.writeFileSync(path, content, 'utf8');
}

patchFile('src/components/CMSDashboard.tsx');
patchFile('src/components/Hero.tsx');
patchFile('src/components/Navbar.tsx');
patchFile('src/components/Footer.tsx');

console.log('Patched all');
