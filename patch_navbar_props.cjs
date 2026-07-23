const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

if (!code.includes('heroInfo?: any;')) {
  code = code.replace(
    "onSelectBlogPost?: (id: string | null) => void;\n}",
    "onSelectBlogPost?: (id: string | null) => void;\n  heroInfo?: any;\n}"
  );
}

if (!code.includes('heroInfo = {}')) {
  code = code.replace(
    "onSelectBlogPost = () => {}\n}: NavbarProps) {",
    "onSelectBlogPost = () => {},\n  heroInfo = {}\n}: NavbarProps) {"
  );
}

fs.writeFileSync('src/components/Navbar.tsx', code, 'utf8');
console.log('Patched Navbar');
