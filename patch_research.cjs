const fs = require('fs');
let s = fs.readFileSync('src/components/ResearchSection.tsx', 'utf8');

const importReplacement = `import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, Quote, Download, FileText, ExternalLink, Calendar, Users, Hash, Check, Send, X, ZoomIn, ZoomOut, Printer, Twitter, Linkedin, Facebook, Share2, MessageCircle, RefreshCw } from 'lucide-react';`;

s = s.replace(/import React, { useState } from 'react';\nimport {.*?lucide-react';/s, importReplacement);


const stateAdditions = `
  const [localPubs, setLocalPubs] = useState<Publication[]>(publications);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    setLocalPubs(publications);
  }, [publications]);

  const handleSyncScholar = async () => {
    setIsSyncing(true);
    try {
      const response = await fetch('/api/sync-scholar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: 'https://scholar.google.com/citations?view_op=list_works&hl=en&hl=en&user=FFFjTA0AAAAJ' })
      });
      const data = await response.json();
      if (data.success && data.publications) {
        setLocalPubs(data.publications);
      } else {
        alert('Error syncing from Google Scholar');
      }
    } catch (e) {
      console.error(e);
      alert('Network error while syncing');
    } finally {
      setIsSyncing(false);
    }
  };
`;

s = s.replace('const [isExportingPDF, setIsExportingPDF] = useState(false);', 'const [isExportingPDF, setIsExportingPDF] = useState(false);\n' + stateAdditions);

s = s.replace(/const filteredPubs = publications\.filter/g, 'const filteredPubs = localPubs.filter');
s = s.replace(/const sortedPubs = \[\.\.\.publications\]/g, 'const sortedPubs = [...localPubs]');


const syncButton = `        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleSyncScholar}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-editorial-border hover:border-editorial-navy transition-colors text-[10px] font-mono font-bold uppercase tracking-widest text-slate-600 bg-white shadow-xs rounded-none"
          >
            <RefreshCw className={\`h-3 w-3 \${isSyncing ? 'animate-spin' : ''}\`} />
            {isSyncing ? 'Syncing...' : 'Sync Google Scholar'}
          </button>
          <button`;

s = s.replace(/<div className="flex items-center gap-3">\s*<button/s, syncButton);


fs.writeFileSync('src/components/ResearchSection.tsx', s);
