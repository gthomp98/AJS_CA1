//This is the miniature router, which contains all of the url extensions for the miniature part of the api. It also contains the methods that should
//probably be contained in the minaiture controller
//this is all of the imports needed for this
const passport = require("passport");
const settings = require("../middlewares/passport")(passport);
const jwt = require("jsonwebtoken");
const { getToken } = require("../middlewares/auth");

const express = require("express");
const { model } = require("mongoose");
const User = require("../models/user.model");
const { userProfile } = require("../controllers/users.controllers");
const { deleteOne } = require("../models/miniature");
const router = express.Router();
const Miniature = require("../models/miniature");
//This is the get all function to get miniatures
router.get("/", async (req, res) => {
  try {
    const miniatures = await Miniature.find();
    res.json(miniatures);
  } catch (err) {
    res.send("Error" + err);
  }
});
//this is the get miniature by id function
router.get("/:id", async (req, res) => {
  try {
    const miniature = await Miniature.findById(req.params.id);
    res.json(miniature);
  } catch (err) {
    res.send("Error" + err);
  }
});
//this is the post miniature function, that requires a token to access.
//it pushes a new miniature object into the database by using the miniature model
router.post("/", async (req, res) => {
  const token = await getToken(req.headers);
  if (!token) {
    return res.status(401);
  }
  let user = await jwt.verify(token, process.env.SECRET_KEY);

  if (user) {
    const miniature = new Miniature({
      name: req.body.name,
      faction: req.body.faction,
      inPrint: req.body.inPrint,
      price: req.body.price,
      inStock: req.body.inStock,
    });

    try {
      const a1 = await miniature.save();
      res.json(a1);
    } catch (err) {
      res.send("Error");
    }
  }
});
// this is the update function for miniature, it can only be accessed by somebody with a token
//It finds the existing miniature object by id thats passed into the query
//and replaces each field with what is pushed into the request body
router.patch("/:id", async (req, res) => {
  const token = getToken(req.headers);
  if (!token) return res.status(401);
  const user = jwt.verify(token, process.env.SECRET_KEY);
  if (user)
    try {
      const miniature = await Miniature.findById(req.params.id);
      miniature.name = req.body.name;
      miniature.faction = req.body.faction;
      miniature.inPrint = req.body.inPrint;
      miniature.price = req.body.price;
      miniature.inStock = req.body.inStock;
      const a1 = await miniature.save();
      res.json(a1);
    } catch (err) {
      res.send("Error");
    }
});
//this is the delete function for the miniature table, it requires a token and finds the object by id to delete.
router.delete("/:id", async (req, res) => {
  const token = getToken(req.headers);
  if (!token) return res.status(401);
  const user = jwt.verify(token, process.env.SECRET_KEY);
  if (user) {
    try {
      const miniature = await Miniature.findById(req.params.id);
      miniature.deleteOne({ _id: req.params.id }).then(
        res.status(200).json({
          message: "Deleted",
        })
      );
    } catch (err) {
      res.send("Error" + err);
    }
  }
});

module.exports = router;
