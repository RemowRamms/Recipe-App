import React from "react";
import RecipeCard from "../RecipeCard";
import "../Styles/Favourites.css";

function Favorites({ 
  favoriteRecipes, 
  isLoggedIn, 
  theme,
  setShowLoginModal,
  addToFavorites,
  searchQuery 
}) {
  if (!isLoggedIn) {
    return (
      <div className="text-center p-16 bg-white/5 rounded-xl max-w-xl mx-auto my-8">
        <h2 className="mb-4 text-2xl text-red-600 font-semibold">Please Sign In</h2>
        <p className="text-gray-500 text-lg leading-relaxed">
          You must be logged in to view your favorite recipes.
        </p>
      </div>
    );
  }
  const savedRecipes = JSON.parse(localStorage.getItem('searchedRecipes') || '[]');
  

  console.log('Saved Recipes:', savedRecipes);
  console.log('Favorite Recipe IDs:', favoriteRecipes);
  const favoritedRecipes = savedRecipes.filter(recipe => {
    if (!recipe || !recipe.id) return false;
    const isFavorited = favoriteRecipes.includes(recipe.id);
    if (searchQuery) {
      return isFavorited && (
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return isFavorited;
  });

  if (favoritedRecipes.length > 0) {
    return (
      <div className="container mx-auto px-[7%] py-8">
        <h2 className="mb-8 text-center text-4xl font-bold">
          Your Favorites
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {favoritedRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <RecipeCard 
                recipe={recipe}
                theme={theme}
                isLoggedIn={isLoggedIn}
                setShowLoginModal={setShowLoginModal}
                addToFavorites={addToFavorites}
                isFavorite={true}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center p-16 bg-white/5 rounded-xl max-w-xl mx-auto my-8">
      <h2 className="mb-4 text-2xl text-red-600 font-semibold">No Favorite Recipes Yet</h2>
      <p className="text-gray-500 text-lg leading-relaxed">
        Start adding recipes to your favorites and they will appear here!
      </p>
    </div>
  );
}

export default Favorites;
