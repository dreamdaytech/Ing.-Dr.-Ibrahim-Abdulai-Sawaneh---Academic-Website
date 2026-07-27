const admin = require('firebase-admin');
const serviceAccount = require('./firebase-applet-config.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();
db.collection('profile').doc('biography').get().then(doc => {
  console.log(JSON.stringify(doc.data(), null, 2));
  process.exit(0);
});
