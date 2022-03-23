const { createData, readData, readDatas } = require("../apis/DataAPI.js");
const DataModel = require("../models/DataModel.js");

module.exports.createData = async (data) => {
  try {
    const _data = new DataModel(data).create();
    const dataId = (await createData(data.deviceId, _data)).id;
    return { dataId };
  } catch (error) {
    throw error;
  }
};

module.exports.readData = async (bodyRequest) => {
  const { deviceId, dataId } = bodyRequest;

  if (dataId) {
    try {
      const result = await readData(deviceId, dataId);
      return new DataModel(result[0]).get();
    } catch (error) {
      throw error;
    }
  } else {
    return await this.readDatas(deviceId);
  }
};

module.exports.readDatas = async (deviceId) => {
  try {
    const result = await readDatas(deviceId);
    return (datas = result.map((data) => {
      return new DataModel(data).get();
    }));
  } catch (error) {
    throw error;
  }
};
