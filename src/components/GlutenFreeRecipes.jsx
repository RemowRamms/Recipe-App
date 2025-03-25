import React from "react";
import RecipeCard from "./RecipeCard";
import recipes from "../data";

const GlutenFreeRecipes = ({ theme, isLoggedIn, setShowLoginModal, addToFavorites, addComment }) => {
  const glutenFreeRecipes = recipes.filter(recipe => recipe.diet === "gluten-free");

  return (
    <div className="container mx-auto py-8">
      <h1>Gluten Free Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {glutenFreeRecipes.map(recipe => (
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

export default GlutenFreeRecipes;