const fs = require('fs');
let code = fs.readFileSync('src/components/BooksSection.tsx', 'utf8');

const target = "      const htmlContent = `";
const endIndex = code.indexOf("      `;", code.indexOf(target));
if (endIndex === -1) {
    console.log("Could not find end of htmlContent string");
} else {
    const oldStr = code.substring(code.indexOf(target), endIndex + 8);
    const replacement = `      const htmlContent = \`
        <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 800px; margin: 0 auto; padding: 20px;">
          <h1 style="font-family: Georgia, serif; font-size: 28px; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 20px;">
            \${activeBookSelected.title}
          </h1>
          <h2 style="font-size: 18px; font-weight: normal; color: #475569; margin-bottom: 30px;">
            Full Index & Synopsis
          </h2>
          
          <div style="margin-bottom: 30px; font-size: 14px; color: #64748b;">
            <p><strong>Author:</strong> Dr. Ibrahim A. Sawaneh</p>
            <p><strong>Publisher:</strong> \${activeBookSelected.publisher}</p>
            <p><strong>ISBN:</strong> \${activeBookSelected.isbn}</p>
          </div>
          
          <h3 style="font-size: 20px; color: #0f172a; margin-bottom: 15px;">Synopsis / Overview</h3>
          <div style="font-size: 14px; line-height: 1.8; color: #334155; margin-bottom: 30px;">
            \${activeBookSelected.synopsis}
          </div>

          <h3 style="font-size: 20px; color: #0f172a; margin-bottom: 15px;">Table of Contents (Full Index)</h3>
          <ul style="font-size: 14px; line-height: 1.8; color: #334155; margin-bottom: 30px; padding-left: 20px;">
            \${activeBookSelected.tableOfContents.map(chapter => \`<li style="margin-bottom: 8px;">\${chapter}</li>\`).join('')}
          </ul>
          
          <div style="padding: 20px; background-color: #f8fafc; border-left: 4px solid #94a3b8; font-size: 14px; line-height: 1.6; color: #475569;">
            <em>Note: This is an automatically generated document for preview purposes. For the full volume, please consult academic retailers or institutional libraries.</em>
          </div>
        </div>
      \`;`;
      
      code = code.replace(oldStr, replacement);
      code = code.replace("{isExportingExcerpt ? 'Generating PDF...' : 'Download Excerpt Chapter'}", "{isExportingExcerpt ? 'Generating PDF...' : 'Download Full Index & Synopsis'}");
      
      fs.writeFileSync('src/components/BooksSection.tsx', code, 'utf8');
      console.log('Successfully patched htmlContent in BooksSection.tsx');
}
