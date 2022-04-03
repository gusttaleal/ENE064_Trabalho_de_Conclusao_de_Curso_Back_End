const express = require("express");

const router = express.Router();

const { createData, readData } = require("../services/DataService.js");

router.post("/post", async (req, res) => {
  try {
    const data = await createData(req.body);

    res.status(200).send(data);
  } catch (error) {
    const message = JSON.parse(error.message);
    res.status(message.status ?? 500).send(error.message);
  }
});

router.get("/get", async (req, res) => {
  try {
    const data = await readData(req.body);

    res.status(200).send(data);
  } catch (error) {
    const message = JSON.parse(error.message);
    res.status(message.status ?? 500).send(error.message);
  }
});

module.exports = router;
