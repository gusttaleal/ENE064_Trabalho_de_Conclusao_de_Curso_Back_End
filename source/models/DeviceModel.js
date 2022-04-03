const { serverTimestamp } = require("firebase/firestore");

class DeviceModel {
  #createdAt;
  #deviceId;
  #name;
  #type;
  #status;
  #updatedAt;

  constructor(device = {}) {
    this.#createdAt = this._verifyDateData(device.deviceCreatedAt);
    this.#deviceId = this._verifyStrigData(device.deviceId);
    this.#name = this._verifyStrigData(device.deviceName);
    this.#type = this._verifyStrigData(device.deviceType);
    this.#status = this._verifyBooleanData(device.deviceStatus);
    this.#updatedAt = this._verifyDateData(device.deviceUpdatedAt);
  }

  create() {
    return {
      deviceCreatedAt: serverTimestamp(),
      deviceName: this.#name,
      deviceType: this.#type,
      deviceStatus: this.#status,
      deviceUpdatedAt: serverTimestamp(),
    };
  }

  get() {
    return {
      deviceCreatedAt: this.#createdAt,
      deviceId: this.#deviceId,
      deviceName: this.#name,
      deviceType: this.#type,
      deviceStatus: this.#status,
      deviceUpdatedAt: this.#updatedAt,
    };
  }

  toJSON() {
    return {
      deviceName: this.#name,
      deviceType: this.#type,
      deviceStatus: this.#status,
      deviceUpdatedAt: this.#updatedAt,
    };
  }

  update(oldDevice = {}) {
    this.#name = this.#name != null ? this.#name : oldDevice.deviceName;
    this.#type = this.#type != null ? this.#type : oldDevice.deviceType;
    this.#status =
      this.#status != null
        ? oldDevice.deviceStatus === this.#status
          ? oldDevice.deviceStatus
          : this.#status
        : oldDevice.deviceStatus;
    this.#updatedAt = serverTimestamp();
  }

  _verifyStrigData(data) {
    return data != undefined ? data : null;
  }
  _verifyBooleanData(data) {
    return data != undefined ? data : null;
  }
  _verifyDateData(data) {
    return data != undefined ? this._formatFirestoreDate(data.seconds) : null;
  }

  _formatFirestoreDate(serverTimestampField) {
    return new Date(serverTimestampField * 1000).toLocaleString("pt-BR");
  }
}

module.exports = DeviceModel;
