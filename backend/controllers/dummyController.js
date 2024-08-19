const db = require("../models"); // Import the entire models module
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.dummyPath = (req, res) => {
  res.json({ message: "dummy path reached" });
};
