const fs = require('fs');
let c = fs.readFileSync('src/components/Footer.tsx', 'utf8');

c = c.replace(/export default function Footer\(\{ setActiveTab, heroInfo = \{\} \}: FooterProps\) \{/, 
`export default function Footer({ setActiveTab, heroInfo = HERO_INFO }: FooterProps) {`);

fs.writeFileSync('src/components/Footer.tsx', c);
