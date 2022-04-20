const { mongoose, Schema } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  timestamp: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("User", userSchema);
