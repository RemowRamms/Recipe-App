import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { fetchRecipesBySearch, transformMealPayloadToMockDataStructure } from '../api/fetchRecipes';
import ClipLoader from "react-spinners/ClipLoader";

const TopRatedRecipes = ({ 
  theme, 
  isLoggedIn, 
  setShowLoginModal, 
  addToFavorites,
  favoriteRecipes 
}) => {
  const [topRatedRecipes, setTopRatedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
       
        const popularDishes = ['steak', 'pizza', 'burger', 'fish'];
        const randomDish = popularDishes[Math.floor(Math.random() * popularDishes.length)];
        const data = await fetchRecipesBySearch(randomDish);
        const transformedData = data.map(meal => transformMealPayloadToMockDataStructure(meal));
      
        setTopRatedRecipes(transformedData.slice(0, 8));
      } catch (error) {
        console.error('Error fetching top rated recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopRated();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Top Rated Recipes</h1>
        <div className="flex justify-center items-center min-h-[200px]">
          <ClipLoader color="#facc15" size={60} />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Top Rated Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {topRatedRecipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            theme={theme}
            isLoggedIn={isLoggedIn}
            setShowLoginModal={setShowLoginModal}
            addToFavorites={addToFavorites}
            isFavorite={favoriteRecipes?.includes(recipe.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TopRatedRecipes;