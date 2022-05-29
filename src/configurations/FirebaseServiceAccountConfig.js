// Import the functions you need from the SDKs you need
const admin = require("firebase-admin");
const path = require("path");

var serviceAccount = require(path.resolve(__dirname, "../keys", "ene064-firebase-adminsdk-o71vq-477d35bfe3.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
