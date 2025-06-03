import React, { useState} from "react";
import RecipeCard from "./RecipeCard";
import { Pagination } from "./Pagination2";

const SummerRecipes = ({ theme, isLoggedIn, setShowLoginModal, addToFavorites, addComment, filteredRecipes }) => {
  const summerRecipes = filteredRecipes.filter(recipe => recipe.season === "summer");

  const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 8;
  
    // Slice based on breakfastRecipes
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = summerRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  
    //Pagination based on breakfastRecipes
    const totalPages = Math.ceil(summerRecipes.length / recipesPerPage);
    const pages = [...Array(totalPages)].map((_, index) => index + 1);
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Summer Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentRecipes.map(recipe => (
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
      {/* Show pagination only if needed */}
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination pages={pages} setCurrentPage={setCurrentPage} />
        </div>
      )}

    </div>
  );
};

export default SummerRecipes;