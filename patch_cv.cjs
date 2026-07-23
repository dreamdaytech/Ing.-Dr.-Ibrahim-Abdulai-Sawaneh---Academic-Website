const fs = require('fs');
let c = fs.readFileSync('src/components/CVSection.tsx', 'utf8');

// If interface already exists, let's just replace it entirely.
c = c.replace(/interface CVSectionProps \{[\s\S]*?export default function CVSection\([^)]*\)\s*\{/, 
`interface CVSectionProps {
  timelineItems?: TimelineItem[];
  heroInfo?: typeof HERO_INFO;
}

export default function CVSection({ timelineItems = TIMELINE_EXPERIENCE, heroInfo = HERO_INFO }: CVSectionProps) {`);

fs.writeFileSync('src/components/CVSection.tsx', c);
console.log("Patched CVSection");
