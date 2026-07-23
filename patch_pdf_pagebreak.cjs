const fs = require('fs');
let code = fs.readFileSync('src/components/BooksSection.tsx', 'utf8');

const target = `      const opt = {
        margin:       1,
        filename:     \`excerpt_\${activeBookSelected.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf\`,
        image:        { type: 'jpeg' as const, quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, logging: false },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' as const }
      };`;

const replacement = `      const opt = {
        margin:       0.75,
        filename:     \`excerpt_\${activeBookSelected.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf\`,
        image:        { type: 'jpeg' as const, quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, logging: false },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' as const },
        pagebreak:    { mode: 'avoid-all', before: '.page-break' }
      };`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('src/components/BooksSection.tsx', code, 'utf8');
    console.log("Added pagebreak to opt");
} else {
    console.log("Could not find opt definition");
}
