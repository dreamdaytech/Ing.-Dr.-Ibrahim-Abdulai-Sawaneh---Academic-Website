const fs = require('fs');
let s = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');

const syncStateAndFn = `
  const [isSyncingDirect, setIsSyncingDirect] = useState(false);

  const handleSyncGoogleScholar = async () => {
    setIsSyncingDirect(true);
    try {
      const response = await fetch('/api/sync-scholar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: 'https://scholar.google.com/citations?view_op=list_works&hl=en&hl=en&user=FFFjTA0AAAAJ' })
      });
      const data = await response.json();
      if (data.success && data.publications) {
        const promises = data.publications.map((pub) => saveDocument('publications', pub.id || \`pub-\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`, pub));
        await Promise.all(promises);
        const fetched = await fetchCollection('publications');
        setPublications(fetched.length > 0 ? (fetched) : PUBLICATIONS);
        alert(\`Successfully synced \${data.publications.length} publications directly to Firestore!\`);
      } else {
        alert('Error syncing from Google Scholar: ' + (data.error || 'Unknown error'));
      }
    } catch (e) {
      console.error(e);
      alert('Network error while syncing');
    } finally {
      setIsSyncingDirect(false);
    }
  };
`;

s = s.replace("const handleDiscoverPublications = async () => {", syncStateAndFn + "\n  const handleDiscoverPublications = async () => {");

const directSyncButton = `
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSyncGoogleScholar}
                    disabled={isSyncingDirect || isDiscovering}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 text-editorial-navy disabled:text-slate-400 font-mono text-[9px] uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 cursor-pointer rounded-none border border-slate-200"
                  >
                    {isSyncingDirect ? (
                      <RefreshCw className="h-3 w-3 animate-spin" />
                    ) : (
                      <Globe className="h-3 w-3" />
                    )}
                    {isSyncingDirect ? 'Syncing...' : 'Direct Sync'}
                  </button>
                  <button
                    onClick={handleDiscoverPublications}
                    disabled={isDiscovering || isSyncingDirect}
                    className="px-3 py-1.5 bg-editorial-gold hover:bg-editorial-gold/95 disabled:bg-slate-150 text-editorial-navy disabled:text-slate-450 font-mono text-[9px] uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 cursor-pointer rounded-none border border-editorial-gold/50"
                  >
                    {isDiscovering ? (
                      <RefreshCw className="h-3 w-3 animate-spin" />
                    ) : (
                      <Search className="h-3 w-3" />
                    )}
                    {isDiscovering ? 'Searching...' : 'Scan Google Scholar'}
                  </button>
                </div>
`;

// we need to replace the single button with this div
s = s.replace(
  /<button\s*onClick=\{handleDiscoverPublications\}[\s\S]*?<\/button>/,
  directSyncButton
);

fs.writeFileSync('src/components/CMSDashboard.tsx', s);
