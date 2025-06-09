import React, { useState, useEffect } from "react";
import {
  fetchRecipesBySearch,
  transformMealPayloadToMockDataStructure,
} from "../api/fetchRecipes";


export default function SearchBar() {


const [searchQuery, setSearchQuery] = useState("");
const [newData, setNewData] = React.useState([]);



  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

useEffect(() => {
    const fetchData = async () => {
      fetchRecipesBySearch(searchQuery).then((data) => {
        console.log(data); 
        const transformedData = data.map((meal) =>
          transformMealPayloadToMockDataStructure(meal)
        );
        console.log(transformedData);
        setNewData(transformedData);
      });
    };
    fetchData();
  }, [searchQuery]);
  return (
    <div className="flex items-center justify-center mt-4">
      <input
        type="text"
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search for recipes..."
        className="w-full max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}