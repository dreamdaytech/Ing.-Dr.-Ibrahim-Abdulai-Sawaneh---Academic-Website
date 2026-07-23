const fs = require('fs');
let c = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');

c = c.replace(
  "else if (activeModel === 'galleryCategories') {\n        await deleteDocument('galleryCategories', id);\n        setGalleryCategories(galleryCategories.filter(c => c.id !== id));\n      }",
  "else if (activeModel === 'galleryCategories') {\n        await deleteDocument('galleryCategories', id);\n        setGalleryCategories(galleryCategories.filter(c => c.id !== id));\n      } else if (activeModel === 'messages') {\n        await deleteDocument('messages', id);\n        setMessages(messages.filter(m => m.id !== id));\n      }"
);

fs.writeFileSync('src/components/CMSDashboard.tsx', c);
