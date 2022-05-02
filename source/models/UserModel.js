const { serverTimestamp } = require("firebase/firestore");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

class UserModel {
  #createdAt;
  #userId;
  #secret;
  #token;
  #updatedAt;

  constructor(user = {}) {
    this.#createdAt = this._verifyDateData(user.userCreatedAt);
    this.#userId = this._verifyStrigData(user.userId);
    this.#secret = this._verifyStrigData(user.userSecret);
    this.#token = this._verifyStrigData(user.accessToken);
    this.#updatedAt = this._verifyDateData(user.userUpdatedAt);
  }

  create() {
    const _userSecret = this._createUserSecret();
    const _accessToken = this._createUserToken(_userSecret);

    return {
      userCreatedAt: serverTimestamp(),
      userSecret: _userSecret,
      accessToken: _accessToken,
      userUpdatedAt: serverTimestamp(),
    };
  }

  get() {
    return {
      userCreatedAt: this.#createdAt,
      userId: this.#userId,
      accessToken: this.#token,
      userUpdatedAt: this.#updatedAt,
    };
  }

  toJSON() {
    return {
      userSecret: this.#secret,
      accessToken: this.#token,
      userUpdatedAt: this.#updatedAt,
    };
  }

  update(oldUser = {}) {
    this.#secret = this.#secret != null ? this.#secret : oldUser.userSecret;
    this.#token = this.#token != null ? this.#token : oldUser.accessToken;
    this.#updatedAt = serverTimestamp();
  }

  _createUserSecret() {
    return crypto.randomBytes(256).toString("hex");
  }

  _createUserToken(secret) {
    return jwt.sign({ userType: "user", admin: false }, secret);
  }

  _verifyStrigData(data) {
    return data != undefined ? data : null;
  }

  _verifyDateData(data) {
    return data != undefined ? this._formatFirestoreDate(data.seconds) : null;
  }

  _formatFirestoreDate(serverTimestampField) {
    const date = new Date(serverTimestampField * 1000).toLocaleString("pt-BR");
    return date;
  }
}

module.exports = UserModel;
