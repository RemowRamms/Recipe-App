import React from "react";
import RecipeCard from "./RecipeCard";
import { fetchRecipesBySearch, transformMealPayloadToMockDataStructure } from "../api/fetchRecipes";


  const ChickenRecipes = ({ theme, isLoggedIn, setShowLoginModal, addToFavorites, addComment, filteredRecipes}) => {
    // console.log(filteredRecipes);
    
    let newData = []
    const chickenRecipes = filteredRecipes.filter(recipe => recipe.meat === "Chicken");
    const data = fetchRecipesBySearch("Chicken");
    
    console.log(data);
    console.log(newData);

    data.meals.map(meal => {
    
    newData.push(transformMealPayloadToMockDataStructure(meal))

  })
    
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Chicken Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map(recipe => (
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