// import React, { useState } from "react";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("brand", formData.brand);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("image", formData.image);
  
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formDataToSend,
      });
      if (!res.ok) throw new Error("Erreur lors de l'ajout du produit");
  
      const newProduct = await res.json();
  
      // Ajouter dans l'état produits local (optionnel si tu récupères via GET)
      setProducts((prev) => [...prev, newProduct]);
  
      // Reset formulaire
      setFormData({ brand: "", name: "", price: "", image: null });
      setPreview(null);
  
      alert("Produit ajouté avec succès !");
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  };
  
  

  return (
    <div className="add-product-container">
      <form className="product-form" onSubmit={handleSubmit} noValidate>
        <h2>Ajouter un Produit</h2>

        <div className={`input-group ${formData.brand ? "filled" : ""}`}>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
          <label>Marque (brand)</label>
        </div>

        <div className={`input-group ${formData.name ? "filled" : ""}`}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Nom du produit (name)</label>
        </div>

        <div className={`input-group ${formData.price ? "filled" : ""}`}>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
          <label>Prix (price)</label>
        </div>

        <div className={`input-group ${formData.image ? "filled" : ""}`}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            id="image-upload"
          />
          <label htmlFor="image-upload" className="file-label">
            Importer une image
          </label>
        </div>

        <button type="submit" className="gradient-btn">
          Ajouter
        </button>
      </form>

      <div className="product-preview">
        <h3>Liste des produits ajoutés</h3>
        {products.length === 0 ? (
          <p>Aucun produit ajouté pour le moment.</p>
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
              {products.map((prod, i) => (
                <tr key={i}>
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
                      style={{ cursor: "pointer", marginRight: "10px", color: "#1976d2" }}
                      title="Modifier"
                      onClick={() => alert(`Modifier produit ${prod.name}`)}
                    />
                    <FaTrash
                      style={{ cursor: "pointer", color: "#d32f2f" }}
                      title="Supprimer"
                      onClick={() => alert(`Supprimer produit ${prod.name}`)}
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
