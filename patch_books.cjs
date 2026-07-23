const fs = require('fs');
let c = fs.readFileSync('src/components/BooksSection.tsx', 'utf8');

c = c.replace(
  "interface BooksSectionProps {\n  books?: Book[];\n}",
  "interface BooksSectionProps {\n  books?: Book[];\n  initialSelectedBookId?: string | null;\n}"
);

c = c.replace(
  "export default function BooksSection({ books = BOOKS }: BooksSectionProps) {",
  "export default function BooksSection({ books = BOOKS, initialSelectedBookId }: BooksSectionProps) {"
);

c = c.replace(
  "  const [selectedBookState, setSelectedBookState] = useState<Book | null>(null);",
  "  const [selectedBookState, setSelectedBookState] = useState<Book | null>(null);\n\n  React.useEffect(() => {\n    if (initialSelectedBookId) {\n      const book = books.find(b => b.id === initialSelectedBookId);\n      if (book) setSelectedBookState(book);\n    }\n  }, [initialSelectedBookId, books]);"
);

fs.writeFileSync('src/components/BooksSection.tsx', c);
