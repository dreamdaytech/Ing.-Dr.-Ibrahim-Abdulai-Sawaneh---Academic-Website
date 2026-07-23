const fs = require('fs');
let c = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');

c = c.replace(
  "Trash2, BookOpen,",
  "Trash2, BookOpen, Mail,"
);

c = c.replace(
  "GalleryImage, GalleryCategory } from '../types';",
  "GalleryImage, GalleryCategory, Message } from '../types';"
);

c = c.replace(
  "import { saveDocument, deleteDocument, seedDatabase, auth, uploadFile } from '../lib/firebase';",
  "import { saveDocument, deleteDocument, seedDatabase, auth, uploadFile, fetchCollection } from '../lib/firebase';"
);

c = c.replace(
  "  const [activeModel, setActiveModel] = useState<'publications' | 'books' | 'blog' | 'cv' | 'talks' | 'profile' | 'gallery' | 'galleryCategories'>('publications');",
  "  const [activeModel, setActiveModel] = useState<'publications' | 'books' | 'blog' | 'cv' | 'talks' | 'profile' | 'gallery' | 'galleryCategories' | 'messages'>('publications');\n  const [messages, setMessages] = useState<Message[]>([]);\n  const [isLoadingMessages, setIsLoadingMessages] = useState(false);\n  useEffect(() => {\n    if (activeModel === 'messages') {\n      setIsLoadingMessages(true);\n      fetchCollection<Message>('messages').then(msgs => {\n        setMessages(msgs.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));\n      }).catch(console.error).finally(() => setIsLoadingMessages(false));\n    }\n  }, [activeModel]);"
);

c = c.replace(
  "{ id: 'talks', name: 'Speaking / Media', count: talkEvents.length, icon: <Presentation className=\"h-4 w-4\" /> },",
  "{ id: 'talks', name: 'Speaking / Media', count: talkEvents.length, icon: <Presentation className=\"h-4 w-4\" /> },\n          { id: 'messages', name: 'Inquiries & Collabs', count: activeModel === 'messages' ? messages.length : '?', icon: <Mail className=\"h-4 w-4\" /> },"
);


fs.writeFileSync('src/components/CMSDashboard.tsx', c);
