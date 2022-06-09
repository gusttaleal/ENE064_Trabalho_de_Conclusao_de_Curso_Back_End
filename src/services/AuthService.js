const { createUser } = require("../apis/AuthAPI.js");
const UserModel = require("../models/UserModel.js");

module.exports.createUser = async (bodyRequest) => {
  try {
    const user = new UserModel(bodyRequest).get();
    await createUser(user);
    return { message: "User's credentials saved on Firestore" };
  } catch (error) {
    throw error;
  }
};
