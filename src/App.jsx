import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import recipes from "./data"; 
import Navbar from "./components/Navbar"; 
import RecipeDetails from "./components/RecipeDetails"; 
import Home from "./components/Home"; 
import { AllRecipes } from './components/AllRecipes';
import Login from "./components/Login";
import Favorites from './components/Pages/Favourites';
import { fetchRecipesBySearch, transformMealPayloadToMockDataStructure } from './api/fetchRecipes';
import { ClipLoader } from 'react-spinners';

const App = () => {
  const [newData, setNewData] = useState(() => {
    const searchedRecipes = JSON.parse(localStorage.getItem('searchedRecipes') || '[]');
    return searchedRecipes.length > 0 ? searchedRecipes : recipes;
  });
  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [recipeRatings, setRecipeRatings] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data on initial render
  useEffect(() => {
    setIsLoading(true);
    try {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setIsLoggedIn(true);
        setFavoriteRecipes(user.favorites || []);
        setRecipeRatings(user.ratings || {});
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      // Reset to default state on error
      setCurrentUser(null);
      setIsLoggedIn(false);
      setFavoriteRecipes([]);
      setRecipeRatings({});
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save user data when it changes
  useEffect(() => {
    if (currentUser && isLoggedIn) {
      try {
        const updatedUser = {
          ...currentUser,
          favorites: favoriteRecipes,
          ratings: recipeRatings
        };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        // Update user in users array
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = users.map(user => 
          user.email === currentUser.email ? updatedUser : user
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    }
  }, [favoriteRecipes, recipeRatings, currentUser, isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
    setFavoriteRecipes(userData.favorites || []);
    setRecipeRatings(userData.ratings || {});
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setFavoriteRecipes([]);
    setRecipeRatings({});
    localStorage.removeItem('currentUser');
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();  
    setSearchQuery(query);
    fetchRecipesBySearch(query).then(data => {
      const transformedData = data.map(meal => 
        transformMealPayloadToMockDataStructure(meal)
      );
      setNewData(transformedData);
      
      // Store searched recipes in localStorage
      const existingSearchedRecipes = JSON.parse(localStorage.getItem('searchedRecipes') || '[]');
      const uniqueRecipes = [...existingSearchedRecipes];
      
      transformedData.forEach(recipe => {
        if (!uniqueRecipes.some(existing => existing.id === recipe.id)) {
          uniqueRecipes.push(recipe);
        }
      });
      
      localStorage.setItem('searchedRecipes', JSON.stringify(uniqueRecipes));
    });
  };

  const addToFavorites = (recipeId) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    setFavoriteRecipes(prev => {
      const newFavorites = prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId];
      return newFavorites;
    });
  };

  const handleRate = (recipeId, rating) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    
    setRecipeRatings(prev => ({
      ...prev,
      [recipeId]: rating
    }));
  };

  if (isLoading) {
    return <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#121212] text-white' : 'bg-white text-black'}`}>Loading...</div>;
  }

  return (
    <Router> 
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#121212] text-white' : 'bg-white text-black'}`}>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <ClipLoader color="#facc15" size={80} />
          </div>
        ) : (
          <>
            <Navbar 
              theme={theme} 
              setTheme={setTheme} 
              searchQuery={searchQuery} 
              onSearchChange={handleSearchChange} 
              setNewData={setNewData}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              onLogout={handleLogout}
              onLogin={handleLogin}
            />

            {showLoginModal && (
              <Login
                theme={theme}
                onLogin={handleLogin}
                setIsLoginVisible={setShowLoginModal}
              />
            )}

            <div className="container mx-auto px-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route 
                  path="/recipes" 
                  element={
                    <AllRecipes
                      theme={theme}
                      isLoggedIn={isLoggedIn}
                      setShowLoginModal={setShowLoginModal}
                      addToFavorites={addToFavorites}
                      newData={newData.length > 0 ? newData : recipes}
                      favoriteRecipes={favoriteRecipes}
                    />
                  } 
                />
                <Route 
                  path="/recipe/:id" 
                  element={
                    <RecipeDetails 
                      isLoggedIn={isLoggedIn}
                      setShowLoginModal={setShowLoginModal}
                      handleRate={handleRate}
                      currentRating={recipeRatings}
                    />
                  }
                />
                <Route
                  path="/favourites"
                  element={
                    <Favorites
                      theme={theme}
                      isLoggedIn={isLoggedIn}
                      setShowLoginModal={setShowLoginModal}
                      addToFavorites={addToFavorites}
                      favoriteRecipes={favoriteRecipes}
                      recipes={newData.length > 0 ? newData : recipes}
                    />
                  }
                />
              </Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;