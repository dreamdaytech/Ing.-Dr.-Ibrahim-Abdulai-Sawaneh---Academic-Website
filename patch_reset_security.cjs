const fs = require('fs');
let c = fs.readFileSync('src/components/ContactSection.tsx', 'utf8');

c = c.replace(
  "    if (parseInt(msgSecurity) !== num1 + num2) {\n      setMsgSecurityError(\"Security challenge failed. Please check your math.\");\n      return;\n    }",
  "    if (parseInt(msgSecurity) !== num1 + num2) {\n      setMsgSecurityError(\"Security challenge failed. Please check your math.\");\n      generateChallenge();\n      return;\n    }"
);

c = c.replace(
  "    if (parseInt(collabSecurity) !== num1 + num2) {\n      setCollabSecurityError(\"Security challenge failed. Please check your math.\");\n      return;\n    }",
  "    if (parseInt(collabSecurity) !== num1 + num2) {\n      setCollabSecurityError(\"Security challenge failed. Please check your math.\");\n      generateChallenge();\n      return;\n    }"
);

fs.writeFileSync('src/components/ContactSection.tsx', c);
