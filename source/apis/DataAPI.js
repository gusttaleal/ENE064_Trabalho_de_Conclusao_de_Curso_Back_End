const { db } = require("../configurations/FirebaseConfig");
const { doc, query, orderBy, collection, addDoc, getDoc, getDocs } = require("firebase/firestore");

module.exports.createData = async (deviceId, data) => {
  try {
    return await addDoc(collection(db, "devices", deviceId, "data"), data);
  } catch (error) {
    throw Error(JSON.stringify({ path: "DataRepository - createData()", error: error.message }));
  }
};

module.exports.readData = async (deviceId, dataId) => {
  try {
    const _doc = await getDoc(doc(db, "devices", deviceId, "data", dataId));
    return [{ ..._doc.data(), dataId: _doc.id }];
  } catch (error) {
    throw Error(JSON.stringify({ path: "DataRepository - readData()", error: error.message }));
  }
};

module.exports.readDatas = async (deviceId) => {
  try {
    const data = await getDocs(query(collection(db, "devices", deviceId, "data"), orderBy("recivedDataAt", "asc")));
    return data.docs.map((_doc) => ({ ..._doc.data(), dataId: _doc.id }));
  } catch (error) {
    throw Error(JSON.stringify({ path: "DataRepository - readDatas()", error: error.message }));
  }
};
