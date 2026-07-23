const fs = require('fs');
let c = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');

c = c.replace(
  "                        {activeModel === 'profile' && `Dynamic Administrative Content`}",
  "                        {activeModel === 'profile' && `Dynamic Administrative Content`}\n                        {activeModel === 'messages' && (\n                          <span className={`inline-block px-1.5 py-0.5 rounded-none font-bold uppercase tracking-wider text-[8px] ml-2 ${item.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : item.status === 'In Progress' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}`}>{item.status || 'Pending'}</span>\n                        )}"
);

fs.writeFileSync('src/components/CMSDashboard.tsx', c);
