const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const firebaseConfig = require('./firebase-applet-config.json');

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

createUserWithEmailAndPassword(auth, 'admin@unimtech.edu.sl', 'sawaneh2026')
  .then((userCredential) => {
    console.log("Admin user created successfully in Firebase Auth:", userCredential.user.email);
    process.exit(0);
  })
  .catch((error) => {
    if (error.code === 'auth/email-already-in-use') {
      console.log("Admin user already exists in Firebase Auth.");
      process.exit(0);
    } else {
      console.error("Error creating admin user:", error);
      process.exit(1);
    }
  });
