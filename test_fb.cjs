const fb = require('firebase/firestore');
console.log(Object.keys(fb).filter(k => k.toLowerCase().includes('polling')));
