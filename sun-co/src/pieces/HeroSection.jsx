import React from 'react';
import shoeImage from '../assets/hero-shoe.png';

const HeroSection = () => {
  return (
    <section className="bg-blue-50 p-8 rounded-xl flex items-center justify-between">
      <div>
        <p className="text-orange-600 text-xl font-bold">25% OFF</p>
        <h1 className="text-4xl font-extrabold mt-2">Summer Sale</h1>
        <p className="text-gray-600 mt-2">Discover our summer styles with discount</p>
        <button className="bg-black text-white px-6 py-2 rounded mt-4 hover:bg-gray-800">Shop Now →</button>
      </div>
      <img src={shoeImage} alt="Main Shoe" className="w-80" />
    </section>
  );
};

export default HeroSection;
