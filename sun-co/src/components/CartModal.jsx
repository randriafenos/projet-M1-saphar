// // src/components/CartModal.jsx
// // import React, { useContext } from "react";
// import { CartContext } from "./CartContext";
// import "./CartModal.scss";
// import React, { useContext, useEffect, useState } from "react";


// const CartModal = ({ onClose }) => {
//     const { cartItems, cartCount, setCartItems, setCartCount } = useContext(CartContext);
  
//     // 🔢 Calcul du prix total à payer
//     const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
//     const handleEdit = (index) => {
//       const newQuantity = prompt("Entrez la nouvelle quantité :");
//       const parsedQuantity = parseInt(newQuantity, 10);
//       if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
//         const updatedItems = [...cartItems];
//         updatedItems[index].quantity = parsedQuantity;
//         setCartItems(updatedItems);
//       } else {
//         alert("Quantité invalide.");
//       }
//     };
  
//     const handleDelete = (index) => {
//       const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?");
//       if (confirmDelete) {
//         const updatedItems = [...cartItems];
//         updatedItems.splice(index, 1);
//         setCartItems(updatedItems);
//         setCartCount((prev) => prev - 1);
//       }
//     };
//     // useEffect(() => {
//     //   fetch(`http://localhost:5000/api/products/${id}`)
//     //     .then((res) => {
//     //       if (!res.ok) {
//     //         throw new Error("Produit non trouvé");
//     //       }
//     //       return res.json();
//     //     })
//     //     .then((data) => setProduct(data))
//     //     .catch((err) => setError(err.message));
//     // }, [id]);
  
//     return (
//       <div className="cart-modal-overlay">
//         <div className="cart-modal">
//           <button className="close-btn" onClick={onClose}>✖</button>
//           <h2>Votre panier 🛒</h2>
  
//           {cartItems.length === 0 ? (
//             <p>Votre panier est vide.</p>
//           ) : (
//             <ul className="cart-items-list">
//               {cartItems.map((item, index) => (
//                 <li key={item._id}>
//                   <img src={`http://localhost:5000${item.image}`} alt={item.name} />
//                   <div>
//                     <p>{item.name}</p>
//                     <p>Quantité: {item.quantity}</p>
//                     <p>Prix unitaire: Ar {item.price}</p>
//                     <p><strong>Total: Ar {item.price * item.quantity}</strong></p>
//                     <div className="cart-actions">
//                       <button onClick={() => handleEdit(index)}>✎</button>
//                       <button onClick={() => handleDelete(index)}>🗑</button>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
  
//           <div className="cart-total">
//             <p>Articles: {cartCount}</p>
//             <p><strong>Total à payer: Ar {totalPrice}</strong></p>
//           </div>
  
//           <button className="checkout-btn">Passer à la caisse</button>
//         </div>
//       </div>
//     );
//   };
  

// export default CartModal;


// src/components/CartModal.jsx
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import "./CartModal.scss";

const CartModal = ({ onClose }) => {
  const { cartItems, cartCount, setCartItems, setCartCount } = useContext(CartContext);

  // 🔢 Calcul du prix total à payer
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleEdit = (index) => {
    const newQuantity = prompt("Entrez la nouvelle quantité :");
    const parsedQuantity = parseInt(newQuantity, 10);
    if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
      const updatedItems = [...cartItems];
      updatedItems[index].quantity = parsedQuantity;
      setCartItems(updatedItems);
    } else {
      alert("Quantité invalide.");
    }
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?");
    if (confirmDelete) {
      const updatedItems = [...cartItems];
      updatedItems.splice(index, 1);
      setCartItems(updatedItems);
      setCartCount((prev) => prev - 1);
    }
  };

  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Votre panier 🛒</h2>

        {cartItems.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <ul className="cart-items-list">
            {cartItems.map((item, index) => (
              <li key={item._id || index}>
                <img src={`http://localhost:5000${item.image}`} alt={item.name} />
                <div>
                  <p>{item.name}</p>
                  <p>Quantité: {item.quantity}</p>
                  <p>Prix unitaire: Ar {item.price}</p>
                  <p><strong>Total: Ar {item.price * item.quantity}</strong></p>
                  <div className="cart-actions">
                    <button onClick={() => handleEdit(index)}>✎</button>
                    <button onClick={() => handleDelete(index)}>🗑</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="cart-total">
          <p>Articles: {cartCount}</p>
          <p><strong>Total à payer: Ar {totalPrice}</strong></p>
        </div>

        <button className="checkout-btn">Passer à la caisse</button>
      </div>
    </div>
  );
};

export default CartModal;
