const fs = require('fs');
let s = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');

const regexToRemove = /\s*{\/\* Manual Import \/ Export JSON \*\/}[\s\S]*?Data Management[\s\S]*?<\/div>\s*<\/div>\s*\)\}/;
s = s.replace(regexToRemove, '');

const regexToInsert = /(\s*)}\s*(<\/div>\s*{\/\* Right Column)/;
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

s = s.replace(regexToInsert, \`$1\${dataManagementUI}\n$2\`);

fs.writeFileSync('src/components/CMSDashboard.tsx', s);
