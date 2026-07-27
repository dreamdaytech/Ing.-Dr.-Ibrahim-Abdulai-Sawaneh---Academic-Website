const fs = require('fs');
let s = fs.readFileSync('server.ts', 'utf8');

s = s.replace(
  '      console.error("Error in discover-publications API:", error);',
  '      const errStr = typeof error === "object" ? (error.message || "") + String(error) : String(error);\n      const isQuotaError = errStr.includes("429") || errStr.includes("quota") || errStr.includes("RESOURCE_EXHAUSTED") || error?.status === 429;\n      if (isQuotaError) {\n        console.log("Gemini API rate limit exceeded in discover-publications, using fallback.");\n      } else {\n        console.error("Error in discover-publications API:", error);\n      }'
);

s = s.replace(
  '      const errStr = typeof error === "object" ? JSON.stringify(error) + String(error) + (error.message || "") : String(error);\n      const isQuotaError = errStr.includes("429") || errStr.includes("quota") || errStr.includes("RESOURCE_EXHAUSTED") || error?.status === 429;',
  ''
);

fs.writeFileSync('server.ts', s);
