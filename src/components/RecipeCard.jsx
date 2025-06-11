import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiBowlOfRice } from "react-icons/gi";
import StarRating from "./Ratings";

const RecipeCard = ({
  recipe,
  theme,
  isLoggedIn,
  setShowLoginModal,
  addToFavorites,
  isFavorite, 
}) => {
  const [localFavorite, setLocalFavorite] = useState(isFavorite);

  useEffect(() => {
    setLocalFavorite(isFavorite);
  }, [isFavorite]);

  const handleHeartClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      addToFavorites(recipe.id); 
      setLocalFavorite(!localFavorite); 
    }
  };

  return (
    <div
      className={`relative rounded-xl overflow-hidden transition-shadow duration-300 h-full 
        border 
        ${
          theme === "dark"
            ? "bg-[#1E1E1E] text-white border-gray-800 shadow-md shadow-black/30"
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
        <h2 className="mt-1 font-semibold text-lg tracking-wide mb-2 border-b-2 border-yellow-400 inline-block">
          {recipe.title}
        </h2>
        {/* <div className="flex justify-center mt-2">
          <StarRating readOnly initialRating={recipe.rating} />
        </div> */}
      </div>



      <button
        onClick={handleHeartClick}
        className="absolute top-2 left-2 text-2xl"
        title="Add to favorites"
      >
        <FaHeart
          className={`transition-colors duration-200 ${
            localFavorite ? "text-red-600" : "text-gray-400 dark:text-gray-500"
          }`}
        />
      </button>
    </div>
  );
};

export default RecipeCard;
