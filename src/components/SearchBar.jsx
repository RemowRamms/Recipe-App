import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search for recipes..."
        value={searchQuery}
        onChange={onSearchChange}
        className="w-full p-3 rounded-lg border focus:ring-2 transition bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-black dark:text-white focus:ring-yellow-500"
      />
    </div>
  );
};

export default SearchBar;
