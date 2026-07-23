const fs = require('fs');
let c = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');

const msgView = `
              activeModel === 'messages' ? (
                <div>
                  {selectedMessage ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-editorial-border pb-2 mb-4">
                        <h4 className="font-serif text-lg text-editorial-navy">{selectedMessage.type}</h4>
                        <span className="text-[10px] text-slate-500 font-mono">{new Date(selectedMessage.date).toLocaleString()}</span>
                      </div>
                      <div className="bg-slate-50 p-4 border border-editorial-border text-sm text-slate-800 font-sans">
                        <p><strong>Name/Org:</strong> {selectedMessage.name || selectedMessage.org || 'N/A'}</p>
                        <p><strong>Email:</strong> {selectedMessage.email}</p>
                        {selectedMessage.subject && <p><strong>Subject:</strong> {selectedMessage.subject}</p>}
                        {selectedMessage.collabType && <p><strong>Collab Type:</strong> {selectedMessage.collabType}</p>}
                      </div>
                      <div className="mt-4 text-sm font-sans whitespace-pre-wrap text-slate-700">
                        {selectedMessage.text || selectedMessage.proposal}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-slate-500 font-mono text-sm border-2 border-dashed border-slate-200">
                      Select a message from the list to view details
                    </div>
                  )}
                </div>
              ) : (
`;

c = c.replace(
  "            ) : (\n              <form onSubmit={handleFormSubmit} className=\"space-y-4 text-xs\">",
  "            ) : (\n" + msgView + "              <form onSubmit={handleFormSubmit} className=\"space-y-4 text-xs\">"
);

c = c.replace(
  "          </div>\n        </div>\n      </div>\n    </div>\n  );\n}",
  "              )}\n          </div>\n        </div>\n      </div>\n    </div>\n  );\n}"
);

fs.writeFileSync('src/components/CMSDashboard.tsx', c);
