const { serverTimestamp } = require("firebase/firestore");

class dataModel {
  _defaultId;
  _defaultName;
  _defaultType;
  _defaultStatus;
  _defaultCreatedAt;
  _defaultUpdatedAt;

  constructor(data = {}) {
    this._defaultId = this._verifyStrigData(data.dataId);
    this._defaultName = this._verifyStrigData(data.dataName);
    this._defaultType = this._verifyStrigData(data.dataType);
    this._defaultStatus = this._verifyBooleanData(data.dataStatus);
    this._defaultCreatedAt = this._verifyDateData(data.dataCreatedAt);
    this._defaultUpdatedAt = this._verifyDateData(data.dataUpdatedAt);
  }

  create(data = {}) {
    return {
      recivedData: this._verifyStrigData(data.recivedData),
      recivedDataAt: serverTimestamp(),
      transmittedData: this._verifyStrigData(data.transmittedData),
      transmittedDataAt: serverTimestamp(),
      dataCreatedAt: serverTimestamp(),
    };
  }

  get(data = {}) {
    return {
      dataId: this._verifyStrigData(data.dataId),
      dataName: this._verifyStrigData(data.dataName),
      dataType: this._verifyStrigData(data.dataType),
      dataStatus: this._verifyBooleanData(data.dataStatus),
      dataCreatedAt: this._verifyDateData(data.dataCreatedAt),
      dataUpdatedAt: this._verifyDateData(data.dataUpdatedAt),
    };
  }

  update(olddata = {}, newdata = {}) {
    return {
      dataName: newdata.dataName != "" ? newdata.dataName : olddata.dataName,
      dataType: newdata.dataType != "" ? newdata.dataType : olddata.dataType,
      dataStatus:
        newdata.dataStatus != ""
          ? olddata.dataStatus === newdata.dataStatus
            ? olddata.dataStatus
            : newdata.dataStatus
          : olddata.dataStatus,
      dataUpdatedAt: serverTimestamp(),
    };
  }

  _verifyStrigData(data) {
    return data != undefined ? data : "";
  }
  _verifyBooleanData(data) {
    return data != undefined ? data : false;
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
