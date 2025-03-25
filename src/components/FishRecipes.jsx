import React from "react";
import RecipeCard from "./RecipeCard";
import recipes from "../data";

const FishRecipes = ({ theme, isLoggedIn, setShowLoginModal, addToFavorites, addComment }) => {
  const fishRecipes = recipes.filter(recipe => recipe.ingredients.includes("fish"));

  return (
    <div className="container mx-auto py-8">
      <h1>Fish Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fishRecipes.map(recipe => (
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

export default FishRecipes;