const fs = require('fs');
let c = fs.readFileSync('src/components/AboutSection.tsx', 'utf8');

c = c.replace(
  "            {biographyDetails.longForm.map((paragraph, index) => (\n              <p \n                key={index} \n                className=\"text-base leading-relaxed text-slate-600 mb-5 font-sans text-justify\"\n              >\n                {stripHtml(paragraph)}\n              </p>\n            ))}",
  "            <div \n              className=\"text-base leading-relaxed text-slate-600 mb-5 font-sans text-justify prose prose-sm sm:prose-base max-w-none prose-headings:font-serif prose-headings:text-editorial-navy prose-a:text-editorial-gold prose-p:mb-5\"\n              dangerouslySetInnerHTML={{ __html: biographyDetails.longForm.join(' ') }}\n            />"
);

c = c.replace(
  "              <p className=\"text-sm leading-relaxed text-slate-600 relative z-10 font-sans text-justify\">\n                {stripHtml(biographyDetails.vision)}\n              </p>",
  "              <div className=\"text-sm leading-relaxed text-slate-600 relative z-10 font-sans text-justify prose prose-sm max-w-none prose-p:my-1\" dangerouslySetInnerHTML={{ __html: biographyDetails.vision }} />"
);

c = c.replace(
  "              <p className=\"text-sm leading-relaxed text-slate-600 relative z-10 font-sans text-justify\">\n                {stripHtml(biographyDetails.mission)}\n              </p>",
  "              <div className=\"text-sm leading-relaxed text-slate-600 relative z-10 font-sans text-justify prose prose-sm max-w-none prose-p:my-1\" dangerouslySetInnerHTML={{ __html: biographyDetails.mission }} />"
);

fs.writeFileSync('src/components/AboutSection.tsx', c);
