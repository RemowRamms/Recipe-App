import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { Pagination } from "./Pagination2";
import ClipLoader from "react-spinners/ClipLoader";

export const AllRecipes = ({
  theme,
  isLoggedIn,
  setShowLoginModal,
  addToFavorites,
  addComment,
  filteredRecipes,
  newData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const recipesPerPage = 8;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = newData.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const totalPages = Math.ceil(newData.length / recipesPerPage);
  const pages = [...Array(totalPages)].map((_, index) => index + 1);

  useEffect(() => {
    if (newData.length > 0) {
      setIsLoading(false);
    }
  }, [newData]);

  return (
    <div className="container mx-auto py-8">
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
              />
            ))}
          </div>
          <div className="mt-2 w-full p-[40px] flex justify-center">
            <Pagination setCurrentPage={setCurrentPage} pages={pages} />
          </div>
        </>
      )}
    </div>
  );
};
