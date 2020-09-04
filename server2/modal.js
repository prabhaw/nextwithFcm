const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  deviceId: String,
  name: String,
});

const User = mongoose.model("users", userSchema);

module.exports = User;
