const fs = require('fs');

let nb = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

nb = nb.replace(
/pub\.title\.toLowerCase/g, "(pub.title || '').toLowerCase"
).replace(
/pub\.authors\.toLowerCase/g, "(pub.authors || '').toLowerCase"
).replace(
/pub\.abstract\.toLowerCase/g, "(pub.abstract || '').toLowerCase"
).replace(
/post\.title\.toLowerCase/g, "(post.title || '').toLowerCase"
).replace(
/post\.excerpt\.toLowerCase/g, "(post.excerpt || '').toLowerCase"
).replace(
/post\.content\.toLowerCase/g, "(post.content || '').toLowerCase"
).replace(
/book\.title\.toLowerCase/g, "(book.title || '').toLowerCase"
).replace(
/book\.synopsis\.toLowerCase/g, "(book.synopsis || '').toLowerCase"
).replace(
/book\.publisher\.toLowerCase/g, "(book.publisher || '').toLowerCase"
).replace(
/k\.toLowerCase/g, "(k || '').toLowerCase"
);

fs.writeFileSync('src/components/Navbar.tsx', nb);

let rs = fs.readFileSync('src/components/ResearchSection.tsx', 'utf8');
rs = rs.replace(
/pub\.title\.toLowerCase/g, "(pub.title || '').toLowerCase"
).replace(
/pub\.authors\.toLowerCase/g, "(pub.authors || '').toLowerCase"
).replace(
/pub\.abstract\.toLowerCase/g, "(pub.abstract || '').toLowerCase"
).replace(
/k\.toLowerCase/g, "(k || '').toLowerCase"
);
fs.writeFileSync('src/components/ResearchSection.tsx', rs);

