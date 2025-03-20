import React from "react";
import { useParams } from "react-router-dom";
import recipes from "../data"; // Import the recipe data

const RecipeDetails = () => {
  const { id } = useParams(); // Get the id from the URL
  const recipe = recipes.find((recipe) => recipe.id === parseInt(id)); // Find the recipe by id

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-2xl font-bold">
          Recipe not found.
        </div>
      </div>
    ); // If no recipe is found with the given id
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        {/* Recipe Image */}
        <img
          src={recipe.image}
          alt={`Image of ${recipe.title}`}
          className="w-1/3 md:w-1/4 max-w-xs h-auto object-cover rounded-lg shadow-lg mb-6"
        />
        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
        <p className="text-lg text-center mb-6">{recipe.description}</p>

        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc pl-6 mb-4">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-lg">
              {ingredient}
            </li>
          ))}
        </ul>

        {/* Method Section */}
        {recipe.method && Array.isArray(recipe.method) ? (
          <>
            <h2 className="text-xl font-semibold mb-2">Method</h2>
            <ol className="list-decimal pl-6 mb-4">
              {recipe.method.map((step, index) => (
                <li key={index} className="text-lg">
                  {step}
                </li>
              ))}
            </ol>
          </>
        ) : recipe.method ? (
          <>
            <h2 className="text-xl font-semibold mb-2">Method</h2>
            <p className="text-lg">{recipe.method}</p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default RecipeDetails;
