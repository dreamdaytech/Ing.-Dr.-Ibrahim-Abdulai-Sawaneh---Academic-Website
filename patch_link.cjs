const fs = require('fs');
let code = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');

const target = `                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Keywords (Comma separated)</label>
                      <input
                        type="text"
                        placeholder="e.g. Cybercrime, UNIMTECH, Policy"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                      />
                    </div>`;

const replacement = `                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Source Journal Link (Optional)</label>
                      <input
                        type="url"
                        placeholder="e.g. https://ieeexplore.ieee.org/document/..."
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Keywords (Comma separated)</label>
                      <input
                        type="text"
                        placeholder="e.g. Cybercrime, UNIMTECH, Policy"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                      />
                    </div>`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/components/CMSDashboard.tsx', code, 'utf8');
  console.log('Successfully patched CMSDashboard.tsx');
} else {
  console.log('Target not found in CMSDashboard.tsx');
}
