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
    const result = await addDoc(collection(db, "devices"), device);
    return result.id;
  } catch (error) {
    throw Error(JSON.stringify({ path: "DeviceRepository - createDevice()", error: error.message }));
  }
};

module.exports.readDevice = async (id = null) => {
  try {
    if (id != null) {
      const _doc = await getDoc(doc(db, "devices", id));
      const result = [{ ..._doc.data(), deviceId: _doc.id }];
      return result;
    } else {
      const data = await getDocs(query(collection(db, "devices"), orderBy("deviceCreatedAt", "asc")));
      const result = data.docs.map((_doc) => ({ ..._doc.data(), deviceId: _doc.id }));
      return result;
    }
  } catch (error) {
    throw Error(JSON.stringify({ path: "DeviceRepository - readDevice()", error: error.message }));
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
