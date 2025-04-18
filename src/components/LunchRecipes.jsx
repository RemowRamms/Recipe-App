// LunchRecipes.jsx
import React from "react";
import RecipeCard from "./RecipeCard";
// import recipes from "../data";

// const LunchRecipes = ({
//   theme,
//   isLoggedIn,
//   setShowLoginModal,
//   addToFavorites,
//   addComment,
// }) => {
  // const lunchRecipes = recipes.filter((recipe) => recipe.category === "Lunch");

  const LunchRecipes = ({ theme, isLoggedIn, setShowLoginModal, addToFavorites, addComment, filteredRecipes }) => {
    const lunchRecipes = filteredRecipes.filter(recipe => recipe.category === "lunch");
  return (
    <div className="container mx-auto py-8">
      <h1>Lunch Recipes</h1>
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
