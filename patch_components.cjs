const fs = require('fs');

function patchAbout() {
  let c = fs.readFileSync('src/components/AboutSection.tsx', 'utf8');
  c = c.replace(/HERO_INFO\.researchGate/g, "heroInfo.researchGate")
       .replace(/HERO_INFO\.orcid/g, "heroInfo.orcid")
       .replace(/HERO_INFO\.googleScholar/g, "heroInfo.googleScholar");
  fs.writeFileSync('src/components/AboutSection.tsx', c);
}

function patchCV() {
  let c = fs.readFileSync('src/components/CVSection.tsx', 'utf8');
  c = c.replace(/export default function CVSection\(\{(.*?)\}\)/, 'interface CVSectionProps {\n  timelineItems?: typeof TIMELINE_EXPERIENCE;\n  heroInfo?: typeof HERO_INFO;\n}\n\nexport default function CVSection({ timelineItems = TIMELINE_EXPERIENCE, heroInfo = HERO_INFO }: CVSectionProps)');
  c = c.replace(/HERO_INFO\./g, "heroInfo.");
  fs.writeFileSync('src/components/CVSection.tsx', c);
}

function patchContact() {
  let c = fs.readFileSync('src/components/ContactSection.tsx', 'utf8');
  if(!c.includes('interface ContactSectionProps')) {
      c = c.replace(/export default function ContactSection\(\)/, 'interface ContactSectionProps {\n  heroInfo?: typeof HERO_INFO;\n}\n\nexport default function ContactSection({ heroInfo = HERO_INFO }: ContactSectionProps)');
      c = c.replace(/HERO_INFO\./g, "heroInfo.");
      fs.writeFileSync('src/components/ContactSection.tsx', c);
  }
}

function patchFooter() {
  let c = fs.readFileSync('src/components/Footer.tsx', 'utf8');
  c = c.replace(/HERO_INFO\./g, "heroInfo?.");
  fs.writeFileSync('src/components/Footer.tsx', c);
}

function patchApp() {
  let c = fs.readFileSync('src/App.tsx', 'utf8');
  c = c.replace(/<CVSection timelineItems=\{dynamicTimelineItems\} \/>/g, '<CVSection timelineItems={dynamicTimelineItems} heroInfo={dynamicHeroInfo} />');
  c = c.replace(/<ContactSection \/>/g, '<ContactSection heroInfo={dynamicHeroInfo} />');
  // ensure others use it too
  fs.writeFileSync('src/App.tsx', c);
}

patchAbout();
patchCV();
patchContact();
patchFooter();
patchApp();

console.log("Patched successfully.");
