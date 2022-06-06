const {
  createDevice,
  readDevice,
  readDevices,
  updateDevice,
  deleteDevice,
} = require("../apis/DeviceAPI.js");
const { deleteData } = require("./DataService.js");
const DeviceModel = require("../models/DeviceModel.js");

module.exports.createDevice = async (bodyRequest) => {
  try {
    const _device = new DeviceModel(bodyRequest);
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

      _checkExistence(result, deviceId, "DEVICE");

      return new DeviceModel({ ...result.data(), deviceId: result.id }).get();
    } catch (error) {
      throw error;
    }
  } else {
    return _readDevices();
  }
};

const _readDevices = async () => {
  try {
    const result = await readDevices();
    const _devices = result.docs.map((_doc) => ({
      ..._doc.data(),
      deviceId: _doc.id,
    }));

    _checkExistence(_devices, null, "DEVICES");

    const devices = _devices.map((device) => new DeviceModel(device).get());
    return devices;
  } catch (error) {
    throw error;
  }
};

module.exports.updateDevice = async (bodyRequest) => {
  try {
    const _oldDevice = await this.readDevice(bodyRequest);
    const _newDevice = new DeviceModel(bodyRequest);

    _newDevice.update(_oldDevice);

    await updateDevice(bodyRequest.deviceId, _newDevice.toJSON());

    const newDevice = await this.readDevice(bodyRequest);

    return newDevice;
  } catch (error) {
    throw error;
  }
};

module.exports.deleteDevice = async (bodyRequest) => {
  const { deviceId } = bodyRequest;

  if (deviceId) {
    try {
      await deleteData(deviceId);
      await deleteDevice(deviceId);
      return { message: "Dispositivo excluído com sucesso!" };
    } catch (error) {
      throw error;
    }
  } else {
    return _deleteDevices();
  }
};

const _deleteDevices = async () => {
  try {
    const devices = await _readDevices();
    devices.map(async (device) => {
      await deleteData(device.deviceId);
      await deleteDevice(device.deviceId);
    });
    return { message: "Dispositivos excluídos com sucesso!" };
  } catch (error) {
    throw error;
  }
};

const _checkExistence = (data, deviceId, sender) => {
  switch (sender) {
    case "DEVICE":
      if (!data.data()) {
        throw Error(
          JSON.stringify({
            status: 404,
            path: "DeviceService - readDevice()",
            message: `[deviceId: ${deviceId}] Dispositivo não encontrado.`,
          })
        );
      }
      break;

    case "DEVICES":
      if (!data.length) {
        throw Error(
          JSON.stringify({
            status: 404,
            path: "DeviceService - readDevices()",
            message: `[deviceId: ${deviceId}] Dispositivos não encontrados.`,
          })
        );
      }
      break;

    default:
      break;
  }
};
