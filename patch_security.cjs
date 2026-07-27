const fs = require('fs');
let c = fs.readFileSync('src/components/ContactSection.tsx', 'utf8');

// 1. Add state and effect
c = c.replace(
  "  const [isSubmittingCollab, setIsSubmittingCollab] = useState(false);",
  "  const [isSubmittingCollab, setIsSubmittingCollab] = useState(false);\n\n  // Security challenge state\n  const [num1, setNum1] = useState(0);\n  const [num2, setNum2] = useState(0);\n  const [msgSecurity, setMsgSecurity] = useState('');\n  const [collabSecurity, setCollabSecurity] = useState('');\n\n  React.useEffect(() => {\n    generateChallenge();\n  }, [activeForm]);\n\n  const generateChallenge = () => {\n    setNum1(Math.floor(Math.random() * 10) + 1);\n    setNum2(Math.floor(Math.random() * 10) + 1);\n    setMsgSecurity('');\n    setCollabSecurity('');\n  };"
);

// 2. msg submit
c = c.replace(
  "    if (!msgName || !msgEmail || !msgText) return;",
  "    if (!msgName || !msgEmail || !msgText) return;\n    if (parseInt(msgSecurity) !== num1 + num2) {\n      alert(\"Security challenge failed. Please check your math.\");\n      return;\n    }"
);

// 3. collab submit
c = c.replace(
  "    if (!collabEmail || !collabProposal) return;",
  "    if (!collabEmail || !collabProposal) return;\n    if (parseInt(collabSecurity) !== num1 + num2) {\n      alert(\"Security challenge failed. Please check your math.\");\n      return;\n    }"
);

// 4. msg reset
c = c.replace(
  "        setMsgText('');\n      }, 3500);",
  "        setMsgText('');\n        generateChallenge();\n      }, 3500);"
);

// 5. collab reset
c = c.replace(
  "        setCollabProposal('');\n      }, 3500);",
  "        setCollabProposal('');\n        generateChallenge();\n      }, 3500);"
);

// 6. msg field
c = c.replace(
  "                      />\n                    </div>\n\n                    <button",
  "                      />\n                    </div>\n\n                    <div className=\"pt-2 border-t border-editorial-border-light\">\n                      <label className=\"block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold\">Security Question: What is {num1} + {num2}? *</label>\n                      <input\n                        type=\"text\"\n                        required\n                        placeholder=\"Enter the sum\"\n                        value={msgSecurity}\n                        onChange={(e) => setMsgSecurity(e.target.value)}\n                        className=\"w-full p-2.5 border border-editorial-border rounded-none focus:outline-none focus:ring-1 focus:ring-editorial-navy bg-[#FBFBF9]\"\n                      />\n                    </div>\n\n                    <button"
);

// 7. collab field
c = c.replace(
  "                      />\n                    </div>\n\n                    <button",
  "                      />\n                    </div>\n\n                    <div className=\"pt-2 border-t border-editorial-border-light\">\n                      <label className=\"block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold\">Security Question: What is {num1} + {num2}? *</label>\n                      <input\n                        type=\"text\"\n                        required\n                        placeholder=\"Enter the sum\"\n                        value={collabSecurity}\n                        onChange={(e) => setCollabSecurity(e.target.value)}\n                        className=\"w-full p-2.5 border border-editorial-border rounded-none focus:outline-none focus:ring-1 focus:ring-editorial-navy bg-[#FBFBF9]\"\n                      />\n                    </div>\n\n                    <button"
);


fs.writeFileSync('src/components/ContactSection.tsx', c);
