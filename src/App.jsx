import './App.css';
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom"; 

import Navbar from "./components/Navbar"; 
import RecipeDetails from "./components/RecipeDetails"; 
import Home from "./components/Home"; 
import { AllRecipes } from './components/AllRecipes';
import Login from "./components/Login";
import Favorites from './components/Pages/Favourites';
import { fetchRecipesBySearch, transformMealPayloadToMockDataStructure, fetchRecipesByCategory, fetchAllCategories } from './api/fetchRecipes';
import { ClipLoader } from 'react-spinners';
import Footer from "./components/Footer";

const App = () => {  
  const location = useLocation();  

  const [newData, setNewData] = useState([]);
  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');
  const [searchQuery, setSearchQuery] = useState("");
  const [favoritesSearchQuery, setFavoritesSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [recipeRatings, setRecipeRatings] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoryData = await fetchAllCategories();
        setCategories([{ strCategory: 'All' }, ...categoryData]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    getCategories();
  }, []);


  useEffect(() => {
    const fetchCategoryRecipes = async () => {

      if (selectedCategory === 'All') return;

      setIsLoading(true);
      try {
        const data = await fetchRecipesByCategory(selectedCategory);
        const transformedData = data.map(meal => transformMealPayloadToMockDataStructure(meal));
        setNewData(transformedData);
      } catch (error) {
        console.error(`Error fetching recipes for category ${selectedCategory}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryRecipes();
  }, [selectedCategory]);


  useEffect(() => {

    if (selectedCategory !== 'All') return;

    const fetchSearchRecipes = async () => {
      setIsLoading(true);
      try {
        const data = await fetchRecipesBySearch(searchQuery || 'cake');
        const transformedData = data.map(meal => transformMealPayloadToMockDataStructure(meal));
        setNewData(transformedData);
      } catch (error) {
        console.error('Error fetching recipes by search:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const handler = setTimeout(() => {
      fetchSearchRecipes();
    }, 300);


    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, selectedCategory]);

  const handleCategorySelect = (category) => {
    if (selectedCategory !== category) {
      setSearchQuery('');
      setSelectedCategory(category);
    }
  };

  const navigate = useNavigate();


  useEffect(() => {
    const loadUserData = () => {
      setIsLoading(true);
      try {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          
          if (user) {
            setCurrentUser(user);
            setIsLoggedIn(true);
            setFavoriteRecipes(user.favorites || []);
            setRecipeRatings(user.ratings || {});
          }
        } else {
          
          setCurrentUser(null);
          setIsLoggedIn(false);
          setFavoriteRecipes([]);
          setRecipeRatings({});
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
    };

    loadUserData();
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
    console.log('Logout initiated');
    
    
    console.log('Removing user from localStorage...');
    localStorage.removeItem('currentUser');
    
    console.log('Clearing user state...');
    setCurrentUser(null);
    setIsLoggedIn(false);
    setFavoriteRecipes([]);
    setRecipeRatings({});
    
    setTimeout(() => {
      console.log('Verifying logout...');
      console.log('isLoggedIn:', isLoggedIn);
      console.log('currentUser:', currentUser);
      
    
      console.log('Navigating to home page...');
      navigate('/', { replace: true });
      
     
      setTimeout(() => {
        console.log('Forcing page reload...');
        window.location.reload();
      }, 100);
    }, 0);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate('/recipes');
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();  
    setSearchQuery(query);
    
  
    if (query.trim() && selectedCategory !== 'All') {
      setSelectedCategory('All');
    }
    
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
  const addToFavorites = (recipeId, recipeData = null) => {
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

    // If recipeData is provided, use it; otherwise try to find it in newData
    const recipeToSave = recipeData || newData.find(recipe => recipe.id === recipeId);
    
    if (recipeToSave) {
      const savedRecipes = JSON.parse(localStorage.getItem('searchedRecipes') || '[]');
      
      // Check if recipe already exists in savedRecipes
      const existingRecipeIndex = savedRecipes.findIndex(recipe => recipe.id === recipeId);
      
      if (existingRecipeIndex === -1) {
        // If recipe doesn't exist, add it
        savedRecipes.push(recipeToSave);
      } else if (recipeData) {
        // If recipe exists and we have new data, update it
        savedRecipes[existingRecipeIndex] = recipeToSave;
      }
      
      localStorage.setItem('searchedRecipes', JSON.stringify(savedRecipes));
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


  



  return (
    <div className={`min-h-screen w-full ${theme === 'dark' ? 'bg-[#121212] text-white' : 'bg-white text-black'}`}>
      <>
        <Navbar 
          theme={theme} 
          setTheme={setTheme} 
          searchQuery={location.pathname === '/favourites' ? favoritesSearchQuery : searchQuery} 
          onSearchChange={location.pathname === '/favourites' ? (e) => setFavoritesSearchQuery(e.target.value) : handleSearchChange} 
          onSearchSubmit={handleSearchSubmit}
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
                      selectedCategory={selectedCategory}
                      onSelectCategory={handleCategorySelect}
                      favoriteRecipes={favoriteRecipes}
                      categories={categories}
                      isLoading={isLoading}
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
                      searchQuery={favoritesSearchQuery}
                      setSearchQuery={setFavoritesSearchQuery}
                    />
                  }
                />
              </Routes>
            </div>
            <Footer theme={theme} />
        </>
      </div>
  );
}

export default App;