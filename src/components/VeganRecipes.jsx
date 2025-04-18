import React from "react";
import RecipeCard from "./RecipeCard"; 
import recipes from "../data"; 

// const VeganRecipes = ({
//   theme,
//   isLoggedIn,
//   setShowLoginModal,
//   addToFavorites,
//   addComment,
// }) => {
//   const veganRecipes = recipes.filter((recipe) => recipe.diet === "vegan");

const VeganRecipes = ({ theme, isLoggedIn, setShowLoginModal, addToFavorites, addComment, filteredRecipes }) => {
  const veganRecipes = filteredRecipes.filter(recipe => recipe.diet === "vegan");
  return (
    <div className="container mx-auto py-8">
      <h1>Vegan Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4powe gap-4">
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
