import './App.css';
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom"; 

import Navbar from "./components/Navbar"; 
import RecipeDetails from "./components/RecipeDetails"; 
import Home from "./components/Home"; 
import { AllRecipes } from './components/AllRecipes';
import Login from "./components/Login";
import Favorites from './components/Pages/Favourites';
import { fetchRecipesBySearch, transformMealPayloadToMockDataStructure } from './api/fetchRecipes';
import { ClipLoader } from 'react-spinners';

const App = () => {  
  const [searchedRecipes, setSearchedRecipes] = useState(() => {
    return JSON.parse(localStorage.getItem('searchedRecipes') || '[]');
  });
  const [newData, setNewData] = useState([]); 
  useEffect(() => {
    const initialSearch = async () => {
      try {
        const data = await fetchRecipesBySearch('cake');
        const transformedData = data.map(meal => transformMealPayloadToMockDataStructure(meal));
        setNewData(transformedData);
      } catch (error) {
        console.error('Error loading initial recipes:', error);
        setNewData(searchedRecipes);
      }
    };
    initialSearch();
  }, []);
  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [recipeRatings, setRecipeRatings] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigate = useNavigate();

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
      setCurrentUser(null);
      setIsLoggedIn(false);
      setFavoriteRecipes([]);
      setRecipeRatings({});
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    if (currentUser && isLoggedIn) {
      try {
        const updatedUser = {
          ...currentUser,
          favorites: favoriteRecipes,
          ratings: recipeRatings
        };

        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = users.map(user => 
          user.email === currentUser.email ? updatedUser : user
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        console.log('Saved user favorites:', favoriteRecipes);
        console.log('Updated user:', updatedUser);
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
  };  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();  
    setSearchQuery(query);
    
    if (window.setCurrentPage) {
      window.setCurrentPage(1);
    }
  if (!query.trim()) {
      return;
    }

    fetchRecipesBySearch(query).then(data => {
      
      const transformedData = data.map(meal => 
        transformMealPayloadToMockDataStructure(meal)
      );
      
      
      const existingSearchedRecipes = JSON.parse(localStorage.getItem('searchedRecipes') || '[]');
      
      const allRecipes = [...existingSearchedRecipes, ...transformedData].reduce((unique, recipe) => {
        if (!recipe) return unique;
        const exists = unique.some(item => item.id === recipe.id);
        if (!exists) {
          unique.push(recipe);
        }
        return unique;
      }, []);

      
      localStorage.setItem('searchedRecipes', JSON.stringify(allRecipes));
      
      const filteredResults = allRecipes.filter(recipe => 
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.description?.toLowerCase().includes(query.toLowerCase()) ||
        recipe.category?.toLowerCase().includes(query.toLowerCase())
      );
      
      setNewData(filteredResults);
    });
  };
  const addToFavorites = (recipeId) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

  
    const recipeToSave = newData.find(recipe => recipe.id === recipeId);
    
    if (recipeToSave) {
     
      const savedRecipes = JSON.parse(localStorage.getItem('searchedRecipes') || '[]');
    
      if (!savedRecipes.some(recipe => recipe.id === recipeId)) {
        savedRecipes.push(recipeToSave);
        localStorage.setItem('searchedRecipes', JSON.stringify(savedRecipes));
      }
      
      setFavoriteRecipes(prev => {
        const newFavorites = prev.includes(recipeId)
          ? prev.filter(id => id !== recipeId)
          : [...prev, recipeId];
        return newFavorites;
      });
    }
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


  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => {
      if (!prev) {

        if (window.location.pathname === "/") {
          navigate("/recipes");
        }
        return true;
      } else {

        return false;
      }
    });
  };

  if (isLoading) {
    return <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#121212] text-white' : 'bg-white text-black'}`}>Loading...</div>;
  }

  return (
      <div className={`min-h-screen w-full ${theme === 'dark' ? 'bg-[#121212] text-white' : 'bg-white text-black'}`}>
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
              isSearchOpen={isSearchOpen}
              onSearchToggle={handleSearchToggle}
            />

            {showLoginModal && (
              <Login
                theme={theme}
                onLogin={handleLogin}
                setIsLoginVisible={setShowLoginModal}
              />
            )}

            <div className="w-full max-w-none px-0">
              <Routes>
                <Route path="/" element={<Home theme={theme} />} />
                <Route 
                  path="/recipes" 
                  element={
                    <AllRecipes
                      theme={theme}
                      isLoggedIn={isLoggedIn}
                      setShowLoginModal={setShowLoginModal}
                      addToFavorites={addToFavorites}
                      newData={newData}
                      favoriteRecipes={favoriteRecipes}
                    />
                  }
                />
                <Route 
                  path="/recipe/:id" 
                  element={
                    <RecipeDetails 
                      theme={theme}
                      isLoggedIn={isLoggedIn}
                      setShowLoginModal={setShowLoginModal}
                      handleRate={handleRate}
                      currentRating={recipeRatings}
                      currentUser={currentUser}
                    />
                  }
                />                <Route path="/favourites"
                  element={
                    <Favorites
                      theme={theme}
                      isLoggedIn={isLoggedIn}
                      setShowLoginModal={setShowLoginModal}
                      addToFavorites={addToFavorites}
                      favoriteRecipes={favoriteRecipes}
                      searchQuery={searchQuery}
                    />
                  }
                />
              </Routes>
            </div>
          </>
        )}
      </div>
  );
}

export default App;