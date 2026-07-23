const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  "onSelectPublication={setSelectedPubId}\n        onSelectBlogPost={setSelectedBlogPostId}\n      />",
  "onSelectPublication={setSelectedPubId}\n        onSelectBlogPost={setSelectedBlogPostId}\n        heroInfo={dynamicHeroInfo}\n      />"
);

fs.writeFileSync('src/App.tsx', code, 'utf8');
console.log('Patched App');
