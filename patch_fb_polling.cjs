const fs = require('fs');
let c = fs.readFileSync('src/lib/firebase.ts', 'utf8');

c = c.replace(
  "import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';",
  "import { initializeFirestore, collection, getDocs, doc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';"
);

c = c.replace(
  "export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');",
  "export const db = initializeFirestore(app, { experimentalForceLongPolling: true }, firebaseConfig.firestoreDatabaseId || '(default)');"
);

fs.writeFileSync('src/lib/firebase.ts', c);
