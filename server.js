const express = require("express");

const deviceRouter = require("./source/router/DeviceRouter.js");
const dataRouter = require("./source/router/DataRouter.js");

const app = express();

app.use(express.json());
app.use("/device", deviceRouter);
app.use("/data", dataRouter);

const PORT = 8080;
const server = app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));

module.exports = server;
