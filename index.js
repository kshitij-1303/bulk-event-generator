require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3000;

const { readExcel } = require("./routes/readExcel");

const app = express();

app.use("/api", readExcel);

app.listen(PORT, () => {
  console.log(`app is listening to port ${PORT}`);
});
