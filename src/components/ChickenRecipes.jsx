import React, {useState, useEffect} from "react";
import RecipeCard from "./RecipeCard";
import { fetchRecipesBySearch, transformMealPayloadToMockDataStructure } from "../api/fetchRecipes";


  const ChickenRecipes = ({ theme, isLoggedIn, setShowLoginModal, addToFavorites, addComment, filteredRecipes}) => {
    // console.log(filteredRecipes);

    const [newData, setNewData] = React.useState([]);
    useEffect(() => {
      const fetchData = async () => {
        fetchRecipesBySearch("Chicken").then((data) => {
          console.log(data);
          const transformedData = data.map(meal => transformMealPayloadToMockDataStructure(meal));
          console.log(transformedData);
          setNewData(transformedData);
        });
      };
      fetchData();
    }, []);
    
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Chicken Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {newData.map(recipe => (
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