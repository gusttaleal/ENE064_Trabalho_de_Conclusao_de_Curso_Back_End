const { serverTimestamp } = require("firebase/firestore");

class DeviceModel {
  _createdAt;
  _deviceId;
  _name;
  _type;
  _status;
  _updatedAt;

  constructor(device = {}) {
    this._createdAt = this._verifyDateData(device.deviceCreatedAt);
    this._deviceId = this._verifyStrigData(device.deviceId);
    this._name = this._verifyStrigData(device.deviceName);
    this._type = this._verifyStrigData(device.deviceType);
    this._status = this._verifyBooleanData(device.deviceStatus);
    this._updatedAt = this._verifyDateData(device.deviceUpdatedAt);
  }

  create() {
    return {
      deviceCreatedAt: serverTimestamp(),
      deviceName: this._name,
      deviceType: this._type,
      deviceStatus: this._status,
      deviceUpdatedAt: serverTimestamp(),
    };
  }

  get() {
    return {
      deviceCreatedAt: this._createdAt,
      deviceId: this._deviceId,
      deviceName: this._name,
      deviceType: this._type,
      deviceStatus: this._status,
      deviceUpdatedAt: this._updatedAt,
    };
  }

  toJSON() {
    return {
      deviceName: this._name,
      deviceType: this._type,
      deviceStatus: this._status,
      deviceUpdatedAt: this._updatedAt,
    };
  }

  update(oldDevice = {}) {
    this._name = this._name != "" ? this._name : oldDevice.deviceName;
    this._type = this._type != "" ? this._type : oldDevice.deviceType;
    this._status =
      this._status != ""
        ? oldDevice.deviceStatus === this._status
          ? oldDevice.deviceStatus
          : this._status
        : oldDevice.deviceStatus;
    this._updatedAt = serverTimestamp();
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
    return new Date(serverTimestampField * 1000).toLocaleString("pt-BR");
  }
}

module.exports = DeviceModel;
