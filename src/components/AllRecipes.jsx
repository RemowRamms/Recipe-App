import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import ClipLoader from "react-spinners/ClipLoader";

export const AllRecipes = ({
  theme,
  isLoggedIn,
  setShowLoginModal,
  addToFavorites,
  addComment,
  newData,
  favoriteRecipes,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleRecipesCount, setVisibleRecipesCount] = useState(8); // Show 8 recipes initially

  const validRecipes = newData.filter((recipe) => recipe && recipe.id);

  useEffect(() => {
    if (validRecipes.length > 0) {
      setIsLoading(false);
    }
  }, [validRecipes.length]);

  const loadMoreRecipes = () => {
    setVisibleRecipesCount(prevCount => prevCount + 8);
  };

  const currentRecipes = validRecipes.slice(0, visibleRecipesCount);

  return (
    <div className="container mx-auto px-[7%] py-8">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <ClipLoader color="#facc15" size={80} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                theme={theme}
                isLoggedIn={isLoggedIn}
                setShowLoginModal={setShowLoginModal}
                addToFavorites={addToFavorites}
                addComment={addComment}
                isFavorite={favoriteRecipes?.includes(recipe.id)}
              />
            ))}
          </div>
          {visibleRecipesCount < validRecipes.length && (
            <div className="mt-8 w-full flex justify-center">
              <button
                onClick={loadMoreRecipes}
                className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-600 transform hover:-translate-y-1 transition-all duration-200"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
