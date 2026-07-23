const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc } = require('firebase/firestore');
const firebaseConfig = require('./firebase-applet-config.json');

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');

async function check() {
  const docRef = doc(db, 'profile', 'hero');
  const snap = await getDoc(docRef);
  if(snap.exists()) {
    console.log("Profile from db:", snap.data());
  } else {
    console.log("No profile hero doc");
  }
}
check();
