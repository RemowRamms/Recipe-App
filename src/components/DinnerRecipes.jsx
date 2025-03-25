// DinnerRecipes.jsx
import React from "react";
import RecipeCard from "./RecipeCard";
import recipes from "../data";

const DinnerRecipes = ({
  theme,
  isLoggedIn,
  setShowLoginModal,
  addToFavorites,
  addComment,
}) => {
  const dinnerRecipes = recipes.filter((recipe) => recipe.category === "Dinner");

  return (
    <div className="container mx-auto py-8">
      <h1>Dinner Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dinnerRecipes.map((recipe) => (
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

export default DinnerRecipes;
