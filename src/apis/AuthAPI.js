const { firestoreDataBase } = require("../configurations/FirebaseConfig");
const {
  doc,
  query,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
  orderBy,
} = require("firebase/firestore");

module.exports.createUser = async (user) => {
  try {
    await setDoc(doc(firestoreDataBase, "users", user.userId), user);
  } catch (error) {
    throw Error(
      JSON.stringify({
        path: "UserRepository - createUser()",
        message: error.message,
      })
    );
  }
};

module.exports.readUser = async (userId) => {
  try {
    return await getDoc(doc(firestoreDataBase, "users", userId));
  } catch (error) {
    throw Error(
      JSON.stringify({
        path: "UserRepository - readUser()",
        message: error.message,
      })
    );
  }
};

module.exports.readUsers = async () => {
  try {
    return await getDocs(
      query(
        collection(firestoreDataBase, "users"),
        orderBy("userCreatedAt", "asc")
      )
    );
  } catch (error) {
    throw Error(
      JSON.stringify({
        path: "UserRepository - readUser()",
        message: error.message,
      })
    );
  }
};

module.exports.updateUser = async (userId, user) => {
  try {
    await updateDoc(doc(firestoreDataBase, "users", userId), user);
  } catch (error) {
    throw Error(
      JSON.stringify({
        path: "UserRepository - updateUser()",
        message: error.message,
      })
    );
  }
};
