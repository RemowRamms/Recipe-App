import React from "react";
import RecipeCard from "./RecipeCard";
import recipes from "../data";

const KetoRecipes = ({ theme, isLoggedIn, setShowLoginModal, addToFavorites, addComment }) => {
  const ketoRecipes = recipes.filter(recipe => recipe.diet === "keto");

  return (
    <div className="container mx-auto py-8">
      <h1>Keto Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ketoRecipes.map(recipe => (
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

export default KetoRecipes;