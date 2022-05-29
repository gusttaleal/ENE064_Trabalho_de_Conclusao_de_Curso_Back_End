const { createUser, readUser, updateUser } = require("../apis/AuthAPI.js");
const UserModel = require("../models/UserModel.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.createUser = async (headersRequest) => {
  try {
    _authenticateUser(headersRequest);

    const _user = new UserModel();
    const userId = (await createUser(_user.create())).id;
    return { userId };
  } catch (error) {
    throw error;
  }
};

module.exports.readUser = async (bodyRequest) => {
  try {
    const { userId } = _checkBody(bodyRequest);

    const result = await readUser(userId);

    _checkExistence(result, userId);

    return new UserModel({ ...result.data(), userId: result.id }).get();
  } catch (error) {
    throw error;
  }
};

module.exports.updateUser = async (bodyRequest) => {
  try {
    const _oldUser = await this.readUser(bodyRequest);
    const _newUser = new UserModel(bodyRequest);

    _newUser.update(_oldUser);

    await updateUser(bodyRequest.userId, _newUser.toJSON());

    const newUser = await this.readUser(bodyRequest);

    return newUser;
  } catch (error) {
    throw error;
  }
};

const _checkBody = (bodyRequest) => {
  const userId = bodyRequest.userId;
  if (userId) {
    return { userId };
  } else {
    throw Error(
      JSON.stringify({
        status: 406,
        path: "UserService - readUser()",
        error: `Falta parâmetros obrigatórios.`,
      })
    );
  }
};

const _checkExistence = (data, userId) => {
  if (!data.data()) {
    throw Error(
      JSON.stringify({
        status: 404,
        path: "UserService - readUser()",
        error: `[userId: ${userId}] Usuário não encontrado.`,
      })
    );
  }
};

const _authenticateUser = (headersRequest) => {
  const authHeader = headersRequest["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  switch (token) {
    case process.env.ADMIN_TOKEN:
      jwt.verify(token, process.env.ADMIN_TOKEN_SECRET, (error, payload) => {
        if (error) {
          throw Error(
            JSON.stringify({
              status: 403,
              path: "Authentication",
              message: error.message,
            })
          );
        } else {
          payload.iat = new Date(payload.iat * 1000).toLocaleString("pt-BR");
        }
      });
      break;

    default:
      throw Error(
        JSON.stringify({
          status: 401,
          path: "Authentication",
          error: `[token: ${token}] Conexão não autorizada, token inválido`,
        })
      );
  }
};
