const fs = require('fs');
let c = fs.readFileSync('src/App.tsx', 'utf8');

const stripHtml = `
const stripHtml = (html: string) => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
};
`;

if (!c.includes("const stripHtml")) {
  c = c.replace(
    "export default function App() {",
    stripHtml + "\nexport default function App() {"
  );
}

c = c.replace(
  "            <div \n              className=\"text-base text-slate-600 leading-relaxed font-sans space-y-4\" \n              dangerouslySetInnerHTML={{ __html: dynamicBiographyDetails.longForm && dynamicBiographyDetails.longForm[0] ? dynamicBiographyDetails.longForm[0] : BIOGRAPHY_DETAILS.longForm[0] }}\n            />\n            <div \n              className=\"text-base text-slate-600 leading-relaxed font-sans space-y-4\" \n              dangerouslySetInnerHTML={{ __html: dynamicBiographyDetails.longForm && dynamicBiographyDetails.longForm[1] ? dynamicBiographyDetails.longForm[1] : BIOGRAPHY_DETAILS.longForm[1] }}\n            />",
  "            <p className=\"text-base text-slate-600 leading-relaxed font-sans text-justify\">\n              {stripHtml(dynamicBiographyDetails.longForm && dynamicBiographyDetails.longForm[0] ? dynamicBiographyDetails.longForm[0] : BIOGRAPHY_DETAILS.longForm[0])}\n            </p>\n            <p className=\"text-base text-slate-600 leading-relaxed font-sans text-justify\">\n              {stripHtml(dynamicBiographyDetails.longForm && dynamicBiographyDetails.longForm[1] ? dynamicBiographyDetails.longForm[1] : BIOGRAPHY_DETAILS.longForm[1])}\n            </p>"
);

fs.writeFileSync('src/App.tsx', c);
