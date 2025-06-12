// // src/components/CartContext.jsx
// import React, { createContext, useState } from "react";

// // Création du contexte
// export const CartContext = createContext();

// // Fournisseur du contexte
// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [cartCount, setCartCount] = useState(0);

//   // Fonction pour ajouter un produit au panier
//   const addToCart = (product) => {
//     setCartItems((prev) => {
//       const existingIndex = prev.findIndex((item) => item._id === product._id);
//       if (existingIndex !== -1) {
//         const updatedItems = [...prev];
//         updatedItems[existingIndex].quantity += 1;
//         return updatedItems;
//       }
//       return [...prev, { ...product, quantity: 1 }];
//     });

//     const addToCart = (product) => {
//       if (!product._id) {
//         console.warn("Tentative d'ajout d'un produit sans _id :", product);
//         return;
//       }
//       setCartItems((prev) => {
//         const existingIndex = prev.findIndex((item) => item._id === product._id);
//         if (existingIndex !== -1) {
//           const updatedItems = [...prev];
//           updatedItems[existingIndex].quantity += 1;
//           return updatedItems;
//         }
//         return [...prev, { ...product, quantity: 1 }];
//       });
    
//       setCartCount((prev) => prev + 1);
//     };
    

//     setCartCount((prev) => prev + 1);
//   };

//   return (
//     <CartContext.Provider
//       value={{ cartItems, cartCount, addToCart, setCartItems, setCartCount }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// src/components/CartContext.jsx
import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (product, quantity) => {
    const existingIndex = cartItems.findIndex(item => item._id === product._id);

    if (existingIndex !== -1) {
      // Si l'article est déjà dans le panier, on met à jour la quantité
      const updatedItems = [...cartItems];
      updatedItems[existingIndex].quantity += quantity;
      setCartItems(updatedItems);
    } else {
      // Sinon, on l'ajoute avec la quantité
      setCartItems([...cartItems, { ...product, quantity }]);
      setCartCount(prev => prev + 1);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, cartCount, setCartItems, setCartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
