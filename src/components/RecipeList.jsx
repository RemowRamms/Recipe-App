import React from "react";
import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipes }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.length > 0 ? (
        recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
      ) : (
        <div className="col-span-3 text-center text-xl font-semibold text-darkBlue dark:text-lightBlue">
          No recipes found
        </div>
      )}
    </div>
  );
};

export default RecipeList;