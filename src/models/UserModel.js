const { Timestamp } = require("firebase/firestore");
const { encryptData } = require("../utils/encryptData");

class UserModel {
  #userLastLoginAt;
  #userCreatedAt;
  #deleted;
  #userId;
  #email;

  constructor(user = {}) {
    this.#userLastLoginAt = this._verifyDateData(user.userCreatedAt);
    this.#userCreatedAt = this._verifyDateData(user.userCreatedAt);
    this.#deleted = this._verifyBooleanData(user.deleted);
    this.#userId = this._verifyStrigData(user.userId);
    this.#email = this._cryptoData(user.email);
  }

  get() {
    return {
      userLastLoginAt: this.#userLastLoginAt,
      userCreatedAt: this.#userCreatedAt,
      deleted: this.#deleted,
      userId: this.#userId,
      email: this.#email,
    };
  }

  _cryptoData(data) {
    if (typeof data == "string") {
      return encryptData(data);
    }
    return data != undefined ? data : null;
  }

  _verifyBooleanData(data) {
    return data != undefined ? data : false;
  }

  _verifyStrigData(data) {
    return data != undefined ? data : null;
  }

  _verifyDateData(data) {
    if (typeof data == "string") {
      return Timestamp.fromDate(new Date(data * 1));
    }
    return data != undefined ? data : null;
  }
}

module.exports = UserModel;
