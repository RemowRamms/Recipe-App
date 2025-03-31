import React from "react";
import RecipeCard from "./RecipeCard";
import recipes from "../data";

const ChickenRecipes = ({
  theme,
  isLoggedIn,
  setShowLoginModal,
  addToFavorites,
  addComment,
}) => {

  const chickenRecipes = recipes.filter((recipe) => recipe.meat === "Chicken");
  console.log('chicken:', chickenRecipes);


  return (
    <div className="container mx-auto py-8">
      <h1>Chicken Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chickenRecipes.map(recipe => (
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

export default ChickenRecipes;