const fs = require('fs');
let s = fs.readFileSync('src/components/ResearchSection.tsx', 'utf8');

const importExportFns = `
  const exportDataToJson = () => {
    const dataStr = JSON.stringify(localPubs, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "publications_export.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importDataFromJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
          setLocalPubs(json);
          alert("Data successfully imported!");
        } else {
          alert("Invalid data format. Expected an array of publications.");
        }
      } catch (err) {
        alert("Error parsing JSON file.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };
`;

s = s.replace('const exportPublicationsToPDF = async () => {', importExportFns + '\n\n  const exportPublicationsToPDF = async () => {');

const dataManagementUI = `
          {/* Manual Import / Export JSON */}
          <div className="border border-editorial-border bg-white p-5 text-center shadow-xs">
            <h4 className="font-serif text-sm font-semibold text-editorial-navy uppercase tracking-wide">Data Management</h4>
            <p className="text-[10px] text-slate-500 mt-2 leading-relaxed font-sans px-2">
              Manually export or import your research data as JSON. (Free & Most Reliable)
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
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
`;

s = s.replace('          {/* Export Publications as PDF */}', dataManagementUI + '\n\n          {/* Export Publications as PDF */}');

fs.writeFileSync('src/components/ResearchSection.tsx', s);
