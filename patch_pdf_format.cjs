const fs = require('fs');
let code = fs.readFileSync('src/components/BooksSection.tsx', 'utf8');

const target = "      const htmlContent = `";
const endIndex = code.indexOf("      `;", code.indexOf(target));
if (endIndex === -1) {
    console.log("Could not find end of htmlContent string");
} else {
    const oldStr = code.substring(code.indexOf(target), endIndex + 8);
    const replacement = `      const htmlContent = \`
        <div style="padding: 40px; font-family: 'Times New Roman', Times, serif; color: #000; max-width: 800px; margin: 0 auto; background: #fff;">
          <h1 style="font-size: 24pt; font-weight: bold; text-align: center; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 10px;">
            \${activeBookSelected.title}
          </h1>
          <h2 style="font-size: 16pt; font-weight: normal; text-align: center; color: #475569; margin-bottom: 30px;">
            Full Index & Synopsis
          </h2>
          
          <div style="margin-bottom: 30px; font-size: 12pt; color: #333; text-align: center; border-bottom: 1px solid #eee; padding-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Author:</strong> Dr. Ibrahim A. Sawaneh</p>
            <p style="margin: 5px 0;"><strong>Publisher:</strong> \${activeBookSelected.publisher}</p>
            <p style="margin: 5px 0;"><strong>ISBN:</strong> \${activeBookSelected.isbn}</p>
          </div>
          
          <h3 style="font-size: 16pt; font-weight: bold; color: #0f172a; margin-top: 30px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
            Synopsis / Overview
          </h3>
          <div style="font-size: 12pt; line-height: 1.8; color: #111; margin-bottom: 40px; text-align: justify;">
            \${activeBookSelected.synopsis}
          </div>

          <h3 style="font-size: 16pt; font-weight: bold; color: #0f172a; margin-top: 30px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
            Table of Contents (Full Index)
          </h3>
          <ul style="font-size: 12pt; line-height: 1.8; color: #111; margin-bottom: 40px; padding-left: 20px;">
            \${activeBookSelected.tableOfContents.map(chapter => \`<li style="margin-bottom: 10px;">\${chapter}</li>\`).join('')}
          </ul>
          
          <div style="margin-top: 50px; padding: 20px; font-size: 10pt; line-height: 1.5; color: #555; border-top: 1px solid #ccc; text-align: center;">
            <em>Note: This is an automatically generated document for preview purposes.<br/>For the full volume, please consult academic retailers or institutional libraries.</em>
          </div>
        </div>
      \`;`;
      
      code = code.replace(oldStr, replacement);
      fs.writeFileSync('src/components/BooksSection.tsx', code, 'utf8');
      console.log('Successfully patched htmlContent in BooksSection.tsx');
}
