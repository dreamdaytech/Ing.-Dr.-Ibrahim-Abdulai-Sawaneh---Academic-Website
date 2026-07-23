const fs = require('fs');

function patchFile(file, importStatement, oldSrc, newSrc) {
  let code = fs.readFileSync(file, 'utf8');
  if (!code.includes(importStatement)) {
    // Add import after first line
    const lines = code.split('\n');
    lines.splice(1, 0, importStatement);
    code = lines.join('\n');
  }
  code = code.replace(oldSrc, newSrc);
  fs.writeFileSync(file, code, 'utf8');
  console.log('Patched ' + file);
}

patchFile('src/components/Navbar.tsx', "import logoImg from '../assets/logo.png';", 'src="/logo.png"', 'src={logoImg}');
patchFile('src/components/Footer.tsx', "import logoImg from '../assets/logo.png';", 'src="/logo.png"', 'src={logoImg}');
patchFile('src/components/Hero.tsx', "import heroImg from '../assets/hero.jpg';", 'src="/hero.jpg"', 'src={heroImg}');
