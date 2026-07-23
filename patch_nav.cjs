const fs = require('fs');
let c = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

c = c.replace(
  "import { Publication, BlogPost } from '../types';",
  "import { Publication, BlogPost, Book } from '../types';"
);

c = c.replace(
  "  publications?: Publication[];\n  blogPosts?: BlogPost[];\n  onSelectPublication?: (id: string | null) => void;\n  onSelectBlogPost?: (id: string | null) => void;\n  heroInfo?: any;\n}",
  "  publications?: Publication[];\n  blogPosts?: BlogPost[];\n  books?: Book[];\n  onSelectPublication?: (id: string | null) => void;\n  onSelectBlogPost?: (id: string | null) => void;\n  onSelectBook?: (id: string | null) => void;\n  heroInfo?: any;\n}"
);

c = c.replace(
  "  publications = [],\n  blogPosts = [],\n  onSelectPublication,\n  onSelectBlogPost,\n  heroInfo = {}",
  "  publications = [],\n  blogPosts = [],\n  books = [],\n  onSelectPublication,\n  onSelectBlogPost,\n  onSelectBook,\n  heroInfo = {}"
);

c = c.replace(
  "  const searchResults = (() => {\n    if (!searchQuery.trim()) return { publications: [], blogPosts: [] };\n    const q = searchQuery.toLowerCase().trim();\n    \n    const matchedPubs = publications.filter(pub => \n      pub.title.toLowerCase().includes(q) ||\n      pub.authors.toLowerCase().includes(q) ||\n      pub.abstract.toLowerCase().includes(q) ||\n      pub.keywords.some(k => k.toLowerCase().includes(q))\n    ).slice(0, 5);\n\n    const matchedBlogs = blogPosts.filter(post => \n      post.title.toLowerCase().includes(q) ||\n      post.excerpt.toLowerCase().includes(q) ||\n      post.content.toLowerCase().includes(q)\n    ).slice(0, 5);\n\n    return { publications: matchedPubs, blogPosts: matchedBlogs };\n  })();\n\n  const hasResults = searchResults.publications.length > 0 || searchResults.blogPosts.length > 0;",
  `  const searchResults = (() => {
    if (!searchQuery.trim()) return { publications: [], blogPosts: [], books: [] };
    const q = searchQuery.toLowerCase().trim();
    
    const matchedPubs = publications.filter(pub => 
      pub.title.toLowerCase().includes(q) ||
      pub.authors.toLowerCase().includes(q) ||
      pub.abstract.toLowerCase().includes(q) ||
      pub.keywords.some(k => k.toLowerCase().includes(q))
    ).slice(0, 5);

    const matchedBlogs = blogPosts.filter(post => 
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q)
    ).slice(0, 5);
    
    const matchedBooks = books.filter(book => 
      book.title.toLowerCase().includes(q) ||
      book.synopsis.toLowerCase().includes(q) ||
      book.publisher.toLowerCase().includes(q)
    ).slice(0, 5);

    return { publications: matchedPubs, blogPosts: matchedBlogs, books: matchedBooks };
  })();

  const hasResults = searchResults.publications.length > 0 || searchResults.blogPosts.length > 0 || searchResults.books.length > 0;`
);

c = c.replace(
  "                    {searchResults.blogPosts.length > 0 && (\n                      <div>\n                        <div className=\"px-3 pb-1.5 mb-1.5 border-b border-editorial-border-light\">\n                          <span className=\"text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400\">Insights & Blog ({searchResults.blogPosts.length})</span>\n                        </div>",
  `                    {searchResults.books.length > 0 && (
                      <div>
                        <div className="px-3 pb-1.5 mb-1.5 border-b border-editorial-border-light">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">Published Books ({searchResults.books.length})</span>
                        </div>
                        <div className="space-y-1">
                          {searchResults.books.map((book) => (
                            <button
                              key={book.id}
                              onClick={() => {
                                onSelectBook?.(book.id);
                                setSearchQuery('');
                                setIsSearchFocused(false);
                              }}
                              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 transition-colors flex gap-2.5 items-start border-l-2 border-transparent hover:border-editorial-gold cursor-pointer"
                            >
                              <BookOpen className="h-3.5 w-3.5 text-editorial-gold shrink-0 mt-0.5" />
                              <div className="min-w-0 flex-1">
                                <span className="block font-serif text-[11px] font-bold text-editorial-navy leading-snug hover:text-editorial-gold truncate">
                                  {book.title}
                                </span>
                                <span className="block text-[9px] text-slate-400 font-sans mt-0.5 leading-none">
                                  {book.publisher} • {book.year}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {searchResults.blogPosts.length > 0 && (
                      <div>
                        <div className="px-3 pb-1.5 mb-1.5 border-b border-editorial-border-light">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">Insights & Blog ({searchResults.blogPosts.length})</span>
                        </div>`
);

fs.writeFileSync('src/components/Navbar.tsx', c);
