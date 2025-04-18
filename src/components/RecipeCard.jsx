import React, { useState }from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom"; 
import { GiBowlOfRice } from "react-icons/gi";

const RecipeCard = ({
   recipe, 
   theme,
   isLoggedIn,
   setShowLoginModal,
   addToFavorites,
   }) => {
    const [isFavorite, setIsFavorite] = useState(false); // Track if the recipe is added to favorites

  const handleHeartClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true); // Show the login modal if the user is not logged in
    } else {
      setIsFavorite(!isFavorite); // Toggle favorite status
      if (!isFavorite) {
        addToFavorites(recipe.id); // Add recipe to favorites
      }
    }
  };
  return (
    <>
      <div className=" border-azure-7 border relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
      <Link to={`/recipe/${recipe.id}`}>
      {/* Recipe Image wrapped in Link */}
        <img
          className="w-full h-48 object-cover cursor-pointer"
          src={recipe.image}
          alt={recipe.title}
        />

      </Link>
     
      <div className={` bottom-0 left-0 right-0 p-4 text-center ${theme === 'dark' ? 'text-azure-2' : 'text-azure-12'}`}>
        <h2 className=" flex mt-1 font-bold tracking-wide text-lg mb-4">{recipe.title}</h2>
      </div>
        <button
          onClick={handleHeartClick}
          className="absolute top-1 left-2 cursor-pointer"
          >
          <FaHeart
            className={`text-3xl ${
              isFavorite ? "text-red-500" : "text-gray-500"
            }`}
            />
        </button>

        <div className='absolute bottom-2 right-2 bg-white bg-opacity-80 rounded-full px-2 py-1 cursor-default flex items-center gap-1 text-sm '>
        <GiBowlOfRice size={16} className="text-gray-800 dark:text-black"/>
        <span className="text-gray-800 dark:text-white">
        {recipe.servings ? `${recipe.servings} servings` : "Servings: N/A"}
        </span>
        </div>

    </div>
    </>
  );
};

export default RecipeCard;
