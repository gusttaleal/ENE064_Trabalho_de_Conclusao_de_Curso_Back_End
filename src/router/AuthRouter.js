const express = require("express");

const router = express.Router();

const { createUser, deleteUser } = require("../services/AuthService.js");

// router.get("/", async (req, res) => {
//   try {
//     const data = await readUser(req.headers);

//     res.status(200).send(data);
//     0;
//   } catch (err) {
//     const error = JSON.parse(err.message);
//     res.status(error.status ?? 500).send(error);
//   }
// });

router.post("/", async (req, res) => {
  try {
    const data = await createUser(req.body);

    res.status(200).send(data);
  } catch (err) {
    const error = JSON.parse(err.message);
    res.status(error.status ?? 500).send(error);
  }
});

router.patch("/", async (req, res) => {
  try {
    const data = await deleteUser(req.body);

    res.status(200).send(data);
  } catch (err) {
    const error = JSON.parse(err.message);
    res.status(error.status ?? 500).send(error);
  }
});

module.exports = router;
