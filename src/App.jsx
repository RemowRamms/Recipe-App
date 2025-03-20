import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import recipes from "./data"; 
import RecipeCard from "./components/RecipeCard"; 
import Navbar from "./components/Navbar"; 
import RecipeDetails from "./components/RecipeDetails"; 
import Home from "./components/Home"; 

const App = () => {
  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');
  const [searchQuery, setSearchQuery] = useState("");  // State for search query
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);  // Filtered recipes

  // Handle search input change
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();  // Convert to lowercase for case-insensitive search
    setSearchQuery(query);

    // Filter recipes based on search query
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(query)
    );
    setFilteredRecipes(filtered);
  };

  // Effect to store theme in localStorage
  React.useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  return (
    <Router> 
      <div className={`min-h-screen py-8 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
        {/* Pass the search query and handler to Navbar */}
        <Navbar 
          theme={theme} 
          setTheme={setTheme} 
          searchQuery={searchQuery} 
          onSearchChange={handleSearchChange} 
        />

        <div className="container mx-auto px-4">
          <Routes>
            {/* Home Page Route */}
            <Route path="/" element={<Home />} />

            {/* Recipe List Route */}
            <Route path="/recipes" element={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Map over filtered recipes */}
                {filteredRecipes.length > 0 ? (
                  filteredRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} theme={theme} />
                  ))
                ) : (
                  <p className="col-span-3 text-center">No recipes found.</p>
                )}
              </div>
            } />

            {/* Recipe Details Route */}
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;