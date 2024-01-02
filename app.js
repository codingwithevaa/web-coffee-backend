const express = require("express");
const routers = require("./routes/index");
const cors = require("cors");
const errorHandling = require("./middlewares/errorHandling");

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Backend Final Project Vocasia - Kelompok 4");
});

app.use(routers);
app.use(errorHandling);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}...`);
});