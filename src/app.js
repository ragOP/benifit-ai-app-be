const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", require("../src/routes/user/index.js"));
app.use("/api/v1/auth", require("../src/routes/auth/user/index.js"));

module.exports = app;
