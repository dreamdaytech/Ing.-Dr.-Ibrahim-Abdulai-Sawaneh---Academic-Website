const fs = require('fs');
let code = fs.readFileSync('src/components/BooksSection.tsx', 'utf8');

const target = `            li { margin-bottom: 5px; }`;
const replacement = `            li { margin-bottom: 5px; page-break-inside: avoid; }
            p { margin-bottom: 15px; page-break-inside: avoid; }
            h1, h2, h3, h4, h5, h6 { page-break-after: avoid; }`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('src/components/BooksSection.tsx', code, 'utf8');
    console.log("Added page-break CSS");
} else {
    console.log("Could not find style target");
}
