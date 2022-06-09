const express = require("express");

const router = express.Router();

const { createUser, deleteUser } = require("../services/AuthService.js");

router.post("/", async (req, res) => {
  try {
    const data = await createUser(req.body);

    res.status(200).send(data);
  } catch (err) {
    const error = JSON.parse(err.message);
    res.status(error.status ?? 500).send(error);
  }
});

module.exports = router;
