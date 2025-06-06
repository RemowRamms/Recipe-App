import React, { useState } from "react";
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
  const [isFavorite, setIsFavorite] = useState(false);

  const handleHeartClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      setIsFavorite(!isFavorite);
      if (!isFavorite) {
        addToFavorites(recipe.id);
      }
    }
  };

  return (
    <div
      className={`relative rounded-xl overflow-hidden transition-shadow duration-300 h-full 
        border 
        ${
          theme === "dark"
            ? "bg-gray-600/50 text-white border-gray-700"
            : "bg-white text-black shadow-lg hover:shadow-2xl border-gray-200"
        }`}
    >
      <Link to={`/recipe/${recipe.id}`}>
        <img
          className="w-full h-48 object-cover cursor-pointer"
          src={recipe.image}
          alt={recipe.title}
        />
      </Link>

      <div className="p-4 pb-12 text-center">
        <h2 className="mt-1 font-semibold text-lg tracking-wide mb-4 border-b-2 border-yellow-400 inline-block">
          {recipe.title}
        </h2>
      </div>

      {/* View Recipe Button */}
      <Link
  to={`/recipe/${recipe.id}`}
  className={`absolute bottom-2 right-2 font-semibold px-4 py-2 rounded-lg text-sm transition-colors duration-200
    ${
      theme === "dark"
        ? "bg-gray-500 hover:bg-yellow-300 text-white"
        : "bg-yellow-400/50 hover:bg-yellow-500 text-black"
    }`}
>
  View Recipe
</Link>


      {/* Heart Icon */}
      <button
        onClick={handleHeartClick}
        className="absolute top-2 left-2 text-2xl"
        title="Add to favorites"
      >
        <FaHeart
          className={`transition-colors duration-200 ${
            isFavorite ? "text-red-600" : "text-gray-400 dark:text-gray-500"
          }`}
        />
      </button>

      {/* Servings Info */}
      {/* <div className="absolute bottom-2 right-2 bg-yellow-400 text-black rounded-full px-3 py-1 flex items-center gap-1 text-sm shadow-md">
        <GiBowlOfRice size={16} />
        <span>{recipe.servings ? `${recipe.servings} servings` : "Servings: N/A"}</span>
      </div> */}
    </div>
  );
};

export default RecipeCard;
