const { Timestamp } = require("firebase/firestore");
const { encryptData } = require("../utils/encryptData");

class UserModel {
  #userCreatedAt;
  #userId;
  #email;

  constructor(user = {}) {
    this.#userCreatedAt = this._verifyDateData(user.userCreatedAt);
    this.#userId = this._verifyStrigData(user.userId);
    this.#email = this._cryptoData(user.email);
  }

  get() {
    return {
      userCreatedAt: this.#userCreatedAt,
      userId: this.#userId,
      email: this.#email,
      deleted: false,
    };
  }

  set() {
    return {
      userCreatedAt: this.#userCreatedAt,
      userId: this.#userId,
      email: this.#email,
      deleted: true,
    };
  }

  _cryptoData(data) {
    if (typeof data == "string") {
      return data != undefined ? encryptData(data) : null;
    }
    return data != undefined ? data : null;
  }

  _verifyStrigData(data) {
    return data != undefined ? data : null;
  }

  _verifyDateData(data) {
    if (typeof data == "string") {
      return data != undefined ? Timestamp.fromDate(new Date(data * 1)) : null;
    }
    return data != undefined ? data : null;
  }
}

module.exports = UserModel;
