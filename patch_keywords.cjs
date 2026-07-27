const fs = require('fs');

let rs = fs.readFileSync('src/components/ResearchSection.tsx', 'utf8');
rs = rs.replace(/pub\.keywords\.join/g, "(pub.keywords || []).join");
rs = rs.replace(/pub\.keywords\.some/g, "(pub.keywords || []).some");
rs = rs.replace(/pub\.keywords\.map/g, "(pub.keywords || []).map");
fs.writeFileSync('src/components/ResearchSection.tsx', rs);

let nb = fs.readFileSync('src/components/Navbar.tsx', 'utf8');
nb = nb.replace(/pub\.keywords\.some/g, "(pub.keywords || []).some");
fs.writeFileSync('src/components/Navbar.tsx', nb);

