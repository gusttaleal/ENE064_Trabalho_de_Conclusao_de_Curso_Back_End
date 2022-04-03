const { serverTimestamp } = require("firebase/firestore");

class dataModel {
  #dataId;
  #recivedData;
  #recivedDataAt;
  #transmittedData;
  #transmittedDataAt;

  constructor(data = {}) {
    this.#dataId = this._verifyStrigData(data.dataId);
    this.#recivedData = this._verifyStrigData(data.recivedData);
    this.#recivedDataAt = this._verifyDateData(data.recivedDataAt);
    this.#transmittedData = this._verifyStrigData(data.transmittedData);
    this.#transmittedDataAt = this._verifyDateData(data.transmittedDataAt);
  }

  create() {
    return {
      recivedData: this.#recivedData,
      recivedDataAt: serverTimestamp(),
      transmittedData: this.#transmittedData,
      transmittedDataAt: serverTimestamp(),
    };
  }

  get() {
    return {
      dataId: this.#dataId,
      recivedData: this.#recivedData,
      recivedDataAt: this.#recivedDataAt,
      transmittedData: this.#transmittedData,
      transmittedDataAt: this.#transmittedDataAt,
    };
  }

  toJSON() {
    return {
      recivedData: this.#recivedData,
      recivedDataAt: this.#recivedDataAt,
      transmittedData: this.#transmittedData,
      transmittedDataAt: this.#transmittedDataAt,
    };
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

module.exports = dataModel;
