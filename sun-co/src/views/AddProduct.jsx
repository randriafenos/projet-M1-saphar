
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./AddProduct.scss";

function AddProduct() {
  const [formData, setFormData] = useState({
    brand: "",
    name: "",
    price: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null); // 🔥 ID du produit en édition

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("brand", formData.brand);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    if (formData.image && typeof formData.image !== "string") {
      formDataToSend.append("image", formData.image);
    }

    try {
      const url = editingId
        ? `http://localhost:5000/api/products/${editingId}`
        : "http://localhost:5000/api/products";

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (!res.ok) throw new Error("Échec de l'opération");

      const data = await res.json();

      if (editingId) {
        // 🔁 Mise à jour dans la liste
        setProducts((prev) =>
          prev.map((p) => (p._id === editingId ? data.product : p))
        );
        alert("Produit mis à jour !");
      } else {
        setProducts((prev) => [...prev, data.product]);
        alert("Produit ajouté !");
      }

      // 🧼 Réinitialisation
      setFormData({ brand: "", name: "", price: "", image: null });
      setPreview(null);
      setEditingId(null);
    } catch (error) {
      alert(error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
//delete
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Supprimer ce produit ?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur de suppression");

      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert("Produit supprimé !");
    } catch (error) {
      alert("Erreur :", error.message);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      brand: product.brand,
      name: product.name,
      price: product.price,
      image: product.image, // On laisse tel quel si image n'est pas modifiée
    });
    setPreview(`http://localhost:5000${product.image}`);
    setEditingId(product._id);
  };

  return (
    <div className="add-product-container">
      <form className="product-form" onSubmit={handleSubmit} noValidate>
        <h2>{editingId ? "Modifier le Produit" : "Ajouter un Produit"}</h2>

        <div className={`input-group ${formData.brand ? "filled" : ""}`}>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
          <label>Marque</label>
        </div>

        <div className={`input-group ${formData.name ? "filled" : ""}`}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Nom</label>
        </div>

        <div className={`input-group ${formData.price ? "filled" : ""}`}>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <label>Prix</label>
        </div>

        <div className={`input-group ${formData.image ? "filled" : ""}`}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <label htmlFor="image-upload" className="file-label">
            Modifier l'image (facultatif)
          </label>
        </div>

        {preview && <img src={preview} alt="Preview" className="preview-thumb" />}

        <button type="submit" className="gradient-btn">
          {editingId ? "Mettre à jour" : "Ajouter"}
        </button>
      </form>

      <div className="product-preview">
        <h3>Liste des produits ajoutés</h3>
        {products.length === 0 ? (
          <p>Aucun produit pour le moment.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Marque</th>
                <th>Nom</th>
                <th>Prix</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod._id}>
                  <td>{prod.brand}</td>
                  <td>{prod.name}</td>
                  <td>{parseFloat(prod.price).toFixed(2)} Ar</td>
                  <td>
                    {prod.image ? (
                      <img
                        src={`http://localhost:5000${prod.image}`}
                        alt={prod.name}
                        className="preview-thumb"
                      />
                    ) : (
                      "Pas d'image"
                    )}
                  </td>
                  <td>
                    <FaEdit
                      style={{ cursor: "pointer", color: "#1976d2", marginRight: "10px" }}
                      onClick={() => handleEdit(prod)}
                      title="Modifier"
                    />
                    <FaTrash
                      style={{ cursor: "pointer", color: "#d32f2f" }}
                      onClick={() => handleDelete(prod._id)}
                      title="Supprimer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AddProduct;
