const fs = require('fs');
let c = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');

c = c.replace(
  "const [messages, setMessages] = useState<Message[]>([]);",
  "const [messages, setMessages] = useState<Message[]>([]);\n  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);"
);

c = c.replace(
  "else if (activeModel === 'galleryCategories') {\n      setTitle(item.name || '');\n    }",
  "else if (activeModel === 'galleryCategories') {\n      setTitle(item.name || '');\n    } else if (activeModel === 'messages') {\n      setSelectedMessage(item);\n    }"
);

c = c.replace(
  "setDeleteConfirmId(null);\n    setTitle('');\n    setSubtitle('');",
  "setDeleteConfirmId(null);\n    setSelectedMessage(null);\n    setTitle('');\n    setSubtitle('');"
); // well wait, maybe just manually set setSelectedMessage(null) in clearForm

fs.writeFileSync('src/components/CMSDashboard.tsx', c);
