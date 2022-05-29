const express = require("express");
const cors = require("cors");

const deviceRouter = require("./src/router/DeviceRouter.js");
const dataRouter = require("./src/router/DataRouter.js");
const authRouter = require("./src/router/AuthRouter.js");

const app = express();

app.use(
  cors({
    origin: true,
  })
);

app.use(express.json());
app.use("/device", deviceRouter);
app.use("/data", dataRouter);
app.use("/auth", authRouter);

const PORT = 5000;
const server = app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));

module.exports = server;
