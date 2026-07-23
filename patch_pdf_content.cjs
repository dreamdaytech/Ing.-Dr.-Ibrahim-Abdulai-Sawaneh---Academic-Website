const fs = require('fs');
let code = fs.readFileSync('src/components/BooksSection.tsx', 'utf8');

const oldHtml = `          <h3 style="font-size: 16pt; font-weight: bold; color: #0f172a; margin-top: 30px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
            Table of Contents (Full Index)
          </h3>
          <ul style="font-size: 12pt; line-height: 1.8; color: #111; margin-bottom: 40px; padding-left: 20px;">
            \${activeBookSelected.tableOfContents.map(chapter => \`<li style="margin-bottom: 10px;">\${chapter}</li>\`).join('')}
          </ul>
          
          <div style="margin-top: 50px; padding: 20px; font-size: 10pt; line-height: 1.5; color: #555; border-top: 1px solid #ccc; text-align: center;">`;

const newHtml = `          <h3 style="font-size: 16pt; font-weight: bold; color: #0f172a; margin-top: 30px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
            Why This Study Matters
          </h3>
          <div style="font-size: 12pt; line-height: 1.8; color: #111; margin-bottom: 40px; text-align: justify; font-style: italic; background-color: #fbfbf9; padding: 15px; border-left: 4px solid #b89b5e;">
            \${activeBookSelected.whyItMatters}
          </div>

          <h3 style="font-size: 16pt; font-weight: bold; color: #0f172a; margin-top: 30px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
            Table of Contents (Full Index)
          </h3>
          <ul style="font-size: 12pt; line-height: 1.8; color: #111; margin-bottom: 40px; padding-left: 20px;">
            \${activeBookSelected.tableOfContents.map(chapter => \`<li style="margin-bottom: 10px;">\${chapter}</li>\`).join('')}
          </ul>
          
          \${activeBookSelected.reviews && activeBookSelected.reviews.length > 0 ? \`
            <h3 style="font-size: 16pt; font-weight: bold; color: #0f172a; margin-top: 30px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
              Scholarly Endorsements & Reviews
            </h3>
            <div style="margin-bottom: 40px;">
              \${activeBookSelected.reviews.map(review => \`
                <blockquote style="margin: 0 0 20px 0; padding: 15px 20px; background-color: #f8fafc; border-left: 4px solid #94a3b8;">
                  <p style="font-size: 12pt; font-style: italic; color: #334155; margin-bottom: 10px;">"\${review.text}"</p>
                  <footer style="font-size: 10pt; color: #64748b; font-family: monospace; text-transform: uppercase;">
                    <strong>\${review.author}</strong>, \${review.role}
                  </footer>
                </blockquote>
              \`).join('')}
            </div>
          \` : ''}

          <div style="margin-top: 50px; padding: 20px; font-size: 10pt; line-height: 1.5; color: #555; border-top: 1px solid #ccc; text-align: center;">`;

if (code.includes(oldHtml)) {
    code = code.replace(oldHtml, newHtml);
    fs.writeFileSync('src/components/BooksSection.tsx', code, 'utf8');
    console.log("Replaced template successfully");
} else {
    console.log("Could not find oldHtml in file");
}
