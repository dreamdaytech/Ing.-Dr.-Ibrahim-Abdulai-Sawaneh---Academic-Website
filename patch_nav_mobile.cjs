const fs = require('fs');
let c = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

c = c.replace(
  "                      {searchResults.blogPosts.length > 0 && (\n                        <div className=\"py-1\">\n                          <div className=\"px-2 pb-1\">\n                            <span className=\"text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400\">Blog ({searchResults.blogPosts.length})</span>\n                          </div>",
  `                      {searchResults.books.length > 0 && (
                        <div className="py-1">
                          <div className="px-2 pb-1">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">Books ({searchResults.books.length})</span>
                          </div>
                          {searchResults.books.map((book) => (
                            <button
                              key={book.id}
                              onClick={() => {
                                onSelectBook?.(book.id);
                                setSearchQuery('');
                                setIsOpen(false);
                              }}
                              className="w-full text-left px-2 py-1.5 hover:bg-slate-50 transition-colors flex gap-2 items-start cursor-pointer"
                            >
                              <BookOpen className="h-3.5 w-3.5 text-editorial-gold shrink-0 mt-0.5" />
                              <div className="min-w-0 flex-1">
                                <span className="block font-serif text-xs font-bold text-editorial-navy leading-tight truncate">
                                  {book.title}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                      {searchResults.blogPosts.length > 0 && (
                        <div className="py-1">
                          <div className="px-2 pb-1">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">Blog ({searchResults.blogPosts.length})</span>
                          </div>`
);

c = c.replace(
  "                  placeholder=\"Search publications & blog posts...\"",
  "                  placeholder=\"Search publications, blog & books...\""
);

c = c.replace(
  "              placeholder=\"Search publications & blog...\"",
  "              placeholder=\"Search publications, blog & books...\""
);


fs.writeFileSync('src/components/Navbar.tsx', c);
