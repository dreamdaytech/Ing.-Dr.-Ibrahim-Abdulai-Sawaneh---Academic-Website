const fs = require('fs');
let s = fs.readFileSync('server.ts', 'utf8');

s = s.replace(
  'const isQuotaError = error?.status === 429 || error?.message?.includes("429") || error?.message?.includes("quota") || error?.message?.includes("RESOURCE_EXHAUSTED");',
  'const errStr = typeof error === "object" ? JSON.stringify(error) + String(error) + (error.message || "") : String(error);\n      const isQuotaError = errStr.includes("429") || errStr.includes("quota") || errStr.includes("RESOURCE_EXHAUSTED") || error?.status === 429;'
);

fs.writeFileSync('server.ts', s);
