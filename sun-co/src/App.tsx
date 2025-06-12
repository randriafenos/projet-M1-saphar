import "./main.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./views/Home";
import Product from "./views/Product";
import AddProduct from "./views/AddProduct";
import { CartProvider } from "./components/CartContext"; // ✅ import du contexte

const App = () => {
  return (
    <CartProvider>
      {" "}
      {/* ✅ Fournit le contexte à toute l'application */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AddProduct />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
