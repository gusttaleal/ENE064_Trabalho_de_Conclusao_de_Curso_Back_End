const { serverTimestamp } = require("firebase/firestore");

class DeviceModel {
  // _defaultId;
  // _defaultName;
  // _defaultType;
  // _defaultStatus;
  // _defaultCreatedAt;
  // _defaultUpdatedAt;

  // constructor(device = {}) {
  //   this._defaultId = this._verifyStrigData(device.deviceId);
  //   this._defaultName = this._verifyStrigData(device.deviceName);
  //   this._defaultType = this._verifyStrigData(device.deviceType);
  //   this._defaultStatus = this._verifyBooleanData(device.deviceStatus);
  //   this._defaultCreatedAt = this._verifyDateData(device.deviceCreatedAt);
  //   this._defaultUpdatedAt = this._verifyDateData(device.deviceUpdatedAt);
  // }

  create(device = {}) {
    return {
      deviceName: this._verifyStrigData(device.deviceName),
      deviceType: this._verifyStrigData(device.deviceType),
      deviceStatus: this._verifyBooleanData(device.deviceStatus),
      deviceCreatedAt: serverTimestamp(),
      deviceUpdatedAt: serverTimestamp(),
    };
  }

  get(device = {}) {
    return {
      deviceId: this._verifyStrigData(device.deviceId),
      deviceName: this._verifyStrigData(device.deviceName),
      deviceType: this._verifyStrigData(device.deviceType),
      deviceStatus: this._verifyBooleanData(device.deviceStatus),
      deviceCreatedAt: this._verifyDateData(device.deviceCreatedAt),
      deviceUpdatedAt: this._verifyDateData(device.deviceUpdatedAt),
    };
  }

  update(oldDevice = {}, newDevice = {}) {
    return {
      deviceName: newDevice.deviceName != "" ? newDevice.deviceName : oldDevice.deviceName,
      deviceType: newDevice.deviceType != "" ? newDevice.deviceType : oldDevice.deviceType,
      deviceStatus:
        newDevice.deviceStatus != ""
          ? oldDevice.deviceStatus === newDevice.deviceStatus
            ? oldDevice.deviceStatus
            : newDevice.deviceStatus
          : oldDevice.deviceStatus,
      deviceUpdatedAt: serverTimestamp(),
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

module.exports = DeviceModel;
