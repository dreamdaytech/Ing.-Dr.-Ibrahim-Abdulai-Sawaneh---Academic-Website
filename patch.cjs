const fs = require('fs');
let code = fs.readFileSync('src/components/ResearchSection.tsx', 'utf8');

const target = `                    </div>
                    {pub.link && (
                      <a
                        href={pub.link}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-editorial-gold hover:text-editorial-navy transition-colors"
                      >
                        Source Journal
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>`;

const replacement = `                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 pr-4 border-r border-editorial-border-light">
                        <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Publication link copied!"); }} className="text-slate-400 hover:text-editorial-navy transition-colors cursor-pointer" aria-label="Copy link">
                          <Share2 className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => window.open(\`https://twitter.com/intent/tweet?url=\${encodeURIComponent(window.location.href)}&text=\${encodeURIComponent(pub.title)}\`, '_blank')} className="text-slate-400 hover:text-[#1DA1F2] transition-colors cursor-pointer" aria-label="Share on X (Twitter)">
                          <Twitter className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => window.open(\`https://www.linkedin.com/sharing/share-offsite/?url=\${encodeURIComponent(window.location.href)}\`, '_blank')} className="text-slate-400 hover:text-[#0A66C2] transition-colors cursor-pointer" aria-label="Share on LinkedIn">
                          <Linkedin className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => window.open(\`https://www.facebook.com/sharer/sharer.php?u=\${encodeURIComponent(window.location.href)}\`, '_blank')} className="text-slate-400 hover:text-[#1877F2] transition-colors cursor-pointer" aria-label="Share on Facebook">
                          <Facebook className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      
                      {pub.link && (
                        <a
                          href={pub.link}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-editorial-gold hover:text-editorial-navy transition-colors"
                        >
                          Source Journal
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/components/ResearchSection.tsx', code, 'utf8');
  console.log('Successfully patched');
} else {
  console.log('Target not found');
}
