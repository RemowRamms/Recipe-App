import React, { useState } from "react";
import recipes from "../data";
import SearchBar from "./SearchBar";
import RecipeList from "./RecipeList";
import Pagination from "./Pagination"; // Import the Pagination component

const itemsPerPage = 6; // 3 columns x 3 rows

const RecipePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [currentPage, setCurrentPage] = useState(1);  // Pagination State

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(query)
    );
    setFilteredRecipes(filtered);
    setCurrentPage(1); // Reset to page 1 when search changes
  };

  // Pagination Calculation
  const totalItems = filteredRecipes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const recipesToDisplay = filteredRecipes.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div className="min-h-screen py-8 bg-lightBlue dark:bg-darkBlue">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-darkBlue dark:text-lightBlue mb-6 text-center">
          Explore Recipes
        </h1>
        <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
        <RecipeList recipes={recipesToDisplay} /> {/* Use recipesToDisplay */}

        {/* Pagination Component */}
        {totalPages > 1 && (  // Only show if there's more than one page
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default RecipePage;
