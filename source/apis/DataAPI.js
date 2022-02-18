const { db } = require("../configurations/FirebaseConfig");
const {
  doc,
  query,
  orderBy,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} = require("firebase/firestore");

module.exports.createData = async (deviceId, data) => {
  try {
    await addDoc(collection(db, "devices", deviceId, "data"), data);
  } catch (error) {
    throw Error(JSON.stringify({ path: "DeviceRepository - createDevice()", error: error.message }));
  }
};
