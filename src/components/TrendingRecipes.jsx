import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { fetchRecipesBySearch, transformMealPayloadToMockDataStructure } from '../api/fetchRecipes';
import ClipLoader from "react-spinners/ClipLoader";

const TrendingRecipes = ({ theme, isLoggedIn, setShowLoginModal, addToFavorites, favoriteRecipes }) => {
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
       
        const popularSearches = ['chicken', 'beef', 'pasta', 'curry'];
        const randomSearch = popularSearches[Math.floor(Math.random() * popularSearches.length)];
        const data = await fetchRecipesBySearch(randomSearch);
        const transformedData = data.map(meal => transformMealPayloadToMockDataStructure(meal));
        
       
        setTrendingRecipes(transformedData.slice(0, 8));
      } catch (error) {
        console.error('Error fetching trending recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Trending Recipes</h1>
        <div className="flex justify-center items-center min-h-[200px]">
          <ClipLoader color="#facc15" size={60} />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Trending Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendingRecipes.map(recipe => (
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

export default TrendingRecipes;