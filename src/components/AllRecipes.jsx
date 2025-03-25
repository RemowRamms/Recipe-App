// AllRecipes.jsx
import React from "react";
import RecipeCard from "./RecipeCard"; // Adjust path if needed
// import recipes from "../data"; // Import your recipe data

export const AllRecipes = ({
  theme,
  isLoggedIn,
  setShowLoginModal,
  addToFavorites,
  addComment,
  filteredRecipes
}) => {
  return (
    <div className="container mx-auto py-8">
      {/* <h1>All Recipes</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecipes.map((recipe) => (
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


