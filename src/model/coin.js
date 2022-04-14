const { mongoose, Schema } = require("mongoose");

const coinSchema = new Schema({
  coin: { type: String, required: true },
  price: { type: Number, required: true },
  timestamp: { type: String, default: Date.now() },
});

module.exports = mongoose.model("Coin", coinSchema);
