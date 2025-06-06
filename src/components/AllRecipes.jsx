import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { Pagination } from "./Pagination2";
import search_icon_light from "../assets/search-w.png";
import search_icon_dark from "../assets/search-b.png";
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

  // pagination 
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

      <div className="flex justify-center mb-6">
  <div className="flex items-center gap-2 w-full max-w-md px-5 py-2 
                  border-2 rounded-[20px] 
                  bg-white dark:bg-black 
                  border-gray-400 dark:border-gray-600">
    <input
      type="text"
      placeholder="What are you craving?"
      value={searchQuery}
      onChange={onSearchChange}
      className="bg-transparent outline-none w-full text-black dark:text-white 
                 placeholder:text-gray-500 dark:placeholder:text-gray-400 text-lg"
    />
    <img
      src={theme === "light" ? search_icon_dark : search_icon_light}
      alt="Search Icon"
      className="w-5 cursor-pointer"
    />
  </div>
</div>




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

     

      <div className="mt-2 w-full p-[40px] flex justify-center">
        <Pagination setCurrentPage={setCurrentPage} pages={pages} />
      </div>
    </div>
  );
};
