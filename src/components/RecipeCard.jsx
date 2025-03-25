import React, { useState }from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom"; 

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
      <div className={`relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300`}>
      <Link to={`/recipe/${recipe.id}`}>
      {/* Recipe Image wrapped in Link */}
        <img
          className="w-full h-32 object-cover"
          src={recipe.image}
          alt={recipe.title}
        />

      </Link>
     
      <div className={`absolute bottom-0 left-0 right-0 p-4 text-center ${theme === 'dark' ? 'text-white' : 'text-white'}`}>
        <h2 className="font-bold text-lg">{recipe.title}</h2>
      </div>
        <button
          onClick={handleHeartClick}
          className="absolute left-4 bottom-4 text-xl"
          >
          <FaHeart
            className={`text-3xl ${
              isFavorite ? "text-red-500" : "text-gray-500"
            }`}
            />
        </button>
    </div>
    </>
  );
};

export default RecipeCard;
