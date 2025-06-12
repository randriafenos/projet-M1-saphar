const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product");

// Config multer pour stocker l'image dans /uploads et garder le nom original
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// GET tous les produits
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST créer un produit avec image
router.post("/", upload.single("image"), async (req, res) => {
  const { brand, name, price } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const product = new Product({ brand, name, price, imageUrl });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE produit par ID
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Produit supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT modifier produit par ID (optionnel)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { brand, name, price } = req.body;
    const updateData = { brand, name, price };
    if (req.file) updateData.imageUrl = `/uploads/${req.file.filename}`;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
