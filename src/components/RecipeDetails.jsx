import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { searchById, transformMealPayloadToMockDataStructure  } from '../api/fetchRecipes';


const RecipeDetails = () => {
const { id } = useParams();

const [recipe, setRecipe] = React.useState(null);
      useEffect(() => {
        const fetchData = async () => {
          searchById(id).then((data) => {
      
            const transformedData = data.map(meal => transformMealPayloadToMockDataStructure(meal));
            console.log(transformedData[0]);
            setRecipe(transformedData[0]);
          });
        };
        fetchData();
      }, [id]);

 if (!recipe) {
 return (
 <div className="container mx-auto px-4 py-8">
 <div className="text-center text-2xl font-bold">
 Recipe not found.
 </div>
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
 </div>


 <div className="w-full md:w-2/3 p-4">
 <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
 {/* <p className="text-lg text-center mb-6">{recipe.description}</p> */}

 <div className="flex">
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
 );
};


export default RecipeDetails;
