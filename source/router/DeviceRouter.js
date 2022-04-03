const express = require("express");

const router = express.Router();

const { createDevice, readDevice, updateDevice, deleteDevice } = require("../services/DeviceServices.js");

router.post("/post", async (req, res) => {
  try {
    const data = await createDevice(req.body);

    res.status(200).send(data);
  } catch (error) {
    res.status(error.message.status ?? 500).send(error.message);
  }
});

router.get("/get", async (req, res) => {
  try {
    const data = await readDevice(req.body);

    res.status(200).send(data);
  } catch (error) {
    const message = JSON.parse(error.message);
    res.status(message.status ?? 500).send(error.message);
  }
});

router.patch("/patch", async (req, res) => {
  try {
    const data = await updateDevice(req.body);

    res.status(200).send(data);
  } catch (error) {
    const message = JSON.parse(error.message);
    res.status(message.status ?? 500).send(error.message);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const data = await deleteDevice(req.body);

    res.status(200).send(data);
  } catch (error) {
    const message = JSON.parse(error.message);
    res.status(message.status ?? 500).send(error.message);
  }
});

module.exports = router;
