const fs = require('fs');
let c = fs.readFileSync('src/App.tsx', 'utf8');

c = c.replace(
  "            <p className=\"text-base text-slate-600 leading-relaxed font-sans text-justify\">\n              {stripHtml(dynamicBiographyDetails.longForm && dynamicBiographyDetails.longForm[0] ? dynamicBiographyDetails.longForm[0] : BIOGRAPHY_DETAILS.longForm[0])}\n            </p>\n            <p className=\"text-base text-slate-600 leading-relaxed font-sans text-justify\">\n              {stripHtml(dynamicBiographyDetails.longForm && dynamicBiographyDetails.longForm[1] ? dynamicBiographyDetails.longForm[1] : BIOGRAPHY_DETAILS.longForm[1])}\n            </p>",
  "            <div \n              className=\"text-base text-slate-600 leading-relaxed font-sans text-justify prose prose-sm max-w-none prose-p:mb-4 line-clamp-6\"\n              dangerouslySetInnerHTML={{ \n                __html: dynamicBiographyDetails.longForm ? dynamicBiographyDetails.longForm.join(' ') : BIOGRAPHY_DETAILS.longForm.join(' ') \n              }}\n            />"
);

fs.writeFileSync('src/App.tsx', c);
