import React, { useEffect, useState } from "react";
import { FaHeart, FaRegCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";

const RecipeCard = ({
  recipe,
  theme,
  isLoggedIn,
  setShowLoginModal,
  addToFavorites,
  isFavorite,
}) => {
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    const loadReviewCount = () => {
      const savedReviews = JSON.parse(
        localStorage.getItem(`reviews_${recipe.id}`) || "[]"
      );
      setReviewCount(savedReviews.length);
    };

    loadReviewCount();

    const handleStorageChange = (e) => {
      if (e.key === `reviews_${recipe.id}`) {
        loadReviewCount();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, [recipe.id]);

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      addToFavorites(recipe.id);
    }
  };

  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className={`rounded-xl overflow-hidden transition-all duration-300 h-full group hover:-translate-y-1
        border hover:shadow-xl
        ${theme === "dark"
          ? "bg-[#1E1E1E] text-white border-gray-800 shadow-md shadow-black/30"
          : "bg-white text-gray-800 shadow-lg border-gray-200"
        } flex flex-col`}
    >
      <div className="p-6 flex flex-col flex-grow">
        <div className="relative mb-6">
          <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
            <img
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              src={recipe.image}
              alt={recipe.title}
            />
          </div>
          <button
            onClick={handleHeartClick}
            className="absolute top-3 right-3 text-2xl p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors duration-200"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <FaHeart
              className={`transition-colors duration-200 ${isFavorite ? "text-red-600" : "text-white"}`}
            />
          </button>
        </div>
        <h2
          className={`font-semibold text-lg tracking-wide mb-2 line-clamp-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          {recipe.title}
        </h2>
        <p
          className={`text-sm mb-4 line-clamp-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          {recipe.description}
        </p>

        <div className="mt-auto pt-4 flex items-center text-xs gap-1">
          <FaRegCommentDots className="w-3 h-3" />
          <span
            className={`group-hover:text-yellow-600 transition-colors duration-200 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Reviews ({reviewCount})
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
