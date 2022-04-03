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

module.exports.createDevice = async (device) => {
  try {
    return await addDoc(collection(db, "devices"), device);
  } catch (error) {
    throw Error(JSON.stringify({ path: "DeviceRepository - createDevice()", error: error.message }));
  }
};

module.exports.readDevice = async (deviceId) => {
  try {
    return await getDoc(doc(db, "devices", deviceId));
  } catch (error) {
    throw Error(JSON.stringify({ path: "DeviceRepository - readDevice()", error: error.message }));
  }
};

module.exports.readDevices = async () => {
  try {
    return await getDocs(query(collection(db, "devices"), orderBy("deviceCreatedAt", "asc")));
  } catch (error) {
    throw Error(JSON.stringify({ path: "DeviceRepository - readDevices()", error: error.message }));
  }
};

module.exports.updateDevice = async (id, device) => {
  try {
    await updateDoc(doc(db, "devices", id), device);
  } catch (error) {
    throw Error(JSON.stringify({ path: "DeviceRepository - updateDevice()", error: error.message }));
  }
};

module.exports.deleteDevice = async (id) => {
  try {
    await deleteDoc(doc(db, "devices", id));
  } catch (error) {
    throw Error(JSON.stringify({ path: "DeviceRepository - deleteDevice()", error: error.message }));
  }
};
