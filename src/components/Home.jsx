import React from "react";
import { Link } from "react-router-dom";
import yourImage from "/images/food-homepage.webp"; 
import "./Home.css";

const Home = () => {
  return (
    <div className="relative container mx-auto px-4 py-8">
      {/* Image section */}
      <div className="relative">
        <img
          src={yourImage} 
          alt="Recipe" 
          className="w-full h-[500px] object-cover rounded-lg shadow-lg" 
        />
        
        
        <div className=// absolute top-3 left-0 right-0 bottom-0 flex flex-col justify-center items-center text-center text-white bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-opacity-60 
        "hero-item">
          <h1 className="text-5xl font-extrabold mb-6">Discover Tasty Recipes to Try!</h1>
          {/* <p className="text-xl mb-6">
          Cook up something amazing with easy-to-follow recipes!
          </p> */}
          <Link
            to="/recipes" 
            className="bg-yellow-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-yellow-600 transition-all view-recipes-btn"
          >
            SEE THE RECIPES
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
