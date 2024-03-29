const express = require("express");

const router = express.Router();

const {
  createDevice,
  readDevice,
  updateDevice,
  deleteDevice,
} = require("../services/DeviceService.js");

router.post("/", async (req, res) => {
  try {
    const data = await createDevice(req.body);

    res.status(200).send(data);
  } catch (err) {
    const error = JSON.parse(err.message);
    res.status(error.status ?? 500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await readDevice(req.body);

    res.status(200).send(data);
  } catch (err) {
    const error = JSON.parse(err.message);
    res.status(error.status ?? 500).send(error);
  }
});

router.patch("/", async (req, res) => {
  try {
    const data = await updateDevice(req.body);

    res.status(200).send(data);
  } catch (err) {
    const error = JSON.parse(err.message);
    res.status(error.status ?? 500).send(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    const data = await deleteDevice(req.body);

    res.status(200).send(data);
  } catch (err) {
    const error = JSON.parse(err.message);
    res.status(error.status ?? 500).send(error);
  }
});

module.exports = router;
