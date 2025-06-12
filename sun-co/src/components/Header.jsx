// import React, { useContext } from "react";
// import "./Header.scss";
// import logo from "../assets/images/logo.png";
// import { CartContext } from "../components/CartContext"; // <= import

// const Header = () => {
//   const { cartCount } = useContext(CartContext); // <= utilise le contexte

//   return (
//     <header className="header">
//       <div className="logo">
//         <img src={logo} alt="Logo" width="40" />
//         <span>SUN CO</span>
//       </div>
//       <button className="cart-button">🛒 Cart ({cartCount})</button>
//     </header>
//   );
// };

// export default Header;

// src/components/Header.jsx
import React, { useContext, useState } from "react";
import "./Header.scss";
import logo from "../assets/images/dzama-logo.jpg";
import { CartContext } from "./CartContext";
import CartModal from "./CartModal";

const Header = () => {
  const { cartCount } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" width="40" />
        <span>DZAMA</span>
      </div>

      <button className="cart-button" onClick={() => setShowModal(true)}>
        🛒 Cart ({cartCount})
      </button>

      {showModal && <CartModal onClose={() => setShowModal(false)} />}
    </header>
  );
};

export default Header;
