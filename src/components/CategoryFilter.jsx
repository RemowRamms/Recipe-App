import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory, theme }) => {

  return (
    <div className="p-4">
      <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Filter by Category</h3>
      <div className="flex flex-wrap gap-2">
        {Array.isArray(categories) && categories.map(category => (
          <button 
            key={category.strCategory} 
            onClick={() => onSelectCategory(category.strCategory)}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors duration-300 ${
              selectedCategory === category.strCategory 
                ? 'bg-yellow-400 text-black'
                : theme === 'dark' 
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}>
            {category.strCategory}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
