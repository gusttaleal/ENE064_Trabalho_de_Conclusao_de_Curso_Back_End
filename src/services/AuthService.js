const {
  createUser,
  readUser,
  readUsers,
  updateUser,
} = require("../apis/AuthAPI.js");
const { decryptData } = require("../utils/decryptData");
const UserModel = require("../models/UserModel.js");

module.exports.createUser = async (bodyRequest) => {
  try {
    const user = new UserModel(bodyRequest).get();

    const isDeleted = await checkIfTheUserIsAlreadyDeleted(user.email);
    if (isDeleted) {
      throw Error(
        JSON.stringify({
          status: 403,
          path: "AuthService - createUser()",
          message: `Usuário excluído da base.`,
        })
      );
    }
    if (bodyRequest.userCreatedAt * 1 === bodyRequest.userLastLoginAt * 1) {
      await createUser(user);
      return user.userId;
    }
  } catch (error) {
    throw error;
  }
};

// module.exports.readUser = async (bodyRequest) => {
//   try {
//     const { userId } = _checkBody(bodyRequest);

//     const result = await readUser(userId);

//     _checkExistence(result, userId);

//     return new UserModel({ ...result.data(), userId: result.id }).get();
//   } catch (error) {
//     throw error;
//   }
// };

// module.exports.updateUser = async (bodyRequest) => {
//   try {
//     const _oldUser = await this.readUser(bodyRequest);
//     const _newUser = new UserModel(bodyRequest);

//     _newUser.update(_oldUser);

//     await updateUser(bodyRequest.userId, _newUser.toJSON());

//     const newUser = await this.readUser(bodyRequest);

//     return newUser;
//   } catch (error) {
//     throw error;
//   }
// };

module.exports.deleteUser = async (bodyRequest) => {
  const { userId } = bodyRequest;

  if (!userId) {
    throw Error(
      JSON.stringify({
        status: 406,
        path: "AuthService - deleteUser()",
        message: `Falta parâmetros obrigatórios.`,
      })
    );
  }

  try {
    const _user = (await readUser(userId)).data();
    const user = new UserModel(_user).set();

    if (user.userId == null) {
      throw Error(
        JSON.stringify({
          status: 403,
          path: "AuthService - deleteUser()",
          message: `Usuário não encontrado na base.`,
        })
      );
    }

    const isDeleted = await checkIfTheUserIsAlreadyDeleted(user.email);
    if (isDeleted) {
      throw Error(
        JSON.stringify({
          status: 403,
          path: "AuthService - deleteUser()",
          message: `Usuário excluído da base.`,
        })
      );
    }

    await updateUser(user.userId, user);
    return user.userId;
  } catch (error) {
    throw error;
  }
};

// const _checkBody = (bodyRequest) => {
//   const userId = bodyRequest.userId;
//   if (userId) {
//     return { userId };
//   } else {
//     throw Error(
//       JSON.stringify({
//         status: 406,
//         path: "AuthService - readUser()",
//         message: `Falta parâmetros obrigatórios.`,
//       })
//     );
//   }
// };

const _checkExistence = (data, userId) => {
  if (!data.data()) {
    throw Error(
      JSON.stringify({
        status: 404,
        path: "AuthService - readUser()",
        message: `[userId: ${userId}] Usuário não encontrado.`,
      })
    );
  }
};

const checkIfTheUserIsAlreadyDeleted = async (email) => {
  try {
    const decryptedEmail = decryptData(email);

    const result = await readUsers();
    const emails = result.docs.map((_user) => decryptData(_user.data().email));

    const index = emails.findIndex((_email) => _email === decryptedEmail);

    const isAlreadyDeleted =
      index >= 0 ? result.docs[index].data().deleted : false;

    return isAlreadyDeleted;
  } catch (error) {
    throw error;
  }
};
