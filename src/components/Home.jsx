import React from "react";
import { Link } from "react-router-dom";
import yourImage from "/images/food-homepage.webp"; 

const Home = () => {
  return (
    <div className="relative containe mx-auto px-4 py-8">
      
      <div className="relative">
        <img
          src={yourImage} 
          alt="Recipe" 
          className="w-full h-dvh object-cover rounded-lg shadow-lg" 
        />
        
        
        <div className="absolute justify-center items-center place-content-center text-white w-1/2 top-[0px] h-dvh bg-linear-to-r from-black px-10 rounded-lg">
          <h1 className="text-5xl font-extrabold mb-6">Discover Tasty Recipes to Try!</h1>
          {/* <p className="text-xl mb-6">
          Cook up something amazing with easy-to-follow recipes!
          </p> */}
          <Link
            to="/recipes" 
            className="bg-azure-12 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-azure-9 transition-all view-recipes-btn"
          >
            SEE THE RECIPES
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
