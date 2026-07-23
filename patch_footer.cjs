const fs = require('fs');

// 1. Patch Footer.tsx
let footerCode = fs.readFileSync('src/components/Footer.tsx', 'utf8');

footerCode = footerCode.replace(
  "interface FooterProps {\n  setActiveTab: (tab: string) => void;\n}",
  "interface FooterProps {\n  setActiveTab: (tab: string) => void;\n  heroInfo?: any;\n}"
);

footerCode = footerCode.replace(
  "export default function Footer({ setActiveTab }: FooterProps)",
  "export default function Footer({ setActiveTab, heroInfo = {} }: FooterProps)"
);

footerCode = footerCode.replace(
  'src={logoImg}',
  'src={heroInfo?.logoUrl || logoImg}'
);

fs.writeFileSync('src/components/Footer.tsx', footerCode, 'utf8');

// 2. Patch App.tsx
let appCode = fs.readFileSync('src/App.tsx', 'utf8');

appCode = appCode.replace(
  "<Footer setActiveTab={setActiveTab} />",
  "<Footer setActiveTab={setActiveTab} heroInfo={dynamicHeroInfo} />"
);

fs.writeFileSync('src/App.tsx', appCode, 'utf8');

console.log('Patched Footer and App');
