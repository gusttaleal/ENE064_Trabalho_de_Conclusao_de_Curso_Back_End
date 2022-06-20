const express = require("express");
const cors = require("cors");
var http = require("http");

const deviceRouter = require("./src/router/DeviceRouter.js");
const dataRouter = require("./src/router/DataRouter.js");
const authRouter = require("./src/router/AuthRouter.js");

const app = express();
var server = http.createServer(app);

app.use(
  cors({
    origin: true,
  })
);

app.use(express.json());
app.use("/device", deviceRouter);
app.use("/data", dataRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT;
const hostname = process.env.HOSTNAME;

server.listen(PORT, hostname);
server.on("listening", () => {
  console.log(
    "Express server started on port %s at %s",
    server.address().port,
    server.address().address
  );
});

module.exports = server;
