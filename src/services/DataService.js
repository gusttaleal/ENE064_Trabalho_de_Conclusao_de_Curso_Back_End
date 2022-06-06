const {
  createData,
  readData,
  readDatas,
  deleteData,
} = require("../apis/DataAPI.js");
const DataModel = require("../models/DataModel.js");

module.exports.createData = async (bodyRequest) => {
  const { deviceId } = _checkBody(bodyRequest);

  try {
    const _data = new DataModel(bodyRequest).create();
    const dataId = (await createData(deviceId, _data)).id;
    return { dataId };
  } catch (error) {
    throw error;
  }
};

module.exports.readData = async (bodyRequest) => {
  const { deviceId, dataId } = _checkBody(bodyRequest);

  if (dataId) {
    try {
      const result = await readData(deviceId, dataId);

      _checkExistence(result, deviceId, dataId, "DATA");

      return new DataModel({ ...result.data(), dataId: result.id }).get();
    } catch (error) {
      throw error;
    }
  } else {
    return await _readDatas(deviceId);
  }
};

const _readDatas = async (deviceId) => {
  try {
    const result = await readDatas(deviceId);
    const _datas = result.docs.map((_doc) => ({
      ..._doc.data(),
      dataId: _doc.id,
    }));

    _checkExistence(_datas, deviceId, null, "DATAS");

    const datas = _datas.map((data) => new DataModel(data).get());
    return datas;
  } catch (error) {
    throw error;
  }
};

module.exports.deleteData = async (deviceId) => {
  try {
    const datas = await _readDatas(deviceId);
    datas.map(async (data) => {
      await deleteData(deviceId, data.dataId);
    });
  } catch (error) {
    throw error;
  }
};

const _checkBody = (bodyRequest) => {
  const deviceId = bodyRequest.deviceId;
  const dataId = bodyRequest.dataId;
  if (deviceId) {
    return { deviceId, dataId };
  } else {
    throw Error(
      JSON.stringify({
        status: 406,
        path: "DataService - readData()",
        message: `Falta parâmetros obrigatórios.`,
      })
    );
  }
};

const _checkExistence = (data, deviceId, dataId, sender) => {
  switch (sender) {
    case "DATA":
      if (!data.data()) {
        /*
        Implementar um Logger c/ winston

        const winston = require("winston");
        const LoggingWinston = require("@google-cloud/logging-winston");
        
        */
        // throw Error(
        //   JSON.stringify({
        //     status: 404,
        //     path: "DataService - readData()",
        //     message: `[deviceId: ${deviceId}][dataId: ${dataId}] Dado não encontrado.`,
        //   })
        // );
      }
      break;

    case "DATAS":
      if (!data.length) {
        /*
        Implementar um Logger c/ winston

        const winston = require("winston");
        const LoggingWinston = require("@google-cloud/logging-winston");

        */
        // throw Error(
        //   JSON.stringify({
        //     status: 404,
        //     path: "DataService - readDatas()",
        //     message: `[deviceId: ${deviceId}] Dados não encontrados.`,
        //   })
        // );
      }
      break;

    default:
      break;
  }
};
