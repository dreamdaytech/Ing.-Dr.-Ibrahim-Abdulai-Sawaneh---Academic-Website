const fs = require('fs');
let s = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');

const replacement = `  const handleSyncGoogleScholar = async () => {
    setIsSyncingDirect(true);
    let attempts = 0;
    const maxAttempts = 3;
    let success = false;

    while (attempts < maxAttempts && !success) {
      attempts++;
      try {
        console.log(\`Sync attempt \${attempts}...\`);
        const response = await fetch('/api/sync-scholar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: 'https://scholar.google.com/citations?view_op=list_works&hl=en&user=FFFjTA0AAAAJ&cstart=0&pagesize=100' })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success && data.publications) {
          success = true;
          const promises = data.publications.map((pub: any) => saveDocument('publications', pub.id || \`pub-\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`, pub));
          await Promise.all(promises);
          
          const fetched = await fetchCollection('publications');
          setPublications(fetched.length > 0 ? (fetched as any) : PUBLICATIONS);
          
          alert(\`Successfully synced \${data.publications.length} publications directly to Firestore!\`);
        } else {
          console.warn(\`Attempt \${attempts} failed:\`, data.error);
          if (attempts >= maxAttempts) {
            alert('Error syncing from Google Scholar after ' + maxAttempts + ' attempts: ' + (data.error || 'Unknown error'));
          } else {
            // Wait 2 seconds before retrying
            await new Promise(res => setTimeout(res, 2000));
          }
        }
      } catch (e) {
        console.error('Network error on attempt ' + attempts + ':', e);
        if (attempts >= maxAttempts) {
          alert('Network error while syncing. Please try again later.');
        } else {
          await new Promise(res => setTimeout(res, 2000));
        }
      }
    }
    
    setIsSyncingDirect(false);
  };`;

// replace from handleSyncGoogleScholar up to setIsSyncingDirect(false);   }   };
s = s.replace(/const handleSyncGoogleScholar = async \(\) => \{[\s\S]*?setIsSyncingDirect\(false\);\s*\}\s*\};/, replacement);
s = s.replace(/\\\`pub-\\\$\{Date\.now\(\)\}-\\\$\{Math\.random\(\)\.toString\(36\)\.substr\(2, 9\)\}\\\`/g, "`pub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`");
s = s.replace(/\\\`Successfully synced \\\$\{data\.publications\.length\} publications directly to Firestore!\\\`/g, "`Successfully synced ${data.publications.length} publications directly to Firestore!`");

fs.writeFileSync('src/components/CMSDashboard.tsx', s);
