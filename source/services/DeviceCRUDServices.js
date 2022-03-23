const { createDevice, readDevice, readDevices, updateDevice, deleteDevice } = require("../apis/DeviceAPI.js");
const DeviceModel = require("../models/DeviceModel.js");

module.exports.createDevice = async (device) => {
  try {
    const _device = new DeviceModel(device);
    const deviceId = (await createDevice(_device.create())).id;
    return { deviceId };
  } catch (error) {
    throw error;
  }
};

module.exports.readDevice = async (bodyRequest) => {
  const { deviceId } = bodyRequest;

  if (deviceId) {
    try {
      const result = await readDevice(deviceId);
      return new DeviceModel(result[0]).get();
    } catch (error) {
      throw error;
    }
  } else {
    return this.readDevices();
  }
};

module.exports.readDevices = async () => {
  try {
    const result = await readDevices();
    return result.map((device) => {
      return new DeviceModel(device).get();
    });
  } catch (error) {
    throw error;
  }
};

module.exports.updateDevice = async (deviceId, newDevice) => {
  try {
    const _oldDevice = await this.readDevice(deviceId);
    let _newDevice = new DeviceModel(newDevice);

    _newDevice.update(_oldDevice);

    await updateDevice(deviceId, _newDevice.toJSON());

    _newDevice = await this.readDevice(deviceId);

    return _newDevice;
  } catch (error) {
    throw error;
  }
};

module.exports.deleteDevice = async (deviceId) => {
  try {
    await deleteDevice(deviceId);
  } catch (error) {
    throw error;
  }
};

module.exports.deleteDevices = async () => {
  try {
    const devices = await this.readDevices();
    devices.map(async (device) => await deleteDevice(device.deviceId));
  } catch (error) {
    throw error;
  }
};
