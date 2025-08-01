import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import ClipLoader from "react-spinners/ClipLoader";
import CategoryFilter from "./CategoryFilter";

export const AllRecipes = ({
  theme,
  isLoggedIn,
  setShowLoginModal,
  addToFavorites,
  newData,
  favoriteRecipes,
  onSelectCategory,
  selectedCategory,
  categories,
  isLoading,
}) => {
  const [visibleRecipesCount, setVisibleRecipesCount] = useState(8);

  const validRecipes = newData ? newData.filter((recipe) => recipe && recipe.id) : [];

  const loadMoreRecipes = () => {
    setVisibleRecipesCount(prevCount => prevCount + 8);
  };

  const currentRecipes = validRecipes.slice(0, visibleRecipesCount);

  return (
    <div className="container mx-auto px-[7%] py-8">
      <CategoryFilter 
        theme={theme} 
        selectedCategory={selectedCategory} 
        onSelectCategory={onSelectCategory} 
        categories={categories} 
      />

      <div className="mt-8">
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-64">
            <ClipLoader color="#facc15" size={80} />
          </div>
        ) : currentRecipes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentRecipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  theme={theme} 
                  isLoggedIn={isLoggedIn}
                  setShowLoginModal={setShowLoginModal}
                  onAddToFavorites={() => addToFavorites(recipe.id)}
                  isFavorite={favoriteRecipes.includes(recipe.id)}
                />
              ))}
            </div>
            {visibleRecipesCount < validRecipes.length && (
              <div className="mt-8 w-full flex justify-center">
                <button
                  onClick={loadMoreRecipes}
                  className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:from-yellow-600 hover:to-orange-600 transform hover:-translate-y-1 transition-all duration-200"
                >
                  Load More
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center items-center min-h-[300px]">
            <p>No recipes found. Try a different category or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};
