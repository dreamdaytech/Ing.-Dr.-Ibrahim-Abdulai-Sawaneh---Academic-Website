const fs = require('fs');
let code = fs.readFileSync('src/components/BooksSection.tsx', 'utf8');

const oldHtml = `      const htmlContent = \`
        <div style="padding: 40px; font-family: 'Times New Roman', Times, serif; color: #000; max-width: 800px; margin: 0 auto; background: #fff;">`;

const newHtml = `      const htmlContent = \`
        <div style="padding: 20px; font-family: 'Times New Roman', Times, serif; color: #000; max-width: 800px; margin: 0 auto; background: #fff;">
          <style>
            p { margin-bottom: 15px; }
            ul, ol { margin-bottom: 15px; padding-left: 20px; }
            li { margin-bottom: 5px; }
            h1, h2, h3, h4, h5, h6 { margin-top: 20px; margin-bottom: 10px; color: #0f172a; }
            strong, b { font-weight: bold; }
            em, i { font-style: italic; }
          </style>`;

if (code.includes(oldHtml)) {
    code = code.replace(oldHtml, newHtml);
    fs.writeFileSync('src/components/BooksSection.tsx', code, 'utf8');
    console.log("Added <style> block");
} else {
    console.log("Could not find oldHtml");
}
