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
} = require("./source/services/DeviceServices.js");

const { createData } = require("./source/apis/DataAPI.js");

const DataModel = require("./source/models/DataModel.js");

app.use(express.json());

app.post("/postDevice", async (req, res) => {
  try {
    const device = req.body;

    const id = await createDevice(device);

    res.status(200).send(id);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/postData", async (req, res) => {
  try {
    const { deviceId } = req.body;

    const data = new DataModel().create(req.body);
    const id = (await createData(deviceId, data)).id;

    res.status(200).send({ id });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/getDevice", async (req, res) => {
  try {
    const { deviceId } = req.body;

    let devices;

    deviceId ? (devices = await readDevice(deviceId)) : (devices = await readDevices());

    res.status(200).send(devices);
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
