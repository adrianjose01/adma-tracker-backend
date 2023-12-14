const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const tranxRoutes = require("./routes/tranx");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  next();
});

app.use("/auth", authRoutes);
app.use("/tranx", tranxRoutes);

app.get("/test", (req, res, next) => {
  res.json({ meesage: "Works" });
});

app.use((error, req, res, next) => {
  console.log(error);
  const { statusCode } = error;
  const { message } = error;
  const { data } = error;
  res.status(statusCode).json({ message, data });
});

(async () => {
  await mongoose.connect(
    "mongodb+srv://adrian:87456766@test.lowwjqz.mongodb.net/expense?"
  );
  app.listen(8000);
})();
