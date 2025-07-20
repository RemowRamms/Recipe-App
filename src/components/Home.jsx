import React from "react";
import { Link } from "react-router-dom";
import yourImage from "/images/food-homepage.webp"; 

const Home = () => {
  return (
        <div className="relative container mx-auto px-[7%] py-8">
      
      <div className="relative">
        <img
          src={yourImage} 
          alt="Recipe" 
          className="w-full h-dvh object-cover rounded-lg shadow-lg" 
        />
        
        
        <div className="absolute justify-center items-center place-content-center text-white w-1/2 top-[0px] h-dvh bg-linear-to-r from-black px-10 rounded-lg">
          <h1 className="text-5xl font-extrabold mb-10">Discover Tasty Recipes to Try!</h1>
          {/* <p className="text-xl mb-6">
          Cook up something amazing with easy-to-follow recipes!
          </p> */}
          <Link
            to="/recipes"
            className="bg-yellow-500 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-yellow-600 transition-all view-recipes-btn mt-6"
          >
            SEE THE RECIPES
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
