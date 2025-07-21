import React from "react";
import { Link } from "react-router-dom";
import yourImage from "/images/food-homepage.webp"; 

const Home = ({ theme }) => {
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

          <Link
            to="/recipes"
            className="bg-yellow-500 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-yellow-600 transition-all view-recipes-btn mt-6"
          >
            SEE THE RECIPES
          </Link>
        </div>
      </div>

      <div className="py-24">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Your Culinary Adventure Starts Here</h2>
          <p className={`text-lg mt-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Everything you need to make your next meal a success.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
            <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" alt="Find Recipes" className="w-full h-56 object-cover rounded-lg mb-6"/>
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">Find Perfect Recipes</h3>
            <p className="text-gray-600">Explore thousands of dishes. Our powerful search helps you find the perfect meal by name or ingredient.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
            <img src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg" alt="Save Favorites" className="w-full h-56 object-cover rounded-lg mb-6"/>
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">Save Your Favorites</h3>
            <p className="text-gray-600">Create a personal account to save and organize your favorite recipes, building your own digital cookbook.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
            <img src="https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg" alt="Join Community" className="w-full h-56 object-cover rounded-lg mb-6"/>
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">Join the Community</h3>
            <p className="text-gray-600">Join a community of food lovers. Rate recipes and see what's trending to cook with confidence.</p>
          </div>
        </div>

        <div className="text-center mt-20">
          <Link
            to="/recipes"
            className="bg-yellow-500 text-white px-10 py-4 rounded-lg text-xl font-semibold shadow-lg hover:bg-yellow-600 transition-all"
          >
            Explore Recipes »
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
