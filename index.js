const express = require("express");
const app = express();
const PORT = 8080;
const { createDevice, readDevice, updateDevice, deleteDevice } = require("./source/apis/DeviceAPI.js");
const { createData } = require("./source/apis/DataAPI.js");

const DeviceModel = require("./source/models/DeviceModel.js");
const DataModel = require("./source/models/DataModel.js");

app.use(express.json());

app.post("/postDevice", async (req, res) => {
  try {
    const device = new DeviceModel().create(req.body);
    await createDevice(device);
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/postData", async (req, res) => {
  try {
    const { deviceId } = req.body;

    const data = new DataModel().create(req.body);
    await createData(deviceId, data);
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/getDevice", async (req, res) => {
  try {
    const { deviceId } = req.body;

    const result = await readDevice(deviceId);
    device = new DeviceModel().get(result[0]);
    res.status(200).send(device);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/getDevices", async (req, res) => {
  try {
    const result = await readDevice();
    const devices = result.map((device) => {
      return new DeviceModel().get(device);
    });
    res.status(200).send(devices);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch("/patchDevice", async (req, res) => {
  try {
    const { deviceId } = req.body;

    let newDevice = req.body;
    newDevice = new DeviceModel().get(newDevice);

    let oldDevice = await readDevice(deviceId);
    oldDevice = new DeviceModel().get(oldDevice[0]);

    newDevice = new DeviceModel().update(oldDevice, newDevice);

    await updateDevice(deviceId, newDevice);
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/deleteDevice", async (req, res) => {
  try {
    const { deviceId } = req.body;

    await deleteDevice(deviceId);
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));
