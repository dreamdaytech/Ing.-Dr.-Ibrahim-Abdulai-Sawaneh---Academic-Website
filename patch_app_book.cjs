const fs = require('fs');
let c = fs.readFileSync('src/App.tsx', 'utf8');

c = c.replace(
  "  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string | null>(null);",
  "  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string | null>(null);\n  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);"
);

c = c.replace(
  "      <Navbar\n        activeTab={activeTab}\n        setActiveTab={setActiveTab}\n        publications={dynamicPubs}\n        blogPosts={dynamicBlogPosts}\n        onSelectPublication={(id) => {\n          setSelectedPubId(id);\n          setActiveTab('research');\n        }}\n        onSelectBlogPost={(id) => {\n          setSelectedBlogPostId(id);\n          setActiveTab('blog');\n        }}\n        heroInfo={dynamicHeroInfo}\n      />",
  "      <Navbar\n        activeTab={activeTab}\n        setActiveTab={setActiveTab}\n        publications={dynamicPubs}\n        blogPosts={dynamicBlogPosts}\n        books={dynamicBooks}\n        onSelectPublication={(id) => {\n          setSelectedPubId(id);\n          setActiveTab('research');\n        }}\n        onSelectBlogPost={(id) => {\n          setSelectedBlogPostId(id);\n          setActiveTab('blog');\n        }}\n        onSelectBook={(id) => {\n          setSelectedBookId(id);\n          setActiveTab('books');\n        }}\n        heroInfo={dynamicHeroInfo}\n      />"
);

c = c.replace(
  "        return <BooksSection books={dynamicBooks} />;",
  "        return <BooksSection books={dynamicBooks} initialSelectedBookId={selectedBookId} />;"
);

fs.writeFileSync('src/App.tsx', c);
