import React from "react";
import "./Home.scss";
import ProductGrid from "../pieces/ProductGrid";
import bannerImage from "../assets/images/banner-shoes.png";
// import Header from "../components/Header";

const Home = () => {
  return (
    <>
    {/* <Header/> */}
    <div className="container">
      <div className="banner">
        <div className="banner-content">
          <h1>Dzama madagascar</h1> <br /> 
           <p>Livraison a domicil les gas.</p> <br />
          <a href="#" className="btn">Shop Now</a>
        </div>
        {/* <img src={bannerImage} alt="Shoes Banner" /> */}
      </div>

      <ProductGrid />
    </div>
    </>
  );
};

export default Home;
