const { serverTimestamp } = require("firebase/firestore");

class DeviceModel {
  CreatedAt;
  Id;
  Name;
  Type;
  Status;
  UpdatedAt;

  constructor(device = {}) {
    this.CreatedAt = this._verifyDateData(device.deviceCreatedAt);
    this.Id = this._verifyStrigData(device.deviceId);
    this.Name = this._verifyStrigData(device.deviceName);
    this.Type = this._verifyStrigData(device.deviceType);
    this.Status = this._verifyBooleanData(device.deviceStatus);
    this.UpdatedAt = this._verifyDateData(device.deviceUpdatedAt);
  }

  create() {
    return {
      deviceCreatedAt: serverTimestamp(),
      deviceName: this.Name,
      deviceType: this.Type,
      deviceStatus: this.Status,
      deviceUpdatedAt: serverTimestamp(),
    };
  }

  get() {
    return {
      deviceCreatedAt: this.CreatedAt,
      deviceId: this.Id,
      deviceName: this.Name,
      deviceType: this.Type,
      deviceStatus: this.Status,
      deviceUpdatedAt: this.UpdatedAt,
    };
  }

  toJSON() {
    return {
      deviceName: this.Name,
      deviceType: this.Type,
      deviceStatus: this.Status,
      deviceUpdatedAt: this.UpdatedAt,
    };
  }

  update(oldDevice = {}) {
    this.Name = this.Name != "" ? this.Name : oldDevice.deviceName;
    this.Type = this.Type != "" ? this.Type : oldDevice.deviceType;
    this.Status =
      this.Status != ""
        ? oldDevice.deviceStatus === this.Status
          ? oldDevice.deviceStatus
          : this.Status
        : oldDevice.deviceStatus;
    this.UpdatedAt = serverTimestamp();
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
