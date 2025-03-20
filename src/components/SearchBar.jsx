import React from "react";

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search recipes..."
        className="w-full p-3 border rounded-lg bg-white dark:bg-darkBlue text-darkBlue dark:text-lightBlue placeholder-lightBlue dark:placeholder-lightBlue focus:outline-none focus:ring-2 focus:ring-yellow"
      />
    </div>
  );
};

export default SearchBar;