import React from "react";
import RecipeCard from "./RecipeCard";


  const LunchRecipes = ({ theme, isLoggedIn, setShowLoginModal, addToFavorites, addComment, filteredRecipes }) => {
    const lunchRecipes = filteredRecipes.filter(recipe => recipe.category === "lunch");
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Lunch Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {lunchRecipes.map((recipe) => (
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

export default LunchRecipes;
