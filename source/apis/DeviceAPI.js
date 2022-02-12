const { db } = require("../configurations/FirebaseConfig");
const {
  getDocs,
  query,
  collection,
  orderBy,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
} = require("firebase/firestore");

const createDevice = async (device) => {
  try {
    await addDoc(collection(db, "devices"), device);
  } catch (error) {
    throw Error({ path: "DeviceRepository - createDevice()", error: error });
  }
};

const readDevice = async (id = null) => {
  try {
    if (id === null) {
      const data = await getDocs(
        query(collection(db, "devices"), orderBy("deviceCreatedAt", "asc"))
      );
      const result = data.docs.map((_doc) => ({
        ..._doc.data(),
        deviceId: _doc.id,
      }));
      return result;
    } else {
      const _doc = await getDoc(doc(db, "devices", id));
      const result = [{ ..._doc.data(), deviceId: _doc.id }];
      return result;
    }
  } catch (error) {
    throw Error({ path: "DeviceRepository - readDevice()", error: error });
  }
};

const updateDevice = async (id, device) => {
  const reference = doc(db, "devices", id);
  try {
    const result = await updateDoc(reference, device);
    return result;
  } catch (error) {
    throw Error({ path: "DeviceRepository - updateDevice()", error: error });
  }
};

const deleteDevice = async (id) => {
  const reference = doc(db, "devices", id);
  try {
    const result = await deleteDoc(reference);
    return result;
  } catch (error) {
    throw Error({ path: "DeviceRepository - deleteDevice()", error: error });
  }
};

export { createDevice, readDevice, updateDevice, deleteDevice };
