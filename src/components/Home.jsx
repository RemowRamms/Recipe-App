import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { fetchMealOfTheDay, transformMealPayloadToMockDataStructure } from "../api/fetchRecipes";
import yourImage from "/images/food-homepage.webp"; 

const Home = ({ theme }) => {
  const [mealOfTheDay, setMealOfTheDay] = useState(null);
  const [isLoadingMeal, setIsLoadingMeal] = useState(true);

  useEffect(() => {
    const loadMealOfTheDay = async () => {
      try {
        setIsLoadingMeal(true);
        

        const today = new Date().toDateString();
        const cachedMeal = localStorage.getItem('mealOfTheDay');
        const cachedDate = localStorage.getItem('mealOfTheDayDate');
        
        if (cachedMeal && cachedDate === today) {
          setMealOfTheDay(JSON.parse(cachedMeal));
          setIsLoadingMeal(false);
          return;
        }
        

        const mealData = await fetchMealOfTheDay();
        if (mealData) {
          const transformedMeal = transformMealPayloadToMockDataStructure(mealData);
          setMealOfTheDay(transformedMeal);
          

          localStorage.setItem('mealOfTheDay', JSON.stringify(transformedMeal));
          localStorage.setItem('mealOfTheDayDate', today);
        }
      } catch (error) {
        console.error('Error loading meal of the day:', error);
      } finally {
        setIsLoadingMeal(false);
      }
    };

    loadMealOfTheDay();
  }, []);

  return (
    <div className="relative container mx-auto px-4 sm:px-6 lg:px-[7%] py-4 sm:py-8">
      
      <div className="relative">
        <img
          src={yourImage} 
          alt="Recipe" 
          className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-dvh object-cover rounded-lg shadow-lg" 
        />
        

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent rounded-lg flex items-center">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-4 sm:mb-6 md:mb-8 lg:mb-10 leading-tight">
              Discover Tasty Recipes to Try!
            </h1>

            <Link
              to="/recipes"
              className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:from-yellow-600 hover:to-orange-600 transform hover:-translate-y-1 transition-all duration-200"
            >
              SEE THE RECIPES
            </Link>
          </div>
        </div>
      </div>


      <div className="py-16">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
             Meal of the Day
          </h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Fresh inspiration for today's cooking adventure
          </p>
        </div>

        {isLoadingMeal ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <ClipLoader 
                color={theme === 'dark' ? '#FCD34D' : '#F59E0B'} 
                size={50} 
                loading={isLoadingMeal} 
              />
              <p className={`mt-4 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Discovering today's special meal...
              </p>
            </div>
          </div>
        ) : mealOfTheDay ? (
          <div className={`max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-[#1E1E1E] text-white border-gray-800 shadow-md shadow-black/30' 
              : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
          }`}>
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={mealOfTheDay.image} 
                  alt={mealOfTheDay.title}
                  className="w-full h-80 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    theme === 'dark' 
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                      : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                  }`}>
                    {mealOfTheDay.category}
                  </span>
                  {mealOfTheDay.meat && (
                    <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                      theme === 'dark' 
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      {mealOfTheDay.meat}
                    </span>
                  )}
                </div>
                
                <h3 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {mealOfTheDay.title}
                </h3>
                
                <p className={`text-lg mb-6 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {mealOfTheDay.description}
                </p>
                
                <div className="mb-6">
                  <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    Key Ingredients:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {mealOfTheDay.ingredients.slice(0, 4).map((ingredient, index) => (
                      <span 
                        key={index}
                        className={`px-3 py-1 rounded-lg text-sm ${
                          theme === 'dark' 
                            ? 'bg-gray-700 text-gray-300 border border-gray-600' 
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                        }`}
                      >
                        {ingredient}
                      </span>
                    ))}
                    {mealOfTheDay.ingredients.length > 4 && (
                      <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                      }`}>
                        +{mealOfTheDay.ingredients.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
                
                <Link
                  to={`/recipe/${mealOfTheDay.id}`}
                  className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:from-yellow-600 hover:to-orange-600 transform hover:-translate-y-1 transition-all duration-200"
                >
                  Cook This Today
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className={`text-center py-12 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            <p className="text-lg">Unable to load today's special meal. Please try again later.</p>
          </div>
        )}
      </div>

      <div className="py-24">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Culinary Adventure</h2>
          <p className={`text-lg mt-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Everything you need to make your next meal a success.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          <div className={`text-center p-6 rounded-xl transform hover:-translate-y-2 transition-transform duration-300 border
            ${theme === "dark"
              ? "bg-[#1E1E1E] text-white border-gray-800 shadow-md shadow-black/30"
              : "bg-white text-gray-800 shadow-lg border-gray-200"
            }`}>
            <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" alt="Find Recipes" className="w-full h-56 object-cover rounded-lg mb-6"/>
            <h3 className={`text-2xl font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Find Perfect Recipes</h3>
            <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Explore thousands of dishes. Our powerful search and filter helps you find the perfect meal by name or ingredient.</p>
          </div>

          <div className={`text-center p-6 rounded-xl transform hover:-translate-y-2 transition-transform duration-300 border
            ${theme === "dark"
              ? "bg-[#1E1E1E] text-white border-gray-800 shadow-md shadow-black/30"
              : "bg-white text-gray-800 shadow-lg border-gray-200"
            }`}>
            <img src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg" alt="Save Favorites" className="w-full h-56 object-cover rounded-lg mb-6"/>
            <h3 className={`text-2xl font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Save & Share Your Favorites</h3>
            <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Create a personal account to save and organize your favorite recipes, building your own digital cookbook.</p>
          </div>

          <div className={`text-center p-6 rounded-xl transform hover:-translate-y-2 transition-transform duration-300 border
            ${theme === "dark"
              ? "bg-[#1E1E1E] text-white border-gray-800 shadow-md shadow-black/30"
              : "bg-white text-gray-800 shadow-lg border-gray-200"
            }`}>
            <img src="https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg" alt="Join Community" className="w-full h-56 object-cover rounded-lg mb-6"/>
            <h3 className={`text-2xl font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Join the Community</h3>
            <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Join a community of food lovers. Rate recipes and see what's trending to cook with confidence.</p>
          </div>
        </div>

        <div className="text-center mt-20">
          <Link
            to="/recipes"
            className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:from-yellow-600 hover:to-orange-600 transform hover:-translate-y-1 transition-all duration-200"
          >
            Explore Recipes »
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
