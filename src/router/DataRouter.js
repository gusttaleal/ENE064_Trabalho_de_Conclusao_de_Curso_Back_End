const express = require("express");

const router = express.Router();

const { createData, readData } = require("../services/DataService.js");

router.post("/", async (req, res) => {
  try {
    const data = await createData(req.body);

    res.status(200).send(data);
  } catch (error) {
    const message = JSON.parse(error.message);
    res.status(message.status ?? 500).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const param = {
      deviceId: req.url.split("=")[req.url.split("=").length - 1],
      dataId: null,
    };
    const data = await readData(param);

    res.status(200).send(data);
  } catch (error) {
    const message = JSON.parse(error.message);
    res.status(message.status ?? 500).send(error.message);
  }
});

module.exports = router;
