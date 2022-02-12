const express = require("express");
const app = express();

const PORT = 8080;

app.use(express.json());

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

app.get("/user", (req, res) => {
  res.status(200).send({
    id: 123,
    name: "Gustavo",
  });
});
