const { firestoreDataBase } = require("../configurations/FirebaseConfig");
const { doc, setDoc } = require("firebase/firestore");

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
