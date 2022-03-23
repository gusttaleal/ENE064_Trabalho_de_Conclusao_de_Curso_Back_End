const express = require("express");
const app = express();
const PORT = 8080;
const {
  createDevice,
  readDevice,
  readDevices,
  updateDevice,
  deleteDevice,
  deleteDevices,
} = require("./source/services/DeviceCRUDServices.js");

const { createData, readData } = require("./source/services/DataCRUDService.js");

const DataModel = require("./source/models/DataModel.js");

app.use(express.json());

app.post("/postDevice", async (req, res) => {
  try {
    const device = req.body;

    const deviceId = await createDevice(device);

    res.status(200).send(deviceId);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/postData", async (req, res) => {
  try {
    const data = req.body;

    const dataId = await createData(data);

    res.status(200).send(dataId);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/getDevice", async (req, res) => {
  try {
    const bodyRequest = req.body;

    const device = await readDevice(bodyRequest);

    res.status(200).send(device);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/getData", async (req, res) => {
  try {
    const bodyRequest = req.body;

    const data = await readData(bodyRequest);

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch("/patchDevice", async (req, res) => {
  try {
    const { deviceId } = req.body;

    let newDevice = req.body;

    newDevice = await updateDevice(deviceId, newDevice);

    res.status(200).send(newDevice);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/deleteDevice", async (req, res) => {
  try {
    const { deviceId } = req.body;

    deviceId ? await deleteDevice(deviceId) : await deleteDevices();

    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));
