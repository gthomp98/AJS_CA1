const mongoose = require("mongoose");
const Miniature = require("./models/miniature");
const dbConfig = require("./config/db.config");
//This is a seed script, which can be executed separately from the main api. This is used to fill the api with data in order for the api to be ready for use out of the box
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Seed Connected");
  })
  .catch((err) => {
    console.log(err);
  });
//This is a json array full of miniature objects that will be inserted into the db when the script is run
const seedMiniatures = [
  {
    name: "Lorgar",
    faction: "Word Bearers",
    inPrint: false,
    price: 45.99,
    inStock: false,
  },
  {
    name: "Dante",
    faction: "Blood Angels",
    inPrint: true,
    price: 18.99,
    inStock: true,
  },

  {
    name: "Tigirius",
    faction: "Ultra Marines",
    inPrint: true,
    price: 24.99,
    inStock: false,
  },

  {
    name: "Typhus",
    faction: "Death Guard",
    inPrint: true,
    price: 18.99,
    inStock: true,
  },

  {
    name: "Konrad Kurze",
    faction: "Night Lords",
    inPrint: true,
    price: 45.99,
    inStock: false,
  },
];

const seedDB = async () => {
  await Miniature.deleteMany({});
  await Miniature.insertMany(seedMiniatures);
};

seedDB().then(() => {
  mongoose.connection.close();
});
