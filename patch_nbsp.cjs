const fs = require('fs');

// Patch App.tsx
let appStr = fs.readFileSync('src/App.tsx', 'utf8');
appStr = appStr.replace(
  "__html: dynamicBiographyDetails.longForm ? dynamicBiographyDetails.longForm.join(' ') : BIOGRAPHY_DETAILS.longForm.join(' ')",
  "__html: (dynamicBiographyDetails.longForm ? dynamicBiographyDetails.longForm.join(' ') : BIOGRAPHY_DETAILS.longForm.join(' ')).replace(/&nbsp;/g, ' ')"
);
fs.writeFileSync('src/App.tsx', appStr);

// Patch AboutSection.tsx
let aboutStr = fs.readFileSync('src/components/AboutSection.tsx', 'utf8');
aboutStr = aboutStr.replace(
  "dangerouslySetInnerHTML={{ __html: biographyDetails.longForm.join(' ') }}",
  "dangerouslySetInnerHTML={{ __html: biographyDetails.longForm.join(' ').replace(/&nbsp;/g, ' ') }}"
);
aboutStr = aboutStr.replace(
  "dangerouslySetInnerHTML={{ __html: biographyDetails.vision }}",
  "dangerouslySetInnerHTML={{ __html: biographyDetails.vision.replace(/&nbsp;/g, ' ') }}"
);
aboutStr = aboutStr.replace(
  "dangerouslySetInnerHTML={{ __html: biographyDetails.mission }}",
  "dangerouslySetInnerHTML={{ __html: biographyDetails.mission.replace(/&nbsp;/g, ' ') }}"
);
fs.writeFileSync('src/components/AboutSection.tsx', aboutStr);

