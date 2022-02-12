// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.processAPIKEY,
  authDomain: process.env.processAUTHDOMAIN,
  projectId: process.env.processPROJECTID,
  storageBucket: process.env.processSTORAGEBUCKET,
  messagingSenderId: process.env.processMESSAGINGSENDERID,
  appId: process.env.processAPPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Create a connection with Firebase Firestore
const db = getFirestore(app);
export { db };
