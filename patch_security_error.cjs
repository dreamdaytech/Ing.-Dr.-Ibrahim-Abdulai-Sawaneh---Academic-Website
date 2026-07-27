const fs = require('fs');
let c = fs.readFileSync('src/components/ContactSection.tsx', 'utf8');

c = c.replace(
  "  const [collabSecurity, setCollabSecurity] = useState('');",
  "  const [collabSecurity, setCollabSecurity] = useState('');\n  const [msgSecurityError, setMsgSecurityError] = useState('');\n  const [collabSecurityError, setCollabSecurityError] = useState('');"
);

c = c.replace(
  "    setMsgSecurity('');\n    setCollabSecurity('');",
  "    setMsgSecurity('');\n    setCollabSecurity('');\n    setMsgSecurityError('');\n    setCollabSecurityError('');"
);

c = c.replace(
  "    if (parseInt(msgSecurity) !== num1 + num2) {\n      alert(\"Security challenge failed. Please check your math.\");\n      return;\n    }",
  "    if (parseInt(msgSecurity) !== num1 + num2) {\n      setMsgSecurityError(\"Security challenge failed. Please check your math.\");\n      return;\n    }\n    setMsgSecurityError('');"
);

c = c.replace(
  "    if (parseInt(collabSecurity) !== num1 + num2) {\n      alert(\"Security challenge failed. Please check your math.\");\n      return;\n    }",
  "    if (parseInt(collabSecurity) !== num1 + num2) {\n      setCollabSecurityError(\"Security challenge failed. Please check your math.\");\n      return;\n    }\n    setCollabSecurityError('');"
);

c = c.replace(
  "                        className=\"w-full p-2.5 border border-editorial-border rounded-none focus:outline-none focus:ring-1 focus:ring-editorial-navy bg-[#FBFBF9]\"\n                      />\n                    </div>\n\n                    <button\n                      type=\"submit\"\n                      disabled={isSubmittingMsg}",
  "                        className=\"w-full p-2.5 border border-editorial-border rounded-none focus:outline-none focus:ring-1 focus:ring-editorial-navy bg-[#FBFBF9]\"\n                      />\n                      {msgSecurityError && <p className=\"text-red-500 text-xs mt-1\">{msgSecurityError}</p>}\n                    </div>\n\n                    <button\n                      type=\"submit\"\n                      disabled={isSubmittingMsg}"
);

c = c.replace(
  "                        className=\"w-full p-2.5 border border-editorial-border rounded-none focus:outline-none focus:ring-1 focus:ring-editorial-navy bg-[#FBFBF9]\"\n                      />\n                    </div>\n\n                    <button\n                      type=\"submit\"\n                      disabled={isSubmittingCollab}",
  "                        className=\"w-full p-2.5 border border-editorial-border rounded-none focus:outline-none focus:ring-1 focus:ring-editorial-navy bg-[#FBFBF9]\"\n                      />\n                      {collabSecurityError && <p className=\"text-red-500 text-xs mt-1\">{collabSecurityError}</p>}\n                    </div>\n\n                    <button\n                      type=\"submit\"\n                      disabled={isSubmittingCollab}"
);

fs.writeFileSync('src/components/ContactSection.tsx', c);
