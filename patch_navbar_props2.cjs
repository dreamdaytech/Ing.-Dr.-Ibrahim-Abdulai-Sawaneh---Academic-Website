const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

code = code.replace(
  "onSelectBlogPost\n}: NavbarProps) {",
  "onSelectBlogPost,\n  heroInfo = {}\n}: NavbarProps) {"
);

fs.writeFileSync('src/components/Navbar.tsx', code, 'utf8');
console.log('Patched Navbar');
