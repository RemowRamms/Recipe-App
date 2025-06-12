import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import { Pagination } from "./Pagination2";

const RecipeList = ({ recipes }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const totalPages = Math.ceil(recipes.length / recipesPerPage);
  const pages = [...Array(totalPages)].map((_, index) => index + 1);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentRecipes.length > 0 ? (
          currentRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <div className="col-span-3 text-center text-xl font-semibold text-darkBlue dark:text-lightBlue">
            No recipes found
          </div>
        )}
      </div>

      {recipes.length > 0 && (
        <div className="mt-2 w-full p-[40px] flex justify-center">
          <Pagination
            setCurrentPage={setCurrentPage}
            pages={pages}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default RecipeList;
