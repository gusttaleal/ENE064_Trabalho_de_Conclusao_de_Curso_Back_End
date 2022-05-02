const { db } = require("../configurations/FirebaseConfig");
const { doc, collection, addDoc, getDoc, updateDoc } = require("firebase/firestore");

module.exports.createUser = async (user) => {
  try {
    return await addDoc(collection(db, "users"), user);
  } catch (error) {
    throw Error(JSON.stringify({ path: "UserRepository - createUser()", message: error.message }));
  }
};

module.exports.readUser = async (userId) => {
  try {
    return await getDoc(doc(db, "users", userId));
  } catch (error) {
    throw Error(JSON.stringify({ path: "UserRepository - readUser()", message: error.message }));
  }
};

module.exports.updateUser = async (userId, user) => {
  try {
    await updateDoc(doc(db, "users", userId), user);
  } catch (error) {
    throw Error(JSON.stringify({ path: "UserRepository - updateUser()", message: error.message }));
  }
};
