const fs = require('fs');
let c = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');

c = c.replace(
  "const [isUploadingImg, setIsUploadingImg] = useState(false);",
  "const [isUploadingImg, setIsUploadingImg] = useState(false);\n  const [isSaving, setIsSaving] = useState(false);"
);

c = c.replace(
  "const handleFormSubmit = async (e: React.FormEvent) => {\n    e.preventDefault();\n    try {",
  "const handleFormSubmit = async (e: React.FormEvent) => {\n    e.preventDefault();\n    setIsSaving(true);\n    try {"
);

c = c.replace(
  "setTimeout(() => setSuccessMsg(false), 3000);\n    } catch (error) {",
  "setTimeout(() => setSuccessMsg(false), 3000);\n    } catch (error) {"
); // Not modifying this, let's just use regex

fs.writeFileSync('src/components/CMSDashboard.tsx', c);
