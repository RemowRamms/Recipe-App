import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import recipes from "./data"; 
// import RecipeCard from "./components/RecipeCard"; 
import Navbar from "./components/Navbar"; 
import RecipeDetails from "./components/RecipeDetails"; 
import Home from "./components/Home"; 
import { AllRecipes } from './components/AllRecipes';
import Login from "./components/Login";
import RecipePage from './components/RecipePage';
import { fetchRecipesBySearch } from './api/fetchRecipes';


const App = () => {
  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();  
    setSearchQuery(query);
    const data = fetchRecipesBySearch(query);
    console.log(data)
    

    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(query)
    );
    setFilteredRecipes(filtered);
  };

  const addToFavorites = (recipeId) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      if (favoriteRecipes.includes(recipeId)) {
        setFavoriteRecipes(favoriteRecipes.filter((id) => id !== recipeId));
      } else {
        setFavoriteRecipes([...favoriteRecipes, recipeId]);
      }
      console.log(`Toggled favorite status for recipe ${recipeId}`);
    }
  };
 
  React.useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  const handleRate = (recipeId, userId, rating) => {
    
  };

  return (
    <Router> 
      <div className={`min-h-screen py-8 ${theme === 'dark' ? 'bg-black text-white' : 'bg-azure-2 text-azure-12'}`}>
        {/* Pass the search query and handler to Navbar */}
        <Navbar 
          theme={theme} 
          setTheme={setTheme} 
          searchQuery={searchQuery} 
          onSearchChange={handleSearchChange} 
        />

        {showLoginModal && (
          <Login
            theme={theme}
            onLogin={() => setIsLoggedIn(true)}
            setIsLoginVisible={setShowLoginModal}
          />
        )}

        <div className="container mx-auto px-4">

            

       <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        

           <Route path="/recipes" 
            element={
              <AllRecipes
              theme={theme}
              filteredRecipes={filteredRecipes}
              isLoggedIn={isLoggedIn}
              setShowLoginModal={setShowLoginModal}
              addToFavorites={addToFavorites}
            />
            } 
            />

            
            <Route path="/recipe/:id" element={<RecipeDetails 
            theme={theme}
            isLoggedIn={isLoggedIn}
            setShowLoginModal={setShowLoginModal}
            handleRate={handleRate}
            
            />
            }
             />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;