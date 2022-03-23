const { serverTimestamp } = require("firebase/firestore");

class dataModel {
  _dataId;
  _recivedData;
  _recivedDataAt;
  _transmittedData;
  _transmittedDataAt;

  constructor(data = {}) {
    this._dataId = this._verifyStrigData(data.dataId);
    this._recivedData = this._verifyStrigData(data.recivedData);
    this._recivedDataAt = this._verifyDateData(data.recivedDataAt);
    this._transmittedData = this._verifyStrigData(data.transmittedData);
    this._transmittedDataAt = this._verifyDateData(data.transmittedDataAt);
  }

  create() {
    return {
      recivedData: this._recivedData,
      recivedDataAt: serverTimestamp(),
      transmittedData: this._transmittedData,
      transmittedDataAt: serverTimestamp(),
    };
  }

  get() {
    return {
      dataId: this._dataId,
      recivedData: this._recivedData,
      recivedDataAt: this._recivedDataAt,
      transmittedData: this._transmittedData,
      transmittedDataAt: this._transmittedDataAt,
    };
  }

  toJSON() {
    return {
      recivedData: this._recivedData,
      recivedDataAt: this._recivedDataAt,
      transmittedData: this._transmittedData,
      transmittedDataAt: this._transmittedDataAt,
    };
  }

  _verifyStrigData(data) {
    return data != undefined ? data : "";
  }

  _verifyDateData(data) {
    return data != undefined ? this._formatFirestoreDate(data.seconds) : this._formatFirestoreDate(-2208977612);
  }

  _formatFirestoreDate(serverTimestampField) {
    const date = new Date(serverTimestampField * 1000).toLocaleString("pt-BR");
    return date;
  }
}

module.exports = dataModel;
