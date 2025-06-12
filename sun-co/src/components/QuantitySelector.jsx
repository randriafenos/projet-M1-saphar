// import React from "react";
// import "../styles/quantity-selector.scss";


// const QuantitySelector = ({ quantity, setQuantity }) => {
//   return (
//     <div className="quantity-selector">
//       <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>-</button>
//       <span>{quantity}</span>
//       <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
//     </div>
//   );
// };

// export default QuantitySelector;

// src/components/QuantitySelector.jsx
import React from "react";
import "../styles/quantity-selector.scss";

const QuantitySelector = ({ quantity, setQuantity }) => {
  return (
    <div className="quantity-selector">
      <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>-</button>
      <span>{quantity}</span>
      <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
    </div>
  );
};

export default QuantitySelector;

