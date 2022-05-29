require("dotenv").config();

// Import the functions you need from the SDKs you need
const { getAuth } = require("firebase/auth");
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("@firebase/firestore");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Create a connection with Firebase Firestore
const firestoreDataBase = getFirestore(app);
const verifyIdToken = (idToken) => getAuth().verifyIdToken(idToken);

module.exports = {
  firestoreDataBase,
  verifyIdToken,
};
