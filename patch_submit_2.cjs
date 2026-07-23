const fs = require('fs');
let c = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');

c = c.replace(
  "setTimeout(() => setSuccessMsg(false), 3000);\n    } catch (error) {",
  "setTimeout(() => setSuccessMsg(false), 3000);\n    } catch (error) {"
); // Not modifying this, let's just use regex

c = c.replace(
  /alert\("Database Synchronization Error: Unable to save changes to the live database\."\);\n    \}\n  \};/,
  'alert("Database Synchronization Error: Unable to save changes to the live database.");\n    } finally {\n      setIsSaving(false);\n    }\n  };'
);

c = c.replace(
  /<button\n                  type="submit"\n                  className="w-full py-2\.5 bg-editorial-navy hover:bg-editorial-navy\/95 text-white font-bold text-\[10px\] uppercase tracking-widest transition-colors flex items-center justify-center gap-1\.5 cursor-pointer rounded-none mt-4"\n                >\n                  <PlusCircle className="h-4 w-4 text-editorial-gold" \/>\n                  \{activeModel === 'profile' \n                    \? "Update Academic Profile Module" \n                    : editingId \n                      \? "Update Registry Entry" \n                      : "Publish To Repository"\n                  \}\n                <\/button>/,
  `<button
                  type="submit"
                  disabled={isSaving}
                  className={\`w-full py-2.5 bg-editorial-navy hover:bg-editorial-navy/95 text-white font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 cursor-pointer rounded-none mt-4 \${isSaving ? 'opacity-70 cursor-not-allowed' : ''}\`}
                >
                  {isSaving ? (
                    <RefreshCw className="h-4 w-4 animate-spin text-editorial-gold" />
                  ) : (
                    <PlusCircle className="h-4 w-4 text-editorial-gold" />
                  )}
                  {isSaving ? "Updating Live Registry..." : (activeModel === 'profile' 
                    ? "Update Academic Profile Module" 
                    : editingId 
                      ? "Update Registry Entry" 
                      : "Publish To Repository")
                  }
                </button>`
);

fs.writeFileSync('src/components/CMSDashboard.tsx', c);
