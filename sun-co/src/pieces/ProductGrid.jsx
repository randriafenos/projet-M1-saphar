// // src/pages/ProductGrid.jsx

// import React, { useEffect, useState } from "react";
// import "./ProductGrid.scss";
// import ProductCard from "../components/ProductCard";
// import { useNavigate } from "react-router-dom";

// const ProductGrid = () => {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 5;

//   const navigate = useNavigate();

//   const handleClick = (id) => {
//     navigate(`/product/${id}`);
//   };

//   useEffect(() => {
//     fetch("http://localhost:5000/api/products")
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .catch((error) => console.error("Erreur lors du fetch :", error));
//   }, []);

//   const totalPages = Math.ceil(products.length / productsPerPage);
//   const start = (currentPage - 1) * productsPerPage;
//   const currentProducts = products.slice(start, start + productsPerPage);

//   return (
//     <div>
//       <div className="product-grid">
//         {currentProducts.map((product) => (
//           <div key={product._id} onClick={() => handleClick(product._id)}>
//             <ProductCard
//               brand={product.brand}
//               name={product.name}
//               price={product.price}
//               image={`http://localhost:5000${product.image}`}
//             />
//           </div>
//         ))}
//       </div>
//       <div className="pagination">
//         <button
//           onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           Précédent
//         </button>
//         <span>Page {currentPage} sur {totalPages}</span>
//         <button
//           onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//           disabled={currentPage === totalPages}
//         >
//           Suivant
//         </button>
//       </div>
//     </div>
//   );
// };


// export default ProductGrid;

import React, { useEffect, useState } from "react";
import "./ProductGrid.scss";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5; // ✅ Limite à 5 produits par page

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Erreur lors du fetch :", error));
  }, []);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const start = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(start, start + productsPerPage);

  return (
    <div>
      <div className="product-grid">
        {currentProducts.map((product) => (
          <div key={product._id} onClick={() => handleClick(product._id)}>
            <ProductCard
              brand={product.brand}
              name={product.name}
              price={product.price}
              image={`http://localhost:5000${product.image}`}
            />
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Précédent
        </button>

        {/* ✅ Mise en gras du numéro de page actif */}
        <span style={{ fontWeight: "bold" }}>
          Page {currentPage} sur {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;
