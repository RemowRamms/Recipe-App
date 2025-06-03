import React from "react";
import RecipeCard from "./RecipeCard"; 


const VeganRecipes = ({ theme, isLoggedIn, setShowLoginModal, addToFavorites, addComment, filteredRecipes }) => {
  const veganRecipes = filteredRecipes.filter(recipe => recipe.diet === "vegan");
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Vegan Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4powe gap-4">
        {veganRecipes.map((recipe) => (
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

export default VeganRecipes;
