import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import StarRating from './Ratings';

import {
  searchById,
  transformMealPayloadToMockDataStructure,
} from '../api/fetchRecipes';

const RecipeDetails = ({ isLoggedIn, setShowLoginModal, handleRate }) => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      searchById(id).then((data) => {
        const transformedData = data.map(meal =>
          transformMealPayloadToMockDataStructure(meal)
        );
        console.log(transformedData[0]);
        setRecipe(transformedData[0]);
      });
    };
    fetchData();
  }, [id]);

  const handleRatingChange = (newRating) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    handleRate(recipe.id, newRating);
  };

  if (!recipe) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <ClipLoader color="#facc15" size={80} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-center">
        <div className="w-full md:w-1/3 p-4">
          <img
            src={recipe.image}
            alt={`Image of ${recipe.title}`}
            className="w-full h-auto object-cover rounded-lg shadow-lg mb-6"
          />
          <div className="mt-4 flex flex-col items-center space-y-2">
            <h3 className="text-lg font-semibold">Rate this recipe:</h3>
            <StarRating 
              initialRating={recipe.rating} 
              onRatingChange={handleRatingChange} 
              readOnly={!isLoggedIn}
            />
            {!isLoggedIn && (
              <p className="text-sm text-gray-500">Sign in to rate this recipe</p>
            )}
          </div>
        </div>

        <div className="w-full md:w-2/3 p-4">
          <h1 className="text-3xl font-bold mb-6 border-b-4 border-yellow-400 inline-block pb-1">
            {recipe.title}
          </h1>

          <div className="flex">
            <div className="flex w-full h-100 overflow-y-auto">
              <div className="w-1/2 pr-2">
                <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
                <ol className="list-none pl-5 mb-4 list-inside">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-lg">
                      {ingredient}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="w-1/2 pl-2">
                {recipe.method && Array.isArray(recipe.method) ? (
                  <>
                    <h2 className="text-xl font-semibold mb-2">Method</h2>
                    <ol className="list-decimal pl-5 mb-4 list-outside">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
