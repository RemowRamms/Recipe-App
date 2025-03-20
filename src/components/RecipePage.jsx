import React, { useState } from "react";
import recipes from "../data";
import SearchBar from "./SearchBar";
import RecipeList from "./RecipeList";

const RecipePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(query)
    );
    setFilteredRecipes(filtered);
  };

  return (
    <div className="min-h-screen py-8 bg-lightBlue dark:bg-darkBlue">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-darkBlue dark:text-lightBlue mb-6 text-center">
          Explore Recipes
        </h1>
        <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
        <RecipeList recipes={filteredRecipes} />
      </div>
    </div>
  );
};

export default RecipePage;