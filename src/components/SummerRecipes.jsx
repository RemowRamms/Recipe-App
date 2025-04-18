import React from "react";
import RecipeCard from "./RecipeCard";
// import recipes from "../data";

const SummerRecipes = ({ theme, isLoggedIn, setShowLoginModal, addToFavorites, addComment, filteredRecipes }) => {
  const summerRecipes = filteredRecipes.filter(recipe => recipe.season === "summer");

  return (
    <div className="container mx-auto py-8">
      <h1>Summer Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summerRecipes.map(recipe => (
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
    </div>
  );
};

export default SummerRecipes;