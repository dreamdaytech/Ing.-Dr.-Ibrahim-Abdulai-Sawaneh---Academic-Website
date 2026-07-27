const fs = require('fs');
let s = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

s = s.replace(
  /onClick=\{\(\) => \{\s*onSelectPublication\?\.\(pub\.id\);\s*setSearchQuery\(''\);\s*setIsSearchFocused\(false\);\s*\}\}/,
  `onClick={() => {
                                setActiveTab('research');
                                onSelectPublication?.(pub.id);
                                setSearchQuery('');
                                setIsSearchFocused(false);
                              }}`
);

s = s.replace(
  /onClick=\{\(\) => \{\s*onSelectBook\?\.\(book\.id\);\s*setSearchQuery\(''\);\s*setIsSearchFocused\(false\);\s*\}\}/,
  `onClick={() => {
                                setActiveTab('books');
                                onSelectBook?.(book.id);
                                setSearchQuery('');
                                setIsSearchFocused(false);
                              }}`
);

s = s.replace(
  /onClick=\{\(\) => \{\s*onSelectBlogPost\?\.\(post\.id\);\s*setSearchQuery\(''\);\s*setIsSearchFocused\(false\);\s*\}\}/,
  `onClick={() => {
                                setActiveTab('blog');
                                onSelectBlogPost?.(post.id);
                                setSearchQuery('');
                                setIsSearchFocused(false);
                              }}`
);

s = s.replace(
  /onClick=\{\(\) => \{\s*onSelectPublication\?\.\(pub\.id\);\s*setSearchQuery\(''\);\s*setIsOpen\(false\);\s*\}\}/,
  `onClick={() => {
                                setActiveTab('research');
                                onSelectPublication?.(pub.id);
                                setSearchQuery('');
                                setIsOpen(false);
                              }}`
);

s = s.replace(
  /onClick=\{\(\) => \{\s*onSelectBook\?\.\(book\.id\);\s*setSearchQuery\(''\);\s*setIsOpen\(false\);\s*\}\}/,
  `onClick={() => {
                                setActiveTab('books');
                                onSelectBook?.(book.id);
                                setSearchQuery('');
                                setIsOpen(false);
                              }}`
);

s = s.replace(
  /onClick=\{\(\) => \{\s*onSelectBlogPost\?\.\(post\.id\);\s*setSearchQuery\(''\);\s*setIsOpen\(false\);\s*\}\}/,
  `onClick={() => {
                                setActiveTab('blog');
                                onSelectBlogPost?.(post.id);
                                setSearchQuery('');
                                setIsOpen(false);
                              }}`
);

fs.writeFileSync('src/components/Navbar.tsx', s);
