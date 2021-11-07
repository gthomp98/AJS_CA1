const { Double } = require("bson");
const mongoose = require("mongoose");

const miniatureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  faction: {
    type: String,
    required: true,
  },
  inPrint: {
    type: Boolean,
    required: true,
    default: false,
  },
  price: {
    type: Double,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Miniature", miniatureSchema);
