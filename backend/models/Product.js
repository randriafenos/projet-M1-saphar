const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }, // Chemin du fichier
});

module.exports = mongoose.model("Product", productSchema);
