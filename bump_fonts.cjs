const fs = require('fs');
const glob = require('glob');

// We want to bump text-xs and text-sm to text-base for paragraph/body text.
// However, we should preserve small text for ALL-CAPS meta labels, badges, and very minor UI elements.

function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // For paragraphs: <p className="...text-xs..."
  content = content.replace(/<p([^>]*)className="([^"]*)(text-xs|text-sm)([^"]*)"/g, (match, p1, p2, p3, p4) => {
    // if it's uppercase/tracking-wide, maybe it's a label, keep it? 
    // actually, let's bump it if it has leading-relaxed (which implies body copy)
    if (match.includes('leading-relaxed') || match.includes('line-clamp')) {
      return `<p${p1}className="${p2}text-base${p4}"`;
    }
    // else bump anyway for paragraphs unless it explicitly has uppercase or is a UI message
    if (!match.includes('uppercase')) {
      return `<p${p1}className="${p2}text-base${p4}"`;
    }
    return match;
  });

  // For div/span that acts as body copy (has leading-relaxed and text-xs/text-sm)
  content = content.replace(/<(div|span)([^>]*)className="([^"]*)(text-xs|text-sm)([^"]*leading-relaxed[^"]*)"/g, (match, tag, p2, p3, p4, p5) => {
    if (!match.includes('uppercase')) {
      return `<${tag}${p2}className="${p3}text-base${p5}"`;
    }
    return match;
  });
  
  // also specifically targeting App.tsx known lines
  if (file.includes('App.tsx')) {
    content = content.replace('className="space-y-4 text-xs text-slate-600 font-sans"', 'className="space-y-4 text-base text-slate-600 font-sans leading-relaxed"');
    content = content.replace('text-xs sm:text-sm text-slate-300', 'text-base sm:text-lg text-slate-300');
  }

  if (file.includes('Hero.tsx')) {
    content = content.replace('text-sm sm:text-base leading-relaxed text-slate-600 max-w-xl', 'text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl');
    content = content.replace('text-xs text-slate-600 font-sans', 'text-sm text-slate-600 font-sans'); // Meta details bump slightly but not full body
  }

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}

glob.sync('src/**/*.tsx').forEach(processFile);

