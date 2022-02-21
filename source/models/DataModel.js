const { serverTimestamp } = require("firebase/firestore");

class dataModel {
  // _defaultId;
  // _recivedData;
  // _recivedDataAt;
  // _transmittedData;
  // _transmittedDataAt;

  // constructor(data = {}) {
  //   this._defaultId = this._verifyStrigData(data.dataId);
  //   this._recivedData = this._verifyStrigData(data.dataId);
  //   this._recivedDataAt = this._verifyDateData(data.dataId);
  //   this._transmittedData = this._verifyStrigData(data.dataId);
  //   this._transmittedDataAt = this._verifyDateData(data.dataId);
  // }

  create(data = {}) {
    return {
      recivedData: this._verifyStrigData(data.recivedData),
      recivedDataAt: serverTimestamp(),
      transmittedData: this._verifyStrigData(data.transmittedData),
      transmittedDataAt: serverTimestamp(),
    };
  }

  get(data = {}) {
    return {
      dataId: this._verifyStrigData(data.dataId),
      recivedData: this._verifyStrigData(data.recivedData),
      recivedDataAt: this._verifyDateData(data.recivedDataAt),
      transmittedData: this._verifyStrigData(data.transmittedData),
      transmittedDataAt: this._verifyDateData(data.transmittedDataAt),
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
