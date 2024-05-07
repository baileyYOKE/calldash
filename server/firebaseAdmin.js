const admin = require('firebase-admin');

// Path to your Firebase service account key file
const serviceAccountPath = '/Users/baileyosullivan/Downloads/yoke-call-firebase-adminsdk-r63z5-9874fc8d9e.json';
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://yoke-call-default-rtdb.firebaseio.com/"  // Replace with your actual Firebase Database URL
});

module.exports = admin;
