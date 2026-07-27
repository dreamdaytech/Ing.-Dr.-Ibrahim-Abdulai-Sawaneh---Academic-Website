const fs = require('fs');
let c = fs.readFileSync('src/components/AboutSection.tsx', 'utf8');

const stripHtml = `
const stripHtml = (html: string) => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
};
`;

if (!c.includes("const stripHtml")) {
  c = c.replace(
    "export default function AboutSection({ biographyDetails = BIOGRAPHY_DETAILS, heroInfo = HERO_INFO }: AboutSectionProps) {",
    stripHtml + "\nexport default function AboutSection({ biographyDetails = BIOGRAPHY_DETAILS, heroInfo = HERO_INFO }: AboutSectionProps) {"
  );
}

c = c.replace(
  "            {biographyDetails.longForm.map((paragraph, index) => (\n              <div \n                key={index} \n                className=\"text-base leading-relaxed text-slate-600 mb-5 font-sans prose prose-sm sm:prose-base max-w-none prose-headings:font-serif prose-headings:text-editorial-navy prose-a:text-editorial-gold\"\n                dangerouslySetInnerHTML={{ __html: paragraph }}\n              />\n            ))}",
  "            {biographyDetails.longForm.map((paragraph, index) => (\n              <p \n                key={index} \n                className=\"text-base leading-relaxed text-slate-600 mb-5 font-sans text-justify\"\n              >\n                {stripHtml(paragraph)}\n              </p>\n            ))}"
);

c = c.replace(
  "              <div className=\"text-sm leading-relaxed text-slate-600 relative z-10 font-sans prose prose-sm max-w-none prose-p:my-1\" dangerouslySetInnerHTML={{ __html: biographyDetails.vision }} />",
  "              <p className=\"text-sm leading-relaxed text-slate-600 relative z-10 font-sans text-justify\">\n                {stripHtml(biographyDetails.vision)}\n              </p>"
);

c = c.replace(
  "              <div className=\"text-sm leading-relaxed text-slate-600 relative z-10 font-sans prose prose-sm max-w-none prose-p:my-1\" dangerouslySetInnerHTML={{ __html: biographyDetails.mission }} />",
  "              <p className=\"text-sm leading-relaxed text-slate-600 relative z-10 font-sans text-justify\">\n                {stripHtml(biographyDetails.mission)}\n              </p>"
);

fs.writeFileSync('src/components/AboutSection.tsx', c);
