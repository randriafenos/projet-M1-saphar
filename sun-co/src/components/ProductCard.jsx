import React from "react";
import "./ProductCard.scss";

const ProductCard = ({ brand, name, price, image }) => {
  return (
    <div className="card">
      <img src={image} alt={name} />
      <h3>{brand}</h3>
      <p>{name}</p>
      <p className="price">Ar{price}</p>
    </div>
  );
};

export default ProductCard;
