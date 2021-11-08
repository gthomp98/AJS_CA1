const mongoose = require("mongoose");
const Miniature = require("./models/miniature");
const dbConfig = require("./config/db.config");

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
