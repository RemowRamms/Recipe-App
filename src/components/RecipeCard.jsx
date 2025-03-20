import React from "react";
import { Link } from "react-router-dom"; // Import Link

const RecipeCard = ({ recipe, theme }) => {
  return (
    <div className={`relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300`}>
      {/* Recipe Image wrapped in Link */}
      <Link to={`/recipe/${recipe.id}`}>
        <img
          className="w-full h-32 object-cover"
          src={recipe.image}
          alt={recipe.title}
        />
      </Link>

      {/* Recipe Title */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 text-center z-10 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        <h2 className="font-bold text-lg">{recipe.title}</h2>
      </div>
    </div>
  );
};

export default RecipeCard;
