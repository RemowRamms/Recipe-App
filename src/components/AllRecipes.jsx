import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { Pagination } from "./Pagination2";
import search_icon_light from "../assets/search-w.png";
import search_icon_dark from "../assets/search-b.png";
import "./styles/AllRecipes.css"; 
import { fetchRecipesBySearch, transformMealPayloadToMockDataStructure } from "../api/fetchRecipes";
export const AllRecipes = ({
  theme,
  isLoggedIn,
  setShowLoginModal,
  addToFavorites,
  addComment,
  filteredRecipes,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const recipesPerPage = 8;


  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Calculate indexes for the current page
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const [newData, setNewData] = React.useState([]);
      useEffect(() => {
        const fetchData = async () => {
          fetchRecipesBySearch(searchQuery).then((data) => {
            console.log(data);
            const transformedData = data.map(meal => transformMealPayloadToMockDataStructure(meal));
            console.log(transformedData);
            setNewData(transformedData);
          });
        };
        fetchData();
      }, [searchQuery]);

  const currentRecipes = newData.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const totalPages = Math.ceil(newData.length / recipesPerPage);

  const pages = [...Array(totalPages)].map((_, index) => index + 1);

  console.log(pages);

  return (
    <div className="container mx-auto py-8">
      {/* <h1>All Recipes</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            theme={theme}
            isLoggedIn={isLoggedIn}
            setShowLoginModal={setShowLoginModal}
            addToFavorites={addToFavorites}
            addComment={addComment}
          />
        ))}
      </div>

     {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          id="search-input"
          name="search"
          placeholder="What are you craving?"
          value={searchQuery}
          onChange={onSearchChange}
        />
        <img
          src={theme === "light" ? search_icon_dark : search_icon_light}
          alt="Search Icon"
        />
      </div> 

      <div className="mt-2 w-full ">
        <Pagination setCurrentPage={setCurrentPage} pages={pages} />
      </div>
    </div>
  );
};
