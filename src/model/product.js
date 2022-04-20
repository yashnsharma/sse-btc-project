const { mongoose, Schema } = require("mongoose");

const productSchema = new Schema({
    name: {type: String},
    type: {type: String},
    price: {type: Number},
    product_id: {type: String},
    timestamp: {type: Date, default: Date.now()}
})

module.exports = mongoose.model("Product", productSchema);