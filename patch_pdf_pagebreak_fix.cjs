const fs = require('fs');
let code = fs.readFileSync('src/components/BooksSection.tsx', 'utf8');

const target = `        pagebreak:    { mode: 'avoid-all', before: '.page-break' }`;
const replacement = `        pagebreak:    { mode: ['css', 'legacy'] }`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('src/components/BooksSection.tsx', code, 'utf8');
    console.log("Fixed pagebreak mode");
} else {
    console.log("Could not find pagebreak definition");
}
