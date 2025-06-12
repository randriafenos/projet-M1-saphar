const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const Product = require("./models/Product");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connexion MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/productsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.error("❌ Erreur MongoDB :", err));

// Multer config (pour uploader image)
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Routes
app.post("/api/products", upload.single("image"), async (req, res) => {
  try {
    const { brand, name, price } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newProduct = new Product({
      brand,
      name,
      price,
      image: imagePath,
    });

    await newProduct.save();
    res.status(201).json({ message: "Produit ajouté", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// Route GET : Récupérer tous les produits
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Mongoose
    if (!product) return res.status(404).json({ error: "Produit non trouvé" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

//Route DELETE
app.delete("/api/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// Route PUT (mise à jour produit)
app.put("/api/products/:id", upload.single("image"), async (req, res) => {
  try {
    const { brand, name, price } = req.body;
    const updatedFields = { brand, name, price };

    if (req.file) {
      updatedFields.image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true } // pour retourner le produit mis à jour
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.json({ message: "Produit mis à jour", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
