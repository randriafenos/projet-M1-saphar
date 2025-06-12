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
