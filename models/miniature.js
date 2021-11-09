//this is the miniature.js file, that should be called the miniature.model.js.
//This is the file that contains the schema for our miniature objects in the database.

const mongoose = require("mongoose");
//this is the miniature schema, which is a blueprint used for each miniature object in our database. It is in json format to deal with json objects.

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
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
    default: false,
  },
});
//this is then exported so that other files can use it.
module.exports = mongoose.model("Miniature", miniatureSchema);
