const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const Miniature = require("../models/miniature");

router.get("/", async (req, res) => {
  try {
    const miniatures = await Miniature.find();
    res.json(miniatures);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const miniature = await Miniature.findById(req.params.id);
    res.json(miniature);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.post("/", async (req, res) => {
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
});

router.patch("/:id", async (req, res) => {
  try {
    const miniature = await Miniature.removeById(req.params.id);
    const a1 = await miniature.remove();
    res.json(a1);
  } catch (err) {
    res.send("Error");
  }
});

router.patch("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  try {
    const miniature = await Miniature.findById(req.params.id);
    res.json(miniature);
  } catch (err) {
    res.send("Error" + err);
  }
});

module.exports = router;
