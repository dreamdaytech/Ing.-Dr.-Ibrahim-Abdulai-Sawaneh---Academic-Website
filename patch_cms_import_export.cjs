const fs = require('fs');
let s = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');

if (!s.includes('Download,')) {
  s = s.replace('import { Database', 'import { Database, Download');
}

const exportImportFunctions = `
  const exportDataToJson = () => {
    let dataToExport = [];
    if (activeModel === 'publications') dataToExport = publications;
    else if (activeModel === 'books') dataToExport = books;
    else if (activeModel === 'blog-posts') dataToExport = blogPosts;
    else if (activeModel === 'talk-events') dataToExport = talkEvents;
    else return;

    const dataStr = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = \`\${activeModel}_export.json\`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importDataFromJson = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
          if (activeModel === 'publications') {
            const promises = json.map(item => saveDocument('publications', item.id || \`pub-\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`, item));
            await Promise.all(promises);
            const fetched = await fetchCollection('publications');
            setPublications(fetched.length > 0 ? (fetched as any) : PUBLICATIONS);
            alert(\`Successfully imported \${json.length} publications!\`);
          } else {
             alert(\`Importing for \${activeModel} is not implemented fully, implement it similarly if needed\`);
          }
        } else {
          alert("Invalid data format. Expected an array.");
        }
      } catch (err) {
        alert("Error parsing JSON file or saving to DB.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };
`;

s = s.replace("const handleDiscoverPublications = async () => {", exportImportFunctions + "\n  const handleDiscoverPublications = async () => {");

const dataManagementUI = `
          {/* Manual Import / Export JSON */}
          {activeModel === 'publications' && (
            <div className="border border-editorial-border bg-white p-6 shadow-xs rounded-none mt-6">
              <div className="flex items-center justify-between border-b border-editorial-border-light pb-3 mb-4">
                <h3 className="font-serif text-sm font-bold text-editorial-navy flex items-center gap-2">
                  <Database className="h-4 w-4 text-editorial-gold" />
                  Data Management
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                Manually export or import your research data as JSON. (Free & Most Reliable)
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={exportDataToJson}
                  className="w-full py-2 flex justify-center items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold transition-colors cursor-pointer border bg-slate-50 text-editorial-navy border-editorial-border hover:bg-slate-100"
                >
                  <Download className="h-3 w-3" />
                  Export
                </button>
                <label className="w-full py-2 flex justify-center items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold transition-colors cursor-pointer border bg-slate-50 text-editorial-navy border-editorial-border hover:bg-slate-100">
                  <FileText className="h-3 w-3" />
                  Import
                  <input type="file" accept=".json" className="hidden" onChange={importDataFromJson} />
                </label>
              </div>
            </div>
          )}
`;

s = s.replace('          {/* Right Column: Interactive Form Engine', dataManagementUI + '\n          {/* Right Column: Interactive Form Engine');

fs.writeFileSync('src/components/CMSDashboard.tsx', s);
