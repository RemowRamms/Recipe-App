import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import { Pagination } from "./Pagination2";


export const AllRecipes = ({
  theme,
  isLoggedIn,
  setShowLoginModal,
  addToFavorites,
  addComment,
  filteredRecipes
}) => {

   const [currentPage, setCurrentPage] = useState(1);
   const recipesPerPage = 8; // Number of recipes per page (adjust as needed)
  
  
   // Calculate indexes for the current page
   const indexOfLastRecipe = currentPage * recipesPerPage;
   const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
   const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);


  return (
    <div className="container mx-auto py-8">
      {/* <h1>All Recipes</h1> */}
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
      <div className="mt-2 w-full ">

        <Pagination/>
      </div>
    </div>
  );
};


