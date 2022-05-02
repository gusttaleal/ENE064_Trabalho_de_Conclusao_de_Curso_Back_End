const { db } = require("../configurations/FirebaseConfig");
const { doc, query, orderBy, collection, addDoc, getDoc, getDocs, deleteDoc } = require("firebase/firestore");

module.exports.createData = async (deviceId, data) => {
  try {
    return await addDoc(collection(db, "devices", deviceId, "data"), data);
  } catch (error) {
    throw Error(JSON.stringify({ path: "DataRepository - createData()", message: error.message }));
  }
};

module.exports.readData = async (deviceId, dataId) => {
  try {
    return await getDoc(doc(db, "devices", deviceId, "data", dataId));
  } catch (error) {
    throw Error(JSON.stringify({ path: "DataRepository - readData()", message: error.message }));
  }
};

module.exports.readDatas = async (deviceId) => {
  try {
    return await getDocs(query(collection(db, "devices", deviceId, "data"), orderBy("recivedDataAt", "asc")));
  } catch (error) {
    throw Error(JSON.stringify({ path: "DataRepository - readDatas()", message: error.message }));
  }
};

module.exports.deleteData = async (deviceId, dataId) => {
  try {
    await deleteDoc(doc(db, "devices", deviceId, "data", dataId));
  } catch (error) {
    throw Error(JSON.stringify({ path: "DataRepository - deleteData()", message: error.message }));
  }
};
